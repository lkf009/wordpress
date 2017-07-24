import React, {Component} from 'react';

class Header extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        let ulTag;
        if(typeof this.props.user != 'undefined' && this.props.user != null){
            ulTag = (
                <ul className="nav navbar-nav navbar-right">
                    <li className=""><a href="/"><span className="glyphicon glyphicon-asterisk"></span>首页</a></li>
                    <li><a href="/post"><span className="glyphicon glyphicon-log-out"></span> 文章</a></li>
                    <li><a href="/logout"><span className="glyphicon glyphicon-log-out"></span> 退出</a></li>
                </ul>
            );
        }else{
            ulTag = (
                <ul className="nav navbar-nav navbar-right">
                    <li className=""><a href="/"><span className="glyphicon glyphicon-asterisk"></span>首页</a></li>
                    <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> 登录</a></li>
                    <li><a href="/reg"><span className="glyphicon glyphicon-user"></span> 注册</a></li>
                </ul>
            );
        }

        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Express</a>
                    </div>
                    {ulTag}
                </div>
            </nav>
        );
    }
}

export default Header;