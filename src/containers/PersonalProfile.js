import React, {Component} from "react";
import { Descriptions, Tag, Button } from 'antd';
import axios from "axios";

class PersonalProfile extends Component {
    state = {
        netid: '',
        name: '',
        identity: '',
        gpa: 'N/A',
        department: '',
        tags: [''],
        re_render: 0,
    };

    componentWillMount() {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/main/getProfile/', {headers: {"Authorization":token}})
            .then(res => {
                const data = JSON.parse(res.data);
                console.log(data.tags);
                if (data.tags.length === 0){
                    data.tags = [''];
                }
                this.setState({
                    netid: data.netid,
                    name: data.name,
                    identity: data.identity,
                    gpa: data.gpa,
                    department: data.department,
                    tags: data.tags,
                })
                console.log(this.state)
            })
    }
    updateProfileLink =()=>{
        this.props.history.push('/profile/update/');
    };

    deleteProfile =()=>{
        const token = localStorage.getItem('token');

        axios.get('http://127.0.0.1:8000/api/main/profile/delete/', {headers: {"Authorization":token}})
            .then(res=>{
                // console.log(token);
                const token = localStorage.getItem('token');
                axios.get('http://127.0.0.1:8000/api/main/getProfile/', {headers: {"Authorization":token}})
                    .then(res => {
                        const data = JSON.parse(res.data);
                        // console.log(data.tags);
                        this.setState({
                            netid: data.netid,
                            name: data.name,
                            identity: data.identity,
                            gpa: data.gpa,
                            department: data.department,
                            tags: data.tags,
                        })
                    })
            })

    };


    render() {
        return (
            <div>
                <Descriptions
                    title="My profile"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="NetId">{this.state.netid}</Descriptions.Item>
                    <Descriptions.Item label="Name">{this.state.name}</Descriptions.Item>
                    <Descriptions.Item label="Identity">{this.state.identity}</Descriptions.Item>
                    <Descriptions.Item label="Department">{this.state.department}</Descriptions.Item>
                    <Descriptions.Item label="GPA">{this.state.gpa}</Descriptions.Item>
                    <Descriptions.Item label=""></Descriptions.Item>
                    <Descriptions.Item label="Research Interest">
                        {this.state.tags.map(function (tag, index) {
                            return (
                                <Tag color="green">{tag}</Tag>
                            );
                        })}
                    </Descriptions.Item>
                </Descriptions>
                {
                    this.state.name === '' ?
                        <Button type="primary" style={{margin:"20px"}} onClick={this.updateProfileLink}>Create profile now!</Button>
                    :
                        <div>
                        <Button type="primary" style={{margin:"20px"}} onClick={this.updateProfileLink}>Update</Button>
                        <Button type="primary" danger style={{margin:"20px"}} onClick={this.deleteProfile}>Delete</Button>
                        </div>
                }
            </div>
        );
    }
}


export default PersonalProfile