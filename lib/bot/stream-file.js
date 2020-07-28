'use strict';

const _ = require('lodash');
const path = require('path');
const plot = require('@umashankar/plotter').plot;
const root = '..';

const logger = require(path.join(root, 'utils/logger'));
const postAttachmentFromStream = require(path.join(
  root,
  'slack-api/post-attachment'
)).postAttachmentFromStream;

const graphFileTypes = ['png', 'svg'];

/**
 *
 * Represents the state and events to stream file.
 *
 */
const StreamFile = class {
  /**
   * Creates a new StreamFile instance.
   * @param {string} channel channel to post file.
   * @param {object} data stream/buffer data.
   * @param {object} config responseType and proxy agent config.
   * @class
   */
  constructor(channel, data, config) {
    if (data.responseType) {
      config = _.merge(config, data.responseType);
    }
    if (_.includes(graphFileTypes, config.type) && config.style) {
      return handleGraphResponse(channel, data, config);
    } else {
      return handleFileResponse(channel, data, config);
    }
  }
};

/**
 * Function to handle chart/graph file for upload.
 * @param {string} channel channel to post file.
 * @param {object} data stream/buffer data.
 * @param {object} config responseType and proxy agent config.
 *
 * @return {object} Promise resolves to success or failure.
 */
const handleGraphResponse = function (channel, data, config) {
  return Promise.resolve({
    then: (onFulfill, onReject) => {
      const {
        style = 'lines',
        type = 'png',
        logscale = false,
        ylabel = 'y-axis',
        xlabel = 'x-axis',
        exec = '',
        time = '',
        smooth = '',
        color = '',
        yformat = '',
        xrange = '',
        yrange = '',
      } = config;

      generateGraph({
        data: data.response || data,
        style: style,
        format: type,
        title: config.title,
        logscale: logscale,
        ylabel: ylabel,
        xlabel: xlabel,
        time: time,
        exec: exec,
        color: color,
        smooth: smooth,
        yFormat: yformat,
        yRange: yrange,
        xRange: xrange,
        finish: function (err, stdout) {
          postAttachmentFromStream(channel, config, stdout)
            .then((response) => {
              onFulfill(response);
            })
            .catch((err) => {
              onReject(err);
            });
        },
      });
    },
  });
};

/**
 * Function to handle file for upload.
 * @param {string} channel channel to post file.
 * @param {object} data stream/buffer data.
 * @param {object} config responseType and proxy agent config.
 *
 * @return {object} Promise resolves to success or failure.
 */
const handleFileResponse = function (channel, data, config) {
  const requestData = data.response || data;

  return postAttachmentFromStream(channel, config, requestData);
};

/**
 * Function to handle generate gnuplot graph.
 * @param {object} plotConfig gnuplot config.
 */
const generateGraph = function (plotConfig) {
  try {
    plot(plotConfig);
  } catch (err) {
    logger.error('Error on generating graph', err);
  }
};

module.exports = {
  StreamFile,
};
