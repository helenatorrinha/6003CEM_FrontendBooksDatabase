import React from 'react';
import { PageHeader, Input } from 'antd';

const { Search } = Input;

function Home(props) {
  
  return (
    <div className="site-layout-content">
    <div style={{ padding: '2% 20%' }}>
      <Search placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={null}/>
      <PageHeader className="site-page-header"
        title="Books' Database"
        subTitle="Welcome to the Books' Database."/>
    </div>  
  </div>
  );
}

export default Home;
