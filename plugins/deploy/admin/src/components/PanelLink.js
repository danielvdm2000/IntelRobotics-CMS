import React from 'react';

const PanelLink = ({ href, children }) => (
    <a
        target="_blank"
        style={{ display: 'block', marginBottom: '10px' }}
        href={href}>
        {children}
    </a>
);

export default PanelLink;