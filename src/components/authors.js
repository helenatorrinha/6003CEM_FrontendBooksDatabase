import React from 'react';
import { PageHeader } from 'antd';
import AuthorGrid from './authorgrid';

function Authors(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="Authors of Books in the Database"/>
        </div>  
        <AuthorGrid />
      </div>
  );
}

export default Authors;
