import React from 'react';
import { PageHeader } from 'antd';
import GenreGrid from './genregrid';

function Home(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="Genres of books in the Database"/>
        </div>  
        <GenreGrid />
      </div>
  );
}

export default Home;
