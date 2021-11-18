import React, { memo } from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Deploy the Application</h1>
      <button>Deploy preview</button>
      <button>Deploy preview to Production</button>
    </div>
  );
};

export default memo(HomePage);
