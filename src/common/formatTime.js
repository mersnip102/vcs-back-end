const moment = require('moment');

function formatTime(timestamp) {
    const now = moment();
    const messageTime = moment(timestamp);

    if (now.diff(messageTime, 'seconds') < 60) {
        return 'just now';
    } else if (now.diff(messageTime, 'minutes') < 60) {
        return now.diff(messageTime, 'minutes') + ' minutes ago';
    } else if (now.diff(messageTime, 'hours') < 24) {
        return now.diff(messageTime, 'hours') + ' hours ago';
    } else {
        return messageTime.format('MMM DD, YYYY HH:mm');
    }
}

module.exports = {
    formatTime
};