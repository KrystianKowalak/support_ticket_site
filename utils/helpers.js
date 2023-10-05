function formatTimestamp(date) {
    if (!(date instanceof Date)) {
        throw new Error("Invalid date input. Please provide a Date object.");
    }

    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};

function formatDate(date) {
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthIndex = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    
    return `${shortMonthNames[monthIndex - 1]} ${day}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

module.exports = { formatTimestamp, formatDate }