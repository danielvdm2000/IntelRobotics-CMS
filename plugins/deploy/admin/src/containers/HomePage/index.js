import React, { memo } from 'react';
import ActionPanel from '../../components/ActionPanel';

const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Deploy the Application</h1>
    <ActionPanel />
  </div>
);

export default memo(HomePage);
