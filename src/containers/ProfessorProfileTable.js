import React, { useState }from "react";
import ReactDOM from 'react-dom';
import {Form, Table, Tag, Input, InputNumber, Button, Row, Col, Select} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ProfileTable.css';
const columns = [
    {
        title: 'NetId',
        dataIndex: 'netid',
        // filters: [
        //     {
        //         text: 'Joe',
        //         value: 'Joe',
        //     },
        //     {
        //         text: 'Jim',
        //         value: 'Jim',
        //     },
        //     {
        //         text: 'Submenu',
        //         value: 'Submenu',
        //         children: [
        //             {
        //                 text: 'Green',
        //                 value: 'Green',
        //             },
        //             {
        //                 text: 'Black',
        //                 value: 'Black',
        //             },
        //         ],
        //     },
        // ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
    {
        title: 'Name',
        dataIndex: 'name',
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.age - b.age,
    },
    // {
    //     title: 'GPA',
    //     dataIndex: 'gpa',
    //     // filters: [
    //     //     {
    //     //         text: 'London',
    //     //         value: 'London',
    //     //     },
    //     //     {
    //     //         text: 'New York',
    //     //         value: 'New York',
    //     //     },
    //     // ],
    //     // filterMultiple: false,
    //     // onFilter: (value, record) => record.address.indexOf(value) === 0,
    //     // sorter: (a, b) => a.address.length - b.address.length,
    //     // sortDirections: ['descend', 'ascend'],
    // },
    {
        title: 'Department',
        dataIndex: 'department',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={tag}>
                    {tag}
                </Tag>
            );
        })}
      </span>
        ),
    },
];


function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

class ProfessorProfileTable extends React.Component {
    state = {
        profiles: [],
        departmentList: [],
        selectedDepartment: '',
    };


    componentDidMount() {
        let tempProfile = [];
        const token = localStorage.getItem('token');
        if (token !== undefined && token !== null){
            console.log(token);
            axios.defaults.headers = {
                "Content-Type": "Application/json",
                Authorization: "Token "+token,
            }
        }
        // console.log(axios.defaults.headers);
        axios.get('http://127.0.0.1:8000/api/main/departmentList/', {headers: {"Authorization":token}})
            .then(res => {
                const data = JSON.parse(res.data);
                // console.log(data);
                // console.log(data.username);
                this._asyncRequest = null;
                this.setState({
                    departmentList: data.departmentList,
                    selectedDepartment: data.departmentList[0],
                });
            });
        axios.get('http://127.0.0.1:8000/api/main/ProfessorProfileList/')
            .then(res => {
                // this.setState({
                //     profiles: res.data
                // });
                tempProfile = res.data;
                // console.log(res.data);
                axios.get('http://127.0.0.1:8000/api/main/ProfessorTagsList/')
                    .then(res => {
                        // console.log(JSON.parse(res.data));
                        let tags = JSON.parse(res.data);
                        console.log(tempProfile);
                        console.log(tags);
                        for (let idx=0; idx<tempProfile.length; idx+=1){
                            let netid = tempProfile[idx].netid;
                            let flag = 0;
                            for (let i=0; i<tags.length; i+=1){

                                if (tags[i].netid === netid) {
                                    tempProfile[idx].tags = tags[i].tags;
                                    flag = 1;
                                    break;
                                }
                            }
                            if (flag === 0){
                                tempProfile[idx].tags = [''];
                            }
                        }
                        console.log(tempProfile);
                        this.setState({
                            profiles: tempProfile
                        });
                    });
            });
    }


    onSelectHandler = value =>{
        this.state.selectedDepartment = value;
    };

    getFields = () => {
        const {Option} = Select;
        const count = 8;
        const children = [];

        children.push(
            <Col span={5} key={0}>
                <Form.Item
                    name={`nameContain`}
                    // label={`Name contains...`}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input placeholder="Name contains..." />
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={5} key={1}>
                <Form.Item
                    name={`departmentIs`}
                    // label={`Name contains...`}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    {/*<Input placeholder="Department is..." />*/}
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Department is..."
                        defaultActiveFirstOption='true'
                        onSelect={this.onSelectHandler}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.departmentList.map(function (department, index) {
                            return <Option key={index} value={department}>{department}</Option>;
                        })}
                    </Select>
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={5} key={0}>
                <Form.Item
                    name={`tagContain`}
                    // label={`Name contains...`}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input placeholder="Tags contain..." />
                </Form.Item>
            </Col>,
        );


        return children;
    };

    onFinish = values => {
        // console.log('Received values of form: ', values);
        axios.post('http://127.0.0.1:8000/api/main/ProfessorProfileList/search/', {
            nameContain: values.nameContain,
            departmentIs: this.state.selectedDepartment,
            tagContain: values.tagContain,
        }).then(res => {
            // console.log(res);
            let tempProfile = JSON.parse(res.data);
            // console.log(tempProfile);
            axios.get('http://127.0.0.1:8000/api/main/ProfessorTagsList/')
                .then(res => {
                    // console.log(JSON.parse(res.data));
                    let tags = JSON.parse(res.data);
                    // console.log(tempProfile);
                    for (let idx=0; idx<tempProfile.length; idx+=1){
                        let netid = tempProfile[idx].netid;
                        let flag = 0;
                        for (let i=0; i<tags.length; i+=1){
                            if (tags[i].netid === netid) {
                                tempProfile[idx].tags = tags[i].tags;
                                flag = 1;
                                break;
                            }
                        }
                        if (flag === 0){
                            tempProfile[idx].tags = [''];
                        }
                    }
                    this.setState({
                        profiles: tempProfile
                    });
                });
        })
    };

    render() {
        // const [expand, setExpand] = useState(false);
        // const [form] = Form.useForm();
        return (
            <div>
                <Form
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={this.onFinish}
                    style={{margin:"15px"}}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table style={{margin: "20px"}} columns={columns} dataSource={this.state.profiles} onChange={onChange} />
            </div>
            // <Profile data={this.state.profiles}/>

        )
    }
}

export default ProfessorProfileTable



