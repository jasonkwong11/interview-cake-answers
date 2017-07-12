function timeConversion(s) {
    // Complete this function
    var ampm = s.slice(s.length - 2)
    var time = s.slice(0, s.length - 2)
    var hour = parseInt(time.slice(0,2))
    
    if (ampm == "PM" && hour != 12) {
        return (hour + 12) + time.slice(2)
    } else if (ampm == "PM" && hour == 12){
        return time
    } else if (ampm == "AM" && hour >= 22){
        return (hour - 12) + time.slice(2)
    } else if (ampm == "AM" && hour == 12){
        return "00" + time.slice(2)
    } else {
        return time
    }
    
}

s = '12:45:54PM'
//should return 12:45:54

console.log(timeConversion(s))