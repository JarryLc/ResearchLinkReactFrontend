import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Form.css'
import {authSuccess, logout} from "../store/actions/auth";
import {Link} from "react-router-dom";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
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


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


class CreateProfileForm extends Component {
    state = {
        departmentList: [],
        selectedDepartment: '',
        initialUsername: localStorage.getItem('username'),
        containerId: '',
    };
    onFinish = values => {
        // console.log('Received values of form:', values);
        const token = localStorage.getItem('token');
        if (token !== undefined && token !== null){
            axios.defaults.headers = {
                Authorization: token,
            }
        }
        let tag = [''];
        if (values.tags === undefined || values.tags === null ){
        }
        else{
            tag = values.tags;
        }
        axios.post('http://127.0.0.1:8000/api/main/profile/modify/', {
            netid: this.state.initialUsername,
            name: values.name,
            gpa: values.gpa,
            department: this.state.selectedDepartment,
            tags: tag,
        }).then(res => {
            this.props.history.push('/profile/');
        })
            .catch(error => console.log(error));

        // this.props.changeStateFromChild(['5']);

    };

    onSelectHandler = value =>{
        this.state.selectedDepartment = value;
    };


    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/main/departmentList/', {headers: {"Authorization":token}})
            .then(res => {
                const data = JSON.parse(res.data);
                // console.log(data);
                // console.log(data.username);
                this._asyncRequest = null;
                this.setState({
                    departmentList: data.departmentList,
                    selectedDepartment: data.departmentList[0],
                    initialUsername: data.username,
                });
            });
        // this.setState({
        //     containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
        // });
        // this.props.changeStateFromChild(['5']);
        // console.log(ReactDOM.findDOMNode(this).parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("logo"))
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }



    render() {
        const {Option} = Select;
        if (this.state.initialUsername === '') {
            return <div>Loading...</div>
        } else {
            return (
                <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={this.onFinish}>
                    <Form.Item
                        label="NetId"
                        name="netid"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your NetId!',
                            },
                        ]}
                    >
                        {/*onChange={this.netidOnchange}*/}
                        <Input placeholder={this.state.initialUsername} disabled={true} style={{width: '80%'}}/>
                    </Form.Item>


                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input style={{width: '80%'}}/>
                    </Form.Item>

                    {
                        localStorage.getItem('identity') === 'student' ?
                            <Form.Item
                                label="GPA"
                                name="gpa"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your GPA!',
                                    },
                                ]}
                            >
                                <InputNumber min={0} max={5.00} step={0.01}/>
                            </Form.Item>
                            :
                            null
                            // <Form.Item
                            //     label="GPA"
                            //     name="gpa"
                            //     rules={[
                            //         {
                            //             required: true,
                            //             message: 'Please input your GPA!',
                            //         },
                            //     ]}
                            // >
                            //     <InputNumber min={0} max={5.00} step={0.01} value={"4.00"}/>
                            // </Form.Item>
                    }


                    <Form.Item
                        label="Department"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your department!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a department"
                            defaultActiveFirstOption='true'
                            onSelect={this.onSelectHandler}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.departmentList.map(function (department, index) {
                                return <Option key={index} value={department}>{department}</Option>;
                            })}
                        </Select>,
                    </Form.Item>


                    <Form.List name="tags">
                        {(fields, {add, remove}) => {
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayoutWithOutLabel : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Research Interest' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input your research interest or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="Interest tag" style={{width: '80%'}}/>
                                            </Form.Item>
                                            {fields.length >= 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    style={{margin: '0 8px'}}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{width: '80%'}}
                                        >
                                            <PlusOutlined/> Add research interests here!
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>

                    <Form.Item {...layout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
}



export default CreateProfileForm;