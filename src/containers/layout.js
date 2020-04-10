import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    LoginOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './layout.css'
import {Link, Route, withRouter} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import BaseRouter from "../router";
import ProfileTable from "./StudentProfileTable";
import CreateProfileForm from "./Form";
import PersonalProfile from "./PersonalProfile";
import Login from "./Login";
import Signup from "./Signup";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends React.Component {

    state = {
        collapsed: false,
        headerContext: "Research Link",
        selectedKeys: ['0'],
    };


    // changeStateFromChild = selectedKeys => {
    //     console.log("unusual change!" + String(selectedKeys));
    //     this.setState({
    //         selectedKeys: selectedKeys
    //     })
    // };
    // menuOnclick =selectedKey=>{
    //     console.log("usual change!" + String(selectedKey));
    //     this.setState({
    //         selectedKeys: selectedKey
    //     })
    // };


    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });

    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={this.state.selectedKeys}>
                        <Menu.Item key="1"><Link to='/home/'>
                            <DesktopOutlined />
                            <span>Home</span>
                        </Link></Menu.Item>
                        {
                            this.props.isAuthenticated ?
                            <Menu.Item key="3" onClick={this.props.logout}>
                            <LogoutOutlined />
                            <span>Logout</span>
                            </Menu.Item>
                            :
                            <Menu.Item key="2"><Link to='/login/'>
                                <LoginOutlined />
                                <span>Login</span></Link>
                            </Menu.Item>
                        }

                        {/*<Menu.Item key="4">*/}
                        {/*    <DesktopOutlined />*/}
                        {/*    <span>About</span>*/}
                        {/*</Menu.Item>*/}

                        {
                            this.props.isAuthenticated ?
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                  <UserOutlined />
                  <span>Profile</span>
                </span>
                                    }
                                >
                                    <Menu.Item key="5"><Link to='/profile/'>My Profile</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to='/profile/update/'>Update</Link></Menu.Item>
                                    {/*<Menu.Item key="5">Alex</Menu.Item>*/}
                                </SubMenu>
                                :
                                null
                        }
                        {
                            this.props.isAuthenticated ?
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                  <TeamOutlined />
                  <span>Search</span>
                </span>
                                    }
                                >
                                    <Menu.Item key="7"><Link to='/search/student/'>Search Students</Link></Menu.Item>
                                    <Menu.Item key="8"><Link to='/search/professor/'>Search Professors</Link></Menu.Item>
                                </SubMenu>
                                :
                                null
                        }
                        {
                            this.props.isAuthenticated ?
                                <Menu.Item key="9"><Link to='/analysis/'>
                                    <PieChartOutlined />
                                    <span>Analysis</span></Link>
                                </Menu.Item>
                                :
                                null
                        }

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{ padding: 0, fontWeight: "bold", fontSize: "25px"}}>*/}
                    {/*    {this.state.headerContext}*/}
                    {/*</Header>*/}
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                            {/*<BaseRouter />*/}
                            {/*<div>*/}
                            {/*    <Route path='/' exact component={ProfileTable} />*/}
                            {/*    <Route path='/search/student/' exact component={ProfileTable} />*/}
                            {/*    <Route path='/search/professor/' exact component={ProfileTable} />*/}
                            {/*    /!*<Route path='/profile/update/' exact component={CreateProfileForm} />*!/*/}
                            {/*    <Route path='/profile/update/' exact component={(props) => <CreateProfileForm {...props} changeStateFromChild={this.changeStateFromChild}/>}/>*/}

                            {/*    <Route path='/profile/' exact component={PersonalProfile} />*/}

                            {/*    <Route path='/login/' exact component={Login} />*/}
                            {/*    <Route path='/signup/' exact component={Signup} />*/}
                            {/*</div>*/}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Research Link ©2020 Created by Fantastic 4</Footer>
                </Layout>
            </Layout>
        );
    }
}



const mapDispatchToProps = dispatch =>{
    return {
        logout: () => {
            // this.props.history.push('/home/');
            dispatch(actions.logout())
        }
    }
};


export default withRouter(connect(null, mapDispatchToProps)(BasicLayout));

// ReactDOM.render(<SiderDemo />, mountNode);

// import React from "react";
// import { Layout, Menu, Breadcrumb } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
//
// const { SubMenu } = Menu;
// const { Header, Content, Sider } = Layout;
//
// const basicLayout = (props) => {
//     return (
//         <Layout>
//             <Header className="header">
//                 <div className="logo" />
//                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//                     <Menu.Item key="1">nav 1</Menu.Item>
//                     <Menu.Item key="2">nav 2</Menu.Item>
//                     <Menu.Item key="3">nav 3</Menu.Item>
//                 </Menu>
//             </Header>
//             <Layout>
//                 <Sider width={200} className="site-layout-background">
//                     <Menu
//                         mode="inline"
//                         defaultSelectedKeys={['1']}
//                         defaultOpenKeys={['sub1']}
//                         style={{ height: '100%', borderRight: 0 }}
//                     >
//                         <SubMenu key="sub1" title={
//                             <span>
//                             <UserOutlined />
//                                 subnav 1
//                             </span>
//                             }
//                         >
//                             <Menu.Item key="1">option1</Menu.Item>
//                             <Menu.Item key="2">option2</Menu.Item>
//                             <Menu.Item key="3">option3</Menu.Item>
//                             <Menu.Item key="4">option4</Menu.Item>
//                         </SubMenu>
//                         <SubMenu
//                             key="sub2"
//                             title={
//                                 <span>
//                 <LaptopOutlined />
//                 subnav 2
//               </span>
//                             }
//                         >
//                             <Menu.Item key="5">option5</Menu.Item>
//                             <Menu.Item key="6">option6</Menu.Item>
//                             <Menu.Item key="7">option7</Menu.Item>
//                             <Menu.Item key="8">option8</Menu.Item>
//                         </SubMenu>
//                         <SubMenu
//                             key="sub3"
//                             title={
//                                 <span>
//                 <NotificationOutlined />
//                 subnav 3
//               </span>
//                             }
//                         >
//                             <Menu.Item key="9">option9</Menu.Item>
//                             <Menu.Item key="10">option10</Menu.Item>
//                             <Menu.Item key="11">option11</Menu.Item>
//                             <Menu.Item key="12">option12</Menu.Item>
//                         </SubMenu>
//                     </Menu>
//                 </Sider>
//                 <Layout style={{ padding: '0 24px 24px' }}>
//                     <Breadcrumb style={{ margin: '16px 0' }}>
//                         <Breadcrumb.Item>Home</Breadcrumb.Item>
//                         <Breadcrumb.Item>List</Breadcrumb.Item>
//                         <Breadcrumb.Item>App</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <Content
//                         className="site-layout-background"
//                         style={{
//                             padding: 24,
//                             margin: 0,
//                             minHeight: 280,
//                         }}
//                     >
//                         {props.children}
//                     </Content>
//                 </Layout>
//             </Layout>
//         </Layout>
//     )
// };
//
// export default basicLayout