'use strict';

// Load modules
import * as lodash from 'lodash-es';
import Handlebars from 'handlebars';

import { Bot } from '../bot/bot.js';
import logger from '../utils/logger.js';

const ALERT_PARAMS = ['setup', 'list'];
const {
  forEach,
  toUpper,
  includes,
  get,
  isString,
  map,
  merge,
  concat,
  join,
  uniq,
} = lodash;

/**
 *
 * Represents list of bots and normalize bot config.
 *
 */
const Bots = class {
  /**
   * Represents list of bots and normalize bot config.
   * @param {object} config Bots config.
   * @class
   */
  constructor(config) {
    this.bots = [];

    this.setup(config, config.bots);

    return this;
  }

  /**
   * Function to setup bot config normalization.
   * @param {object} config Identifier for the hook request.
   * @param {array} bots List of bot in config.
   */
  setup(config, bots) {
    forEach(bots, (bot) => {
      const newbot = new Bot(normalizeCommand(bot));

      if (newbot) {
        logger.info('Bots instantiated successfully');
        if (config.proxy) {
          newbot.proxy = config.proxy;
        }

        this.bots.push(newbot);
      } else {
        logger.error('Bots instantiation failed. Check your config');
      }
    });
  }

  /**
   * Function to get list of normalized bot config.
   * @return {array} List of normalized bot config.
   */
  getBots() {
    return this.bots;
  }
};

/**
 * Function to normalize bot config data.
 *
 * @param {object} bot bot config.
 * @return {object} Normalized bot config.
 */
const normalizeCommand = function (bot) {
  const normalizedCommand = {};
  const stopTasks = [];
  const dataTasks = [];

  forEach(bot.botCommand, function (value, key) {
    const commandKey = toUpper(key).replace(/\s/g, '');

    if (value) {
      normalizedCommand[commandKey] = value;
      forEach(value, function (commandAttr, commandAttrkey) {
        const command = toUpper(commandAttr).replace(/\s/g, '');

        if (commandAttrkey === 'commandType') {
          value[commandAttrkey] = command;
          if (command === 'DATA') {
            dataTasks.push(commandKey);
          }

          if (includes(['ALERT', 'RECURSIVE'], command)) {
            if (command === 'ALERT') {
              if (get(value, 'validation', []).length === 0) {
                value.validation = [
                  {
                    schema: [ALERT_PARAMS],
                    help: [
                      {
                        recommend: 'setup',
                        error:
                          'Invalid arguments. Alert command should follow' +
                          ' setup and a valid threshold value',
                      },
                    ],
                  },
                ];
              }
            }

            stopTasks.push(commandKey);
          }

          if (command === 'FLOW') {
            value.validation = value.validation.reduce((acc, value, index) => {
              if (index === 0) {
                acc.push({
                  index,
                  schema: ['redo'],
                  redo: true,
                  help: [
                    {
                      sample: 'redo',
                      recommend: 'redo',
                      error: '{{arg}} is incorrect. Send <command> redo',
                    },
                  ],
                });
              }

              acc.push(Object.assign({ index: index + 1 }, value));
              return acc;
            }, []);
          }
        } else if (commandAttrkey === 'parentTask') {
          value[commandAttrkey] = command;
        } else if (
          commandAttrkey === 'template' &&
          isString(value[commandAttrkey])
        ) {
          value[commandAttrkey] = Handlebars.compile(value[commandAttrkey]);
        } else if (commandAttrkey === 'validation') {
          value[commandAttrkey] = map(value[commandAttrkey], (validation) => {
            if (validation.help) {
              validation.help = map(validation.help, (validationHelp) => {
                return merge(validationHelp, {
                  error: Handlebars.compile(validationHelp.error),
                });
              });
            }

            return validation;
          });
        }
      });
    }
  });

  if (dataTasks.length > 0 && bot.schedule) {
    normalizedCommand['SCHEDULE'] = {
      validation: [
        {
          schema: concat(dataTasks, ['LIST']),
          help: [
            {
              recommend: concat(dataTasks, ['LIST']),
              sample: '{command name} {command args if any} {cron expression}',
              error:
                'Invalid scehdule command. Use the existing commands ' +
                'and it arguments followed by cron expression. Like ' +
                'schedule {command} {args..} (*/15 * * * *)',
            },
          ],
        },
      ],
      descriptionText: 'Use this command to schedule any command the supports',
      helpText:
        '☞  Try {commandName} (*/15 * * * *) for run a command ' +
        'for every 15 mins',
      commandType: 'SCHEDULE',
    };

    stopTasks.push('SCHEDULE');
  }

  if (stopTasks.length > 0) {
    normalizedCommand['STOP'] = normalizedCommand['STOP']
      ? normalizedCommand['STOP']
      : {};
    merge(normalizedCommand['STOP'], {
      validation: [
        {
          schema: [stopTasks],
          help: [
            {
              recommend: stopTasks,
              sample: '{command name}',
              error:
                'Enter a valid command to stop. It should be ' +
                join(stopTasks, ' or '),
            },
          ],
        },
      ],
      descriptionText: 'Use this command to stop scheduled or alert command',
      helpText:
        '☞  Try stop {command name} to stop a command. ' +
        'stop {command name} {scheduleId/alertId} for schedule/alert command',
      commandType: 'KILL',
    });
  }

  bot.botCommand = normalizedCommand;

  mergeAllowedUsers(bot);
  mergeAllowedChannels(bot);

  return bot;
};

/**
 * Function to merge allowed users and allowed user at the command level.
 *
 * @param {object} bot bot config.
 */
const mergeAllowedUsers = function (bot) {
  if (bot.allowedUsers) {
    forEach(bot.botCommand, function (command) {
      if (!command.allowedUsers) {
        command.allowedUsers = uniq(bot.allowedUsers);
      }
    });
  }
};

/**
 * Function to merge allowed channels and allowed channels at the command level.
 *
 * @param {object} bot bot config.
 */
const mergeAllowedChannels = function (bot) {
  if (bot.allowedChannels) {
    forEach(bot.botCommand, function (command) {
      if (!command.allowedChannels) {
        command.allowedChannels = uniq(bot.allowedChannels);
      }
    });
  }
};

export { Bots };
