import React from 'react';
import { PageHeader } from 'antd';
import BookGrid from './bookgrid';

function Home(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="Books in the Database"/>
        </div>  
        <BookGrid />
      </div>
  );
}

export default Home;
