import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';

import { BrowserRouter as Router, Route , Link,Switch} from "react-router-dom"
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';

import '../RenderBloc/RenderBloc.css'

import BlocNotFound404 from '../BlocNotFound404/BlocNotFound404'
import blocTwo from '../BlocTwo/BlocTwo'
import CovidMainBloc from '../CovidBloc/Covid.app'
import blocTree from '../BlocTree/blocTree'

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
      <Layout>
        <Sider style={{height:'auto'}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<MedicineBoxOutlined />}>
              <Link to='/'>
              Ковид
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to='2'>
                one
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to='/3'>
               two
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ paddingLeft: 10 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              backgroundColor:'lavenderblush'
            }}
          >
            <Switch>
              <Route exact path='/' component={CovidMainBloc}  />
              <Route path='/2' component={blocTwo} />
              <Route path='/3' component={blocTree} />
              <Route component={BlocNotFound404} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
     </Router>
    );
  }
}

export default SiderDemo