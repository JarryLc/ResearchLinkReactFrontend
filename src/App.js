import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import BasicLayout from './containers/layout';
import ProfileTable from "./containers/StudentProfileTable";
import BaseRouter from "./router";
import { BrowserRouter as Router }from "react-router-dom";
import {connect} from 'react-redux';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import * as actions from './store/actions/auth'

class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <BasicLayout {...this.props}>
                        <BaseRouter/>
                    </BasicLayout>
                </Router>
            </div>
        );
    }
}

const mapState2Props = state => {
    return {
        isAuthenticated: state.token != null
    }
};

const mapDispatch2Props = dispatch => {
    return {
        onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
};

export default connect(mapState2Props, mapDispatch2Props)(App);
