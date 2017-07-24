import { combineReducers } from 'redux'
import login from './login'

/*使用redux的combineReducers方法将所有reducer打包起来*/
const rootReducer = combineReducers({
    login
})

export default rootReducer