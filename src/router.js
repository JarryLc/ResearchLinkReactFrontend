import React from "react";
import {Route}  from "react-router-dom";

import StudentProfileTable from "./containers/StudentProfileTable";
import CreateProfileForm from "./containers/Form";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PersonalProfile from "./containers/PersonalProfile";
import Home from "./containers/Home";
import ProfessorProfileTable from "./containers/ProfessorProfileTable";
import Analysis from "./containers/Analysis";

const BaseRouter =()=>(
    <div>
        <Route path='/' exact component={Home} />
        <Route path='/home/' exact component={Home} />
        <Route path='/search/student/' exact component={StudentProfileTable} />
        <Route path='/search/professor/' exact component={ProfessorProfileTable} />
        <Route path='/profile/update/' exact component={CreateProfileForm} />
        <Route path='/profile/' exact component={PersonalProfile} />
        <Route path='/analysis/' exact component={Analysis} />

        <Route path='/login/' exact component={Login} />
        <Route path='/signup/' exact component={Signup} />
    </div>
    );

export default BaseRouter