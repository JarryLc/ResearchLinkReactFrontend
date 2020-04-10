import React, {Component} from "react";
import { Table, Tag } from 'antd';
import { Card, Col, Row } from 'antd';
import axios from "axios";

const columns = [
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Average GPA',
        dataIndex: 'avg',
        key: 'avg',
    },
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    // },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <span>
    //     {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //             color = 'volcano';
    //         }
    //         return (
    //             <Tag color={color} key={tag}>
    //                 {tag.toUpperCase()}
    //             </Tag>
    //         );
    //     })}
    //   </span>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //     <a style={{ marginRight: 16 }}>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </span>
    //     ),
    // },
];



class Analysis extends Component{
    state = {
        averageGPA: [],
        recommend: [],
    };


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/main/statistics/')
            .then(res=>{
                const statistics = JSON.parse(res.data);
                // console.log(statistics);
                this.setState({
                    averageGPA: statistics,
                })
            });
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/main/recommendation/', {headers: {"Authorization":token}})
            .then(res=>{
                const recommendation = JSON.parse(res.data);
                // console.log(statistics);
                this.setState({
                    recommend: recommendation,
                })
            })
    }


    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.averageGPA} style={{margin: "20px"}}/>
                <h2 style={{margin: "20px"}}>Recommended for you!</h2>
                <div className="site-card-wrapper" style={{margin: "20px"}}>
                    <Row gutter={16}>
                        {this.state.recommend.map(function (candidate, index) {
                            return (
                                <Col span={8}>
                                    <Card title={candidate.netid} bordered={false}>
                                        {/*<p>{candidate.department}</p>*/}
                                        <p>{candidate.email}</p>
                                    </Card>
                                </Col>
                            );
                        })}

                    </Row>
                </div>
            </div>
            )

    }
}

export default Analysis