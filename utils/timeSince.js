// Date Function
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        const years = Math.floor(interval);
        if (years === 1) {
            return years + " year ago";
        }
        else {
            return years + " years ago";
        }
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        const months = Math.floor(interval);
        if (months === 1) {
            return months + " month ago";
        }
        else {
            return months + " months ago";
        }
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval);
        if (days === 1) {
            return days + " day ago";
        }
        else {
            return days + " days ago";
        }
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval);
        if (hours === 1) {
            return hours + " hour ago";
        }
        else {
            return hours + " hours ago";
        }
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval);
        if (minutes === 1) {
            return minutes + " minute ago";
        }
        else {
            return minutes + " minutes ago";
        }
    }
    const secondsAgo = Math.floor(seconds);
    if (secondsAgo === 1) {
        return secondsAgo + " second ago";
    }
    else {
        return secondsAgo + " seconds ago";
    }
}
module.exports = {
    timeSince: timeSince
}