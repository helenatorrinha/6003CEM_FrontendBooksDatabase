import React from 'react';
import { Input, Layout } from 'antd';
import Grid from './grid';

const { Search } = Input;

const { Header, Content, Footer } = Layout;

function Home(props) {
  
  return (
      <div className="site-layout-content">
        <Layout>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <Header className="site-page-header"
            title="Books Database"
            subTitle="Welcome to the books database."/>
        </Layout>  
        <Grid />
      </div>
  );
}

export default Home;
