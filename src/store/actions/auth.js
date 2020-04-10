import * as actionTypes from './actionTypes'
import axios from 'axios'

export const  authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const  authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
};

export const  authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('identity');
    // localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};


// export const checkAuthTimeout = expirationDate => {
//     return dispatch => {
//         setTimeout(()=>{
//             dispatch(logout());
//         }, expirationDate * 1000)
//     }
// };

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password,
        })
            .then(res=>{
                const token = res.data.key;
                // const expirationDate = new Date(new Date().getTime() + 3600*1000);
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                axios.get('http://127.0.0.1:8000/api/main/getProfile/', {headers: {"Authorization":token}})
                    .then(res => {
                        const data = JSON.parse(res.data);
                        localStorage.setItem('identity', data.identity);
                        dispatch(authSuccess(token));
                    })
                // localStorage.setItem('expirationDate', expirationDate);

                // dispatch(checkAuthTimeout(3600));
            })
            .catch(error=> {
                dispatch(authFail(error))
            });


    }
};


export const authSignup = (username, email, password1, password2, identity) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
            .then(res=>{
                const token = res.data.key;
                console.log(res);
                // const expirationDate = new Date(new Date().getTime() + 3600*1000);
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                // localStorage.setItem('expirationDate', expirationDate);
                axios.post('http://127.0.0.1:8000/api/main/identitySignup/', {
                    'username': username,
                    'identity': identity
                })
                    .then(res=>{
                        localStorage.setItem('identity', identity);
                        dispatch(authSuccess(token));
                    });
                // dispatch(checkAuthTimeout(3600));
            })
            .catch(error=> {
                dispatch(authFail(error))
            });


    }
};


export const authCheckState =()=>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined || token === null){
            dispatch(logout());
        }
        else {
            // console.log(token);
            dispatch(authSuccess(token))
        }
    }
};