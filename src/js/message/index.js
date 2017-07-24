import React from 'react';
import {render} from 'react-dom';
import MessageList from './components/MessageList';

class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messageList: []
        };
        this.getData();
    }

    componentDidMount(){

    }

    /*关闭消息框*/
    onPopupEnd(){

    }

    /*获取数据*/
    getData() {
        var self = this;
        var messageList = new MessageList();
        messageList.getAllData(function (data) {
            var i = 0;
            var len = data.length;
            var messageListArr = [];
            for(; i<len; i++) {
                messageListArr[i] = data[i].Message;
            }
            self.setState({messageList: messageListArr});
            console.log(self.state.messageList);
        })
    }

    render(){
        var self = this;
        var messages = this.state.messageList;
        var arr = [];

        messages.forEach(function(em) {
            arr.push(<li key={em}> {em} </li>);
        });
        return (
            <section className="pageContentInner">
                <div className="head-section"><h1>MessageList: </h1></div>
                <ul>
                    {arr}
                </ul>
            </section>
        );
    }
}

render(<Message/>, document.getElementById('container'));
