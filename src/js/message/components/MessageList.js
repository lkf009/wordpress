//var EventEmitter = require('events').EventEmitter;
import EventEmitter from 'events';

class MessageList extends EventEmitter {
    constructor() {
        super();
        this.allData = null;
    }

    getAllData(callback) {
        var self = this;
        fetch(
            '/data/getMessage'
        ).then((response)=>{
            return response.json();
        }).then((result)=>{
            self.allData = result;
            callback(self.allData);
        }).catch((ex)=>{
            console.log(ex);
        });;
    }
}

export default MessageList;