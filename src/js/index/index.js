import React from 'react'
import { render } from 'react-dom'
import Header from '../public/components/Header'

class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /*首次实例化*/
    componentDidMount(){
        let that = this;
        let timestamp = (new Date()).getTime();
        let url = '/ajax/init?t=' + timestamp;
        fetch(url, {credentials: 'include'}).then((response)=>{
            return response.json()
        }).then((result)=>{
            if(result.status){
                let state = {
                    user : result.user
                };
                that.setState(state);
            }else{
            }
        }).catch((ex) => {
            console.log(ex);
        });
    }

    render(){
        return <Header {...this.state}/>
    }
}

render(
    <Index />,
    document.getElementById('container')
);