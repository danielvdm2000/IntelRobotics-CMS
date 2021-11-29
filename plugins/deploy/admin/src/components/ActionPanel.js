import React, { memo } from 'react';
import useCountdown from '../hooks/useCountdown';
import useLazyFetch from '../hooks/useLazyFetch';
import Button from './Button';
import PanelBorder from './PanelBorder';
import PanelKeyValue from './PanelKeyValue';
import PanelLink from './PanelLink';

const ENVIROMENT_STATES = {
    'LOADING': 'Loading...',
    'BUILDING': 'Building',
    'BUILD': 'Done building',
    'READY': 'Ready to build',
    'WAITING_FOR_TEST': 'Waiting for testing',
}

function enviromentStateToButtonState(enviromentState) {
    switch (enviromentState) {
        case 'LOADING': return 'loading';
        case 'BUILDING': return 'loading';
        case 'BUILD': return 'idle';
        case 'READY': return 'idle';
        case 'WAITING_FOR_TEST': return 'disabled';
    }
}

const ActionPanel = () => {
    // Get the building status of the testing and production enviroment
    const [getTestBuildingStatus, testBuildingResult] = useLazyFetch(`${strapi.backendURL}/deploy/is-test-building`);
    const [getProductionBuildingStatus, productionBuildingResult] = useLazyFetch(`${strapi.backendURL}/deploy/is-production-building`);

    // Read the status every one minut
    React.useEffect(() => {
        getTestBuildingStatus();
        getProductionBuildingStatus();

        const interval = setInterval(() => {
            getTestBuildingStatus();
            getProductionBuildingStatus();
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Create countdowns to track optimistik rendering
    const { isDone, start } = useCountdown(30);

    // Setup function to trigger a test build.
    const [_deployTest, deployTestResult] = useLazyFetch(`${strapi.backendURL}/deploy/deploy-test`, {
        method: 'POST',
    });

    const deployTest = () => {
        _deployTest();
        getTestBuildingStatus();
    }

    // Setup function to trigger a production build.
    const [_deployProduction, deployProductionResult] = useLazyFetch(`${strapi.backendURL}/deploy/deploy-production`, {
        method: 'POST',
    });

    const deployProduction = () => {
        _deployProduction();
        getProductionBuildingStatus();
    }

    // Create status of the enviroments
    const testStatus = React.useMemo(() => {
        if (testBuildingResult.data === undefined) return 'LOADING';
        if (testBuildingResult?.data?.building) return 'BUILDING';
        if (deployTestResult?.called) return 'BUILD';
        return 'READY';
    }, [testBuildingResult, deployTestResult]);

    const productionStatus = React.useMemo(() => {
        if (productionBuildingResult.data === undefined) return 'LOADING';
        if (productionBuildingResult?.data?.building) return 'BUILDING';
        if (deployProductionResult?.called) return 'BUILD';
        if (testStatus !== 'BUILD') return 'WAITING_FOR_TEST';
        return 'READY';
    }, [productionBuildingResult, deployProductionResult, testStatus]);

    return (
        <>
            <PanelBorder style={{ marginRight: '20px' }}>
                <h2>Test Enviroment</h2>
                <PanelKeyValue header="Status" value={ENVIROMENT_STATES[testStatus]} />
                <PanelLink href="https://intel-robotics-app-test-dx283.ondigitalocean.app/">
                    See Test Enviroment
                </PanelLink>
                <Button
                    status={enviromentStateToButtonState(testStatus)}
                    onClick={deployTest}>
                    Deploy preview
                </Button>
            </PanelBorder>

            <PanelBorder>
                <h2>Production Enviroment</h2>
                <PanelKeyValue header="Status" value={ENVIROMENT_STATES[productionStatus]} />
                <PanelLink href="https://intel-robotics-app-sz3mz.ondigitalocean.app/">
                    See Production Enviroment
                </PanelLink>
                <Button
                    status={enviromentStateToButtonState(productionStatus)}
                    onClick={deployProduction}>
                    Deploy preview to Production
                </Button>
            </PanelBorder>
        </>
    );
};

export default memo(ActionPanel);
