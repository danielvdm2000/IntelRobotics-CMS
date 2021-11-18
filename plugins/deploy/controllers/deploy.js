'use strict';

module.exports = {
  'deployToStaging': async (ctx) => {

    ctx.send({
      message: 'ok'
    });
  },
  'deployToProduction': async ctx => {
    ctx.send({
      message: 'ok'
    });
  },
};
