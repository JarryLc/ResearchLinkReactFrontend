import React, {Component, useState} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayoutWithOutLabel = {
    // wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    // },
    labelCol: { span: 24 },
    wrapperCol: { span: 10 }

};
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Signup extends Component {
    // const form = this.Form.useForm();

    onFinish = values => {
        console.log('Received values of form: ', values);
        this.props.onAuth(values.username, values.email, values.password, values.confirm, values.identity);
        this.props.history.push('/');
    };




    render(){
        return (
            <Form
                {...formItemLayoutWithOutLabel}
                // form={this.form}
                name="register"
                onFinish={this.onFinish}
                // initialValues={{
                //     residence: ['zhejiang', 'hangzhou', 'xihu'],
                //     prefix: '86',
                // }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="NetId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your NetId!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Identity"
                    name="identity"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your identity!' }]}
                >
                    <Select placeholder="Please select your identity">
                        <Option value="student">I'm a student</Option>
                        <Option value="professor">I'm a professor</Option>
                    </Select>
                </Form.Item>


                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
                        Sign up
                    </Button>Or
                    <NavLink to='/login/'> login
                    </NavLink>
                </Form.Item>
            </Form>
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
        onAuth: (username, email, password, confirm, identity) => dispatch(actions.authSignup(username, email, password, confirm, identity))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);