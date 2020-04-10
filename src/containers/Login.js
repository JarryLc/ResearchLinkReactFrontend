import React, {Component} from "react";
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import {NavLink} from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import * as actions from '../store/actions/auth'



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const formItemLayoutWithOutLabel = {
    // wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    // },
    labelCol: { span: 24 },
    wrapperCol: { span: 10 }

};

class Login extends Component {
    onFinish = values => {
        // console.log('Success:', values);
        this.props.onAuth(values.username, values.password);
        this.props.history.push('/');
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    render() {
        let errorMsg = null;
        if (this.props.error) {
            errorMsg = this.props.error.message;
        }
        return (
            <div>
                <p>{errorMsg}</p>
                {
                    this.props.loading ?
                        <Spin indicator={antIcon} />
                        :
                        <Form
                            {...formItemLayoutWithOutLabel}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                label="NetId"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your NetId!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
                                    Login
                                </Button>Or
                                <NavLink to='/signup/'> signup
                                </NavLink>
                            </Form.Item>
                        </Form>
                }
            </div>
        );
    }


}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error,
  }
};


const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);