import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import * as Types from './types'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then((res) => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            console.log(res)
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            // save the token to local storage
            let token = res.data.token
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            // decode our token  
            let decode = jwtDecode(token)

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            })
            history.push('/dashboard')
            // set auth header
            // dispatch set user
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}
