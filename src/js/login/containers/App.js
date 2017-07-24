import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/Login'
import * as LoginActions from '../actions/login'

/*将state绑定到props*/
function mapStateToProps(state) {
    return state;
}
/*将action的所有方法绑定到props上*/
function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoginActions, dispatch)
}

/*通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上*/
export default connect(mapStateToProps, mapDispatchToProps)(Login);
