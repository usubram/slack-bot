'use strict';

// Load modules
const _ = require('lodash');
const path = require('path');
const CronJob = require('cron').CronJob;
const cronTimeout = require('cron').timeout;
const shortid = require('shortid');
const root = '..';

const logger = require(path.join(root, '../utils/logger'));
const { Command } = require(path.join(root, 'command'));
const responseHandler = require(path.join(root, '../bot/response-handler'));

/**
 *
 * Represents the state and events of a schedule command.
 *
 */
const Schedule = class extends Command {
  /**
   * Creates a new Alert instance.
   * @param {object} options command config.
   * @param {object} options.context command context.
   * @param {string} options.commandName command name.
   * @param {function} options.getBotConfig function to get bot config.
   * @param {function} options.getSlackData function to get slack data.
   * @param {function} options.getHttpAgent function to get http proxy agent.
   * @param {function} options.getHook function to get command hook.
   * @param {function} options.getEventStore function to get event store.
   * @param {function} options.messageHandler function to dispatch message.
   * @return {object} instance of this.
   * @class
   */
  constructor(options) {
    super(options);

    return this;
  }

  /**
   * Function to respond to command message.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @return {object} Promise resolves to success or failure.
   * @override
   */
  respond(parsedMessage) {
    if (this.isScheduleList(parsedMessage)) {
      return this.process(parsedMessage).catch((err) => {
        logger.error('Error processing command ', err);
      });
    }

    return this.preprocess(parsedMessage)
      .then(() => {
        return this.setEvent(parsedMessage);
      })
      .then(() => {
        return this.notify(parsedMessage);
      })
      .then(() => {
        return this.process(parsedMessage);
      })
      .catch((err) => {
        logger.error('Error processing command ', err);
      });
  }

  /**
   * Function to handle pre-process for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  preprocess(parsedMessage) {
    return Promise.resolve({
      then: (onFulfill, onReject) => {
        try {
          const job = new CronJob({
            cronTime: getCronExpresion(parsedMessage),
            onTick: function () {
              const scheduleCommand = getCommandArguments(parsedMessage);
              const scheduleTask = _.toUpper(
                _.get(scheduleCommand, 'message.command')
              );
              const command = this.context[scheduleTask];
              if (command) {
                command.quietRespond(scheduleCommand);
              }
            },
            start: true,
            context: this,
            timeZone: 'America/Los_Angeles',
          });

          parsedMessage.scheduleId =
            parsedMessage.scheduleId || _.toLower(shortid.generate());
          logger.debug('schduled job for ', getCronExpresion(parsedMessage));

          this.setTimer(parsedMessage, job);
        } catch (err) {
          logger.error('Error in creating schedule', err);

          onReject(err);
        }

        onFulfill(parsedMessage);
      },
    });
  }

  /**
   * Function to handle process for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  process(parsedMessage) {
    return Promise.resolve({
      then: (onFulfill, onReject) => {
        if (this.isScheduleList(parsedMessage)) {
          const scheduledEvents = this.getScheduledEvents(parsedMessage);
          const noEvents = (scheduledEvents || []).length < 1;

          this.messageHandler({
            channels: parsedMessage.channel,
            message: responseHandler.generateBotResponseTemplate({
              parsedMessage: parsedMessage,
              noScheduledEvents: noEvents,
              scheduledEvents: scheduledEvents,
              botName: this.getEventStore().botName,
            }),
            thread: parsedMessage.thread_ts,
          });

          return onFulfill();
        }

        const scheduleCommand = getCommandArguments(parsedMessage);
        this.callback = (err, data) => {
          onFulfill(this.message.bind(this, scheduleCommand)(err, data));
        };

        try {
          this.getCommand(_.get(scheduleCommand, 'message.command')).data.apply(
            this,
            [
              {
                command: scheduleCommand.message.command,
                params: scheduleCommand.message.params,
              },
              _.merge(
                {},
                this.buildOptions(
                  scheduleCommand,
                  this.getSlackData(),
                  this.purpose
                ),
                { isScheduled: true }
              ),
              this.callback,
            ]
          );
        } catch (err) {
          logger.error(
            'Command: error calling handler,' +
              'make sure to pass a proper function',
            err,
            err.stack
          );
          return onReject(err);
        }
      },
    });
  }

  /**
   * Function to reload persisted event.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  reloadCommand(parsedMessage) {
    return this.preprocess(parsedMessage).catch((err) => {
      logger.error('Error processing command ', err);
      return parsedMessage;
    });
  }

  /**
   * Function to handle notify for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  notify(parsedMessage) {
    return Promise.resolve({
      then: (onFulfill) => {
        this.messageHandler({
          channels: parsedMessage.channel,
          message: responseHandler.generateBotResponseTemplate({
            parsedMessage: parsedMessage,
            scheduleSuccess: true,
            nextEvent: this.getNextScheduleTime(parsedMessage) || false,
            scheduleId: parsedMessage.scheduleId,
            botName: this.getEventStore().botName,
          }),
          thread: parsedMessage.thread_ts,
        });
        onFulfill();
      },
    });
  }

  /**
   * Function to handle vaidation for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  validate(parsedMessage) {
    const scheduleCommand = getCommandArguments(parsedMessage);
    const scheduleTask = _.toUpper(_.get(scheduleCommand, 'message.command'));
    const command = this.context[scheduleTask];

    if (scheduleTask === 'LIST') {
      return Promise.resolve();
    }

    if (!command) {
      return Promise.reject({
        invalidCommand: true,
        parsedMessage: parsedMessage,
        botName: this.getEventStore().botName,
      });
    }

    return Promise.resolve(this.isCommandValid(scheduleCommand, command)).then(
      () => {
        return this.isCronValid(getCronExpresion(parsedMessage), parsedMessage);
      }
    );
  }

  /**
   * Function that wraps parent validate for schedule command.
   *
   * @param {object} scheduleCommand schedule command instance.
   * @param {object} command command instance of command being scheduled.
   * @return {object} Promise resolves to validation success/failure.
   */
  isCommandValid(scheduleCommand, command) {
    return Promise.resolve(command.validate(scheduleCommand));
  }

  /**
   * Function to validate cron expression.
   *
   * @param {string} cron cron expression.
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @return {object} Promise resolves to validation success/failure.
   */
  isCronValid(cron, parsedMessage) {
    return Promise.resolve({
      then: (onFulfill, onReject) => {
        try {
          if (
            _.isEmpty(cron) ||
            _.compact((cron || '').split(' ')).length > 6
          ) {
            logger.error(
              'Invalid cron ',
              cron,
              cron.length,
              cron.indexOf('* * * * *')
            );
            onReject({
              invalidCron: true,
              parsedMessage: parsedMessage,
            });
          }

          const testCron = new CronJob(cron, () => {});
          testCron.stop();
          onFulfill();
        } catch (err) {
          logger.error('Invalid cron ', err);
          onReject({
            invalidCron: true,
            parsedMessage: parsedMessage,
          });
        }
      },
    });
  }

  /**
   * Function to set timer for kill command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @param {object} job timer instance.
   * @override
   */
  setTimer(parsedMessage, job) {
    const timer = this.getTimer(parsedMessage);

    if (timer) {
      timer.stop();
    }

    this.getEventStore().set([parsedMessage.scheduleId, 'timer'], job);
  }

  /**
   * Function to get timer for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  getTimer(parsedMessage) {
    return _.get(this.getEventStore().get(), [
      parsedMessage.scheduleId,
      'timer',
    ]);
  }

  /**
   * Function to set timer for schedule command.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @override
   */
  setEvent(parsedMessage) {
    return this.getEventStore()
      .update(
        {
          eventType: 'schedule',
          id: parsedMessage.scheduleId,
        },
        {
          parsedMessage: parsedMessage,
          channels: [parsedMessage.channel],
        }
      )
      .then(() => parsedMessage);
  }

  /**
   * Function to get the timestamp for next schedule run.
   *
   * @param {object} parsedMessage Message returned @link command/message.js.
   * @return {object} Scheduled events.
   */
  getNextScheduleTime(parsedMessage) {
    const timeleft = cronTimeout(getCronExpresion(parsedMessage));
    let nextEvent;

    if (timeleft && timeleft > 0) {
      nextEvent = new Date(Date.now() + timeleft);
    }

    return nextEvent;
  }
};

/**
 * Function to get cron expression from message.
 *
 * @param {object} parsedMessage Message returned @link command/message.js.
 * @return {string} cron expression.
 */
const getCronExpresion = function (parsedMessage) {
  const cronRegex = /\((.*?)\)/;
  const cronExpresion = cronRegex.exec(
    _.join(parsedMessage.message.params, ' ')
  );

  return _.trim('0 ' + _.nth(cronExpresion, 1));
};

/**
 * Function to get command arguments from message.
 *
 * @param {object} parsedMessage Message returned @link command/message.js.
 * @return {object} context message for schedule.
 */
const getCommandArguments = function (parsedMessage) {
  const result = [];
  _.forEach(
    _.slice(
      _.get(parsedMessage, 'message.params'),
      1,
      _.get(parsedMessage, 'message.params', []).length
    ),
    function (value) {
      if (_.isString(value) && value.indexOf('(') > -1) {
        return false;
      }
      result.push(value);
    }
  );

  return {
    type: 'message',
    channel: parsedMessage.channel,
    user: parsedMessage.user,
    message: {
      command: _.nth(_.get(parsedMessage, 'message.params')),
      params: result,
    },
  };
};

module.exports = {
  Schedule,
};
