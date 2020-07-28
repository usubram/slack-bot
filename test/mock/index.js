'use strict';

const fs = require('fs');
const sampleTemplate = fs.readFileSync(
  './test/mock/template/' + 'sample-template.hbs',
  'utf8'
);
const flowTemplate = fs.readFileSync(
  './test/mock/template/' + 'flow-template.hbs',
  'utf8'
);

exports = module.exports = {
  singleBot: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          AUTO: {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  multipleBot: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          AUTO: {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          enterprise_user: {
            id: 'U1234567',
          },
        },
        botToken: 'xoxb-dummy',
      },
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          AUTO: {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot2',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          enterprise_user: {
            id: 'U1234567',
          },
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  BotsTest: {
    bots: [
      {
        botCommand: {
          'PING-ME': {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  BotsTestWithRecursiveTasks: {
    bots: [
      {
        botCommand: {
          'PING-ME': {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          'auto data': {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  singleBotForAllowedParam: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGSIM: {
            commandType: 'DATA',
            validation: [
              {
                schema: [
                  [1, 2],
                  [3, 4],
                ],
                default: [1, 3],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGARG: {
            commandType: 'DATA',
            validation: [
              {
                schema: [
                  [4, 5],
                  [6, 7],
                ],
                default: [4, 6],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
              {
                schema: [
                  [4, 5],
                  [3, 7],
                ],
                default: [4, 6],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
              {
                schema: [
                  [1, 2],
                  [3, 4],
                ],
                default: [1, 1],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGARGRECOMEND: {
            commandType: 'DATA',
            validation: [
              {
                schema: ['first', [4, 5], [6, 7]],
                default: ['first', 4, 6],
                help: [
                  {
                    recommend: 'first',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
              {
                schema: ['second', [4, 5], [3, 7]],
                default: ['second', 4, 6],
                help: [
                  {
                    recommend: 'second',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
              {
                schema: ['third', [1, 2], [3, 4]],
                default: ['third', 1, 3],
                help: [
                  {
                    recommend: 'third',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGREGEX: {
            commandType: 'DATA',
            validation: [
              {
                schema: [/([1-5])/, /([6-9])/],
                default: [1, 6],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    recommend: '3',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGREGEXCHK: {
            commandType: 'DATA',
            validation: [
              {
                schema: [/[1]/, /[1]/],
                default: [1, 1],
                help: [
                  {
                    sample: '{firstArg}',
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    sample: '{secondArg}',
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
              {
                schema: [/[2]/, /[2]/],
                default: [2, 2],
                help: [
                  {
                    sample: '{firstArg}',
                    recommend: '2',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    sample: '{secondArg}',
                    recommend: '2',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            helpText: '    → this is log command \\n',
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          PINGREGEXCHK1: {
            commandType: 'DATA',
            validation: [
              {
                schema: [/[1]/, [/(\bone)/, /(\btwo)/]],
                default: [1, 'one'],
                help: [
                  {
                    sample: '{firstArg}',
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                  {
                    sample: '{secondArg}',
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            helpText: '    → this is log command \\n',
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          pingLimit: {
            commandType: 'DATA',
            validation: [
              {
                schema: [/^(?:[1-9]?|10)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          AUTO: {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot2',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          enterprise_user: {
            id: 'U1234567',
          },
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  commandTypeBots: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          pingLimit: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          AUTO: {
            commandType: 'RECURSIVE',
            validation: [
              {
                schema: [/^(?:[1-9]\d?|100)$/],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          alert: {
            commandType: 'ALERT',
            timeInterval: 1,
            algo: 'CUMULATIVE_DIFFERENCE',
            data: function (input, options, callback) {
              const dataArr = [
                // Sample data
                {
                  time: +new Date() - 1000,
                  value: 400,
                },
                {
                  time: +new Date(),
                  value: 120,
                },
              ];
              callback(null, dataArr);
            },
          },
          trend: {
            commandType: 'DATA',
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          stats: {
            commandType: 'DATA',
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
          flowit: {
            commandType: 'FLOW',
            timeout: '60',
            template: flowTemplate,
            validation: [
              {
                schema: [['user', 'team'], /^[a-zA-Z\d\D]{3,}$/],
                help: [
                  {
                    recommend: 'user',
                    error: '{{arg}} your input is isvalid',
                  },
                  {
                    recommend: '1',
                    error:
                      '{{arg}} is incorrect. Enter minimum of three characters',
                  },
                ],
              },
              {
                schema: [/\d$/],
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} enter a valid digit',
                  },
                ],
              },
              {
                schema: [['yes', 'no']],
                help: [
                  {
                    recommend: 'yes or no',
                    error: '{{arg}} Try yes or no',
                  },
                ],
              },
            ],
            data: function (input, options, callback) {
              if (options.response[0].answered === false) {
                return callback(null, {
                  param: input.params,
                  orderedResponse: ['result1', 'result2'],
                });
              }
              if (options.response[1].answered === false) {
                return callback(null, {
                  param: input.params,
                  response: {
                    selection: input.params[0],
                  },
                });
              }
              if (options.response[2].answered === false) {
                return callback(null, {
                  param: input.params,
                  response: {
                    [input.params[0]]: true,
                  },
                });
              }
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        schedule: true,
        botToken: 'xoxb-dummy',
      },
    ],
  },
  isCommandAllowed: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        allowedUsers: ['U0GG92T45'],
        mock: {
          self: {
            name: 'testbot2',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  isAllowedChannel: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        allowedChannels: ['C0GG92T45'],
        mock: {
          self: {
            name: 'testbot2',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  blockDirectMessage: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback(null, {
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
        blockDirectMessage: true,
      },
    ],
  },
  alertCommandBots: {
    bots: [
      {
        botCommand: {
          ALERT: {
            commandType: 'ALERT',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            timeInterval: 1,
            template: sampleTemplate,
            algo: 'CUMULATIVE_DIFFERENCE',
            data: function (input, options, callback) {
              callback(null, [
                { time: 1511149547, value: 80 },
                { time: 1511149581, value: 1 },
              ]);
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
      },
    ],
  },
  blockDirectCustomMessage: {
    bots: [
      {
        botCommand: {
          PING: {
            commandType: 'DATA',
            validation: [
              {
                schema: [[1, 2]],
                default: 1,
                help: [
                  {
                    recommend: '1',
                    error: '{{arg}} is incorrect',
                  },
                ],
              },
            ],
            template: sampleTemplate,
            data: function (input, options, callback) {
              callback({
                param: input.params,
              });
            },
          },
        },
        mock: {
          self: {
            name: 'testbot1',
            id: 'U1234567',
            enterprise_user: {
              id: 'U1234567',
            },
          },
          members: [
            {
              id: 'U0GG92T45',
              name: 'user1',
            },
            {
              id: 'U0GG92T46',
              name: 'user2',
            },
          ],
        },
        botToken: 'xoxb-dummy',
        blockDirectMessage: 'Hi {{{user}}} custom message',
      },
    ],
  },
  events: {
    testbot1: {
      D2U7WA3PD_auto: {
        parsedMessage: {
          type: 'message',
          channel: 'D2U7WA3PD',
          user: 'U0VM0V000',
          text: 'auto',
          ts: '1488154681.000008',
          team: 'T0GGDKVDE',
          message: {
            command: 'auto',
            params: [],
          },
        },
        channels: ['D2U7WA3PD'],
      },
    },
  },
  schedule: {
    testbot1: {
      byuvavsyz: {
        parsedMessage: {
          type: 'message',
          channel: 'D4BSZUSN8',
          user: 'U0VM0V000',
          text: '<@U0Y0KFJ90> schedule ping 1 (* * * * *)',
          ts: '1481052561.004683',
          team: 'T0GGDKVDE',
          message: {
            commandPrefix: 'opmbot',
            command: 'SCHEDULE',
            params: ['ping', '1', '(*', '*', '*', '*', '*)'],
          },
          scheduleId: 'byuvavsyz',
        },
        channels: ['D4BSZUSN8'],
      },
    },
  },
  dataPromise: {
    singleBot: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            AUTO: {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    multipleBot: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            AUTO: {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
          },
          botToken: 'xoxb-dummy',
        },
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            AUTO: {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot2',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    BotsTest: {
      bots: [
        {
          botCommand: {
            'PING-ME': {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    BotsTestWithRecursiveTasks: {
      bots: [
        {
          botCommand: {
            'PING-ME': {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            'auto data': {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    singleBotForAllowedParam: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGSIM: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [
                    [1, 2],
                    [3, 4],
                  ],
                  default: [1, 3],
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGARG: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [
                    [4, 5],
                    [6, 7],
                  ],
                  default: [4, 6],
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
                {
                  schema: [
                    [4, 5],
                    [3, 7],
                  ],
                  default: [4, 6],
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
                {
                  schema: [
                    [1, 2],
                    [3, 4],
                  ],
                  default: [1, 1],
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGARGRECOMEND: {
              commandType: 'DATA',
              validation: [
                {
                  schema: ['first', [4, 5], [6, 7]],
                  default: ['first', 4, 6],
                  help: [
                    {
                      recommend: 'first',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
                {
                  schema: ['second', [4, 5], [3, 7]],
                  default: ['second', 4, 6],
                  help: [
                    {
                      recommend: 'second',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
                {
                  schema: ['third', [1, 2], [3, 4]],
                  default: ['third', 1, 3],
                  help: [
                    {
                      recommend: 'third',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGREGEX: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [/([1-5])/, /([6-9])/],
                  default: [1, 6],
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      recommend: '3',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGREGEXCHK: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [/[1]/, /[1]/],
                  default: [1, 1],
                  help: [
                    {
                      sample: '{firstArg}',
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      sample: '{secondArg}',
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
                {
                  schema: [/[2]/, /[2]/],
                  default: [2, 2],
                  help: [
                    {
                      sample: '{firstArg}',
                      recommend: '2',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      sample: '{secondArg}',
                      recommend: '2',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              helpText: '    → this is log command \\n',
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            PINGREGEXCHK1: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [/[1]/, [/(\bone)/, /(\btwo)/]],
                  default: [1, 'one'],
                  help: [
                    {
                      sample: '{firstArg}',
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                    {
                      sample: '{secondArg}',
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              helpText: '    → this is log command \\n',
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            pingLimit: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [/^(?:[1-9]?|10)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            AUTO: {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot2',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    commandTypeBots: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            pingLimit: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            AUTO: {
              commandType: 'RECURSIVE',
              validation: [
                {
                  schema: [/^(?:[1-9]\d?|100)$/],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            alert: {
              commandType: 'ALERT',
              timeInterval: 1,
              algo: 'CUMULATIVE_DIFFERENCE',
              data: function () {
                const dataArr = [
                  // Sample data
                  {
                    time: +new Date() - 1000,
                    value: 400,
                  },
                  {
                    time: +new Date(),
                    value: 120,
                  },
                ];
                return Promise.resolve(dataArr);
              },
            },
            trend: {
              commandType: 'DATA',
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
            stats: {
              commandType: 'DATA',
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          schedule: true,
          botToken: 'xoxb-dummy',
        },
      ],
    },
    isCommandAllowed: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          allowedUsers: ['U0GG92T45'],
          mock: {
            self: {
              name: 'testbot2',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    isAllowedChannel: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          allowedChannels: ['C0GG92T45'],
          mock: {
            self: {
              name: 'testbot2',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    blockDirectMessage: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
          blockDirectMessage: true,
        },
      ],
    },
    alertCommandBots: {
      bots: [
        {
          botCommand: {
            ALERT: {
              commandType: 'ALERT',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              timeInterval: 1,
              template: sampleTemplate,
              algo: 'CUMULATIVE_DIFFERENCE',
              data: function () {
                return Promise.resolve([
                  { time: 1511149547, value: 80 },
                  { time: 1511149581, value: 1 },
                ]);
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
        },
      ],
    },
    blockDirectCustomMessage: {
      bots: [
        {
          botCommand: {
            PING: {
              commandType: 'DATA',
              validation: [
                {
                  schema: [[1, 2]],
                  default: 1,
                  help: [
                    {
                      recommend: '1',
                      error: '{{arg}} is incorrect',
                    },
                  ],
                },
              ],
              template: sampleTemplate,
              data: function (input) {
                return Promise.resolve({
                  param: input.params,
                });
              },
            },
          },
          mock: {
            self: {
              name: 'testbot1',
              id: 'U1234567',
              enterprise_user: {
                id: 'U1234567',
              },
            },
            members: [
              {
                id: 'U0GG92T45',
                name: 'user1',
              },
              {
                id: 'U0GG92T46',
                name: 'user2',
              },
            ],
          },
          botToken: 'xoxb-dummy',
          blockDirectMessage: 'Hi {{{user}}} custom message',
        },
      ],
    },
  },
};
