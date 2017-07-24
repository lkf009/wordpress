import React, {Component} from 'react'
import Header from '../../public/components/Header'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /*首次实例化*/
    componentDidMount(){
        this.props.fetchHomeInit();
    }

    render(){
        return <Header {...this.props.login}/>
    }
}

export default Login;