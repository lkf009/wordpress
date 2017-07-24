var getMessageList = require('./message');

exports.execute = function (req, res) {
    getMessageList.getMessageList(function (data) {
        res.send(data);
    });
};