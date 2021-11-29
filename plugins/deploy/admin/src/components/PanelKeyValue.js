import React from 'react';

const PanelKeyValue = ({ header, value }) => (
    <p>
        <span style={{ fontWeight: 500 }}>
            {header}:{' '}
        </span>
        {value}
    </p>
);

export default PanelKeyValue;