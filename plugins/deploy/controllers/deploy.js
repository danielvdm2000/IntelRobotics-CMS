'use strict';

module.exports = {
  'deployToTestEnvironment': async ctx => {
    const deployService = strapi.plugins.deploy.services.deploy;
  
    await deployService.deployTest();

    ctx.send({
      message: 'ok',
    });
  },
  'isTestBuilding': async ctx => {
    const deployService = strapi.plugins.deploy.services.deploy;
    
    const building = await deployService.isTestBuilding();

    ctx.send({
      building,
      message: 'ok',
    });
  },
  'deployToProductionEnvironment': async ctx => {
    const deployService = strapi.plugins.deploy.services.deploy;

    await deployService.deployProduction();

    ctx.send({
      message: 'ok'
    });
  },
  'isProductionBuilding': async ctx => {
    const deployService = strapi.plugins.deploy.services.deploy;

    const building = await deployService.isProductionBuilding();

    ctx.send({
      building,
      message: 'ok',
    });
  },
};
