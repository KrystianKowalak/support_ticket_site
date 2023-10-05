function formatTimestamp(date) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date input. Please provide a Date object.");
    };
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    return formattedTime;
};

function formatDate(date) {
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth() + 1; 
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
  
    return `${shortMonthNames[monthIndex - 1]} ${day}, ${year} ${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};

function findDiff(newValue, oldValue, activeUser) {
  const differences = [];

  function compareObjects(newObj, oldObj, path = []) {
    for (const key in newObj) {
      const newPath = [...path, key];

      if (typeof newObj[key] === "object" && newObj[key] !== null && !Array.isArray(newObj[key])) {
        compareObjects(newObj[key], oldObj[key], newPath);
      } else if (!(key in oldObj)) {
        differences.push(`${newPath.join(".")} was added with value ${newObj[key]} by ${activeUser}.`);
      } else if (newObj[key] !== oldObj[key]) {
        differences.push(`${newPath.join(".")} was changed from ${oldObj[key]} to ${newObj[key]} by ${activeUser}.`);
      }
    }
  };

  compareObjects(newValue, oldValue);
  
  for (const key in oldValue) {
    if (!(key in newValue)) {
      differences.push(`${key} was removed (previously had value ${oldValue[key]}) by ${activeUser}.`);
    }
  };

  return differences;
};




// ADD NEW FUNCTIONS
module.exports = { formatTimestamp, formatDate, findDiff }