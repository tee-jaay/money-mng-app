import { combineReducers } from 'redux'
import authReucer from './authReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
    auth: authReucer,
    transactions: transactionReducer
})

export default rootReducer