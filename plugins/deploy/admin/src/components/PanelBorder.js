import React from 'react';

const PanelBorder = ({ style, children }) => (
    <div style={{
        ...style,
        border: '1px solid rgb(207 207 207)',
        padding: '10px',
        display: 'inline-block',
    }}>
        {children}
    </div>
);

export default PanelBorder;