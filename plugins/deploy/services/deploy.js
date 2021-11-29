'use strict';
const fetch = require('cross-fetch');

class DigitalOceanProvider {
    constructor(config) {
        this.token = config.token;
    }

    deployApp(appId) {
        fetch(`https://api.digitalocean.com/v2/apps/${appId}/deployments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                "force_build": true
            }),
        });
    }

    async isAppBuilding(appId) {
        const response = await fetch(`https://api.digitalocean.com/v2/apps/${appId}/deployments`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        const data = await response.json();

        return data.deployments[0].phase !== 'ACTIVE';
    }
}

const digitalOceanProvider = new DigitalOceanProvider({
    token: process.env.DO_TOKEN,
});

const TEST_APP_ID = process.env.DO_TEST_APP_ID;
const PRODUCTION_APP_ID = process.env.DO_PRODUCTION_APP_ID;

/**
 * deploy.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
    deployTest: () => digitalOceanProvider.deployApp(TEST_APP_ID),
    isTestBuilding: () => digitalOceanProvider.isAppBuilding(TEST_APP_ID),
    deployProduction: () => digitalOceanProvider.deployApp(PRODUCTION_APP_ID),
    isProductionBuilding: () => digitalOceanProvider.isAppBuilding(PRODUCTION_APP_ID),
};
