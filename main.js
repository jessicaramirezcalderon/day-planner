/*GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/

//Add current date to header
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
document.getElementById("currentDay").innerHTML = days[today.getDay()] + ', ' + months[today.getMonth()] + ' ' + today.getDate() + ' ' + today.getFullYear();
const hours = today.getHours();
const rows = document.querySelectorAll("[data-hour]");

const calEntry = {
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: ""
}

//Compare display and actual time
function present(currentHour, actualHour) {
    return currentHour === actualHour;
}

function past(currentHour, actualHour) {
    return currentHour > actualHour;
}

function future(currentHour, actualHour) {
    return currentHour < actualHour;
}

//update calEntry oject with the stored values
Object.assign(calEntry, JSON.parse(localStorage.getItem("server")));

//Assign different colors to different times
rows.forEach(function (el) {
    const hourAtt = parseInt(el.getAttribute("data-hour"));
    console.log(past(hours, hourAtt));

    if (present(hours, hourAtt)) {
        el.querySelector(".seg").className += " present";
    }

    else if (past(hours, hourAtt)) {
        el.querySelector(".seg").className += " past";
    }

    else if (future(hours, hourAtt)) {
        el.querySelector(".seg").className += " future";
    }
    //assign input value the object property value
    el.querySelector("input").value = calEntry[hourAtt];
});


//Add event handler to save event info

$(".saveBtn").click(function () {
    //get row element
    const rowInput = $(this).parent();
    //get hour from attriute in row element
    const hour = parseInt(rowInput.attr("data-hour"));
    //assign the input value to the hour Object
    calEntry[hour] = rowInput.find("input").val();
    //put the hour oject in local storage
    localStorage.setItem("server", JSON.stringify(calEntry));

});

