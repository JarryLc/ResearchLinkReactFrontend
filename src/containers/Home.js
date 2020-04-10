import React, {Component} from "react";
import { Statistic, Row, Col, Button } from 'antd';
import axios from "axios";

class Home extends Component {

    state = {
        activeUser: 0,
        joinedStudent: 0,
        joinedProfessor: 0,
    };
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/main/StudentProfileList/',)
            .then(res => {
                const num = res.data.length;
                console.log(num);
                this.setState({
                    activeUser: this.state.activeUser + num,
                    joinedStudent: this.state.joinedStudent + num,
                });
            });
        axios.get('http://127.0.0.1:8000/api/main/ProfessorProfileList/',)
            .then(res => {
                const num = res.data.length;
                console.log(num);
                this.setState({
                    activeUser: this.state.activeUser + num,
                    joinedProfessor: this.state.joinedProfessor + num,
                });
            });
    }


    render() {
        return (
            <div>
                <div style={{margin: "40px"}}>
                    <h2 className="text-align-justify"><strong>Research Link</strong> is a portal designed to provide
                        undergraduate students with an exciting opportunity to engage in academic research, thereby helping
                        them to develop insightful perspectives on their areas of interest and advance the frontiers of
                        knowledge.&nbsp;</h2>
                    <h2 className="text-align-justify">Launched in 2020, Research Link allows students to immerse themselves
                        in a variety of tailor-made research projects under the supervision of world-class
                        researchers.&nbsp;</h2>
                    <h2 className="text-align-justify">Please explore this website to obtain up-to-date information on
                        potential research opportunities and to learn how Research Link can provide you with a challenging
                        and intellectually stimulating experience.</h2>
                </div>
                <Row gutter={16} style={{margin: "40px"}}>
                    <Col span={6}>
                        <Statistic title="Active Users" value={this.state.activeUser} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Joined Students" value={this.state.joinedStudent} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Joined Professors" value={this.state.joinedProfessor} />
                    </Col>
                    {/*<Col span={12}>*/}
                    {/*    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />*/}
                    {/*    <Button style={{ marginTop: 16 }} type="primary">*/}
                    {/*        Recharge*/}
                    {/*    </Button>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        )
    }
}

export default Home