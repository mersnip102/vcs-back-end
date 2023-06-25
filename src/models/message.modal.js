const db = require('../DB/connect.js');

const Message = function(message) {

    this.Id = message.Id;
    this.Content = message.Content;
    this.SenderId = message.SenderId;
    this.ReceiverId = message.ReceiverId;
    this.File = message.File;
    this.Room = message.Room;
    this.TimeStamp = message.TimeStamp;
}

const { formatTime } = require("../common/formatTime");
Message.getListMessageByRoom = async function(Room, result) {

    await db.query("SELECT * FROM messages WHERE Room = ? ORDER BY TimeStamp DESC LIMIT 1", Room, function(err, res) {


        if (err) {
            result(true, err);


        } else {
            if (res.length > 0) {
                res[0].TimeStamp = formatTime(res[0].TimeStamp)

            }
            console.log(res)

            result(false, res)
        }
    });
}


Message.remove = async function(id, result) {
    await db.query("DELETE FROM messages WHERE Id = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(true, err);

        } else {
            result(false, res);
        }
    });
}


module.exports = Message;