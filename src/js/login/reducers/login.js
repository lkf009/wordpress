import { ONPOPUP_TODO, HOMEINIT_TODO } from '../actions/login'

/*reducer其实也是个方法而已,参数是state和action,返回值是新的state*/
export default function login(state, action) {
    state = {
        content:''
    };
    
    switch (action.type) {
        case ONPOPUP_TODO:
            return Object.assign({}, state, { content : action.content});
        case HOMEINIT_TODO :
            return Object.assign({}, state, action.state);
        default:
            return state;
    }
}