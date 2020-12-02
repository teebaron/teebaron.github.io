function gen(){
    var xmas1 = ["🎅🏼","🦌"];
    var xmas2 = ["❄️","☃️"];
    for (var i = 0; i < 24; i++){
        let test = i.toString(2);
        test = test.padStart(5,"0");
        let out = "";
        let icon1 = getRandomIcon(xmas1);
        let icon2 = getRandomIcon(xmas2);
        for (var x = 0; x < test.length; x++){
            out += test[x] === "1" ? icon1 : icon2;
        }
        console.log('"' + out + '"' + ",");
    }
}

function getRandomIcon(array) {
    var i = Math.floor(Math.random() * Math.floor(array.length));
    return array[i];
}

const door_nr_array = [
    "❄️❄️❄️❄️❄️",
    "☃️☃️☃️☃️🎅🏼",
    "☃️☃️☃️🦌☃️",
    "☃️☃️☃️🎅🏼🎅🏼",
    "☃️☃️🦌☃️☃️",
    "❄️❄️🦌❄️🦌",
    "☃️☃️🦌🦌☃️",
    "☃️☃️🦌🦌🦌",
    "☃️🎅🏼☃️☃️☃️",
    "❄️🦌❄️❄️🦌",
    "☃️🦌☃️🦌☃️",
    "❄️🦌❄️🦌🦌",
    "☃️🎅🏼🎅🏼☃️☃️",
    "☃️🦌🦌☃️🦌",
    "☃️🎅🏼🎅🏼🎅🏼☃️",
    "☃️🦌🦌🦌🦌",
    "🎅🏼☃️☃️☃️☃️",
    "🎅🏼❄️❄️❄️🎅🏼",
    "🎅🏼☃️☃️🎅🏼☃️",
    "🎅🏼❄️❄️🎅🏼🎅🏼",
    "🦌☃️🦌☃️☃️",
    "🎅🏼☃️🎅🏼☃️🎅🏼",
    "🎅🏼☃️🎅🏼🎅🏼☃️",
    "🦌☃️🦌🦌🦌"];

var counter = document.getElementById("counter");
//const curDay = 24-days_to_xmas();
const curDay = 3;
console.log("Today: " + curDay);
counter.innerHTML = days_to_xmas();

//lock all doors 
var allDoors = document.getElementsByClassName("door");

Array.from(allDoors).forEach((el) => {
    var checkbox = el.parentElement.children[0];
    var front = el.getElementsByClassName("front")[0];
    var back = el.getElementsByClassName("back")[0];
    var day = parseInt(front.innerHTML);
    
    //can open
    console.log(curDay >= day);
    console.log(day);
    if(curDay === day){
        //today or past
        checkbox.checked = false;
        checkbox.disabled = false;
        back.innerHTML = "Click me!";
        back.onclick = function(ev) {
            checkbox.disabled = true; 
            var modal = document.getElementById("myModal");
            var modalContent = document.getElementById("modal-content-" + day);
            var span = document.getElementsByClassName("close")[day-1];
            span.onclick = function() {
                modal.style.display = "none";
                modalContent.style.display = "none";
            }
            modal.style.display = "block";
            modalContent.style.display = "block";
        }
    }else if(curDay > day) {
        //past
        checkbox.checked = true;
        checkbox.disabled = false;
        back.innerHTML = door_nr_array[day-1];
        back.onclick = function(ev) {
            checkbox.disabled = true; 
            var modal = document.getElementById("myModal");
            var modalContent = document.getElementById("modal-content-" + day);
            var span = document.getElementsByClassName("close")[day-1];
            span.onclick = function() {
                modal.style.display = "none";
                modalContent.style.display = "none";
            }
            modal.style.display = "block";
            modalContent.style.display = "block";
        }
    }else{
        //haha not now
        checkbox.checked = false;
        checkbox.disabled = true;
    }
});

function open_day(day){
    var dayContent = CONTENT_DAY[day-1];
    if(dayContent.type == 0){
        
    }
}

function showAnswer(btn,isRight){
    var day_modal_conten = btn.parentElement;
    var answer_wrong_div = day_modal_conten.querySelector("#answer_wrong");
    var answer_div = day_modal_conten.querySelector("#answer");
    var day = parseInt(day_modal_conten.getAttribute('value'));
    if(isRight){
        answer_wrong_div.style.display = "none";
        answer_div.style.display = "block";
        var answer_code = answer_div.querySelector("#code");
        answer_code.innerHTML = door_nr_array[day-1];
    }else{
        answer_wrong_div.style.display = "block";
        answer_div.style.display = "none";
    }
}

function checkAnswer(btn,rightAnswer){
    var day_modal_conten = btn.parentElement;
    var input = day_modal_conten.querySelector("#fname").value;
    console.log(input);
    showAnswer(btn,input.toLowerCase() === rightAnswer.toLowerCase())
}

function days_to_xmas() {
    const xmas = new Date(2020,11,24);
    const now = new Date();
    console.log(xmas);
    console.log(now);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const diff = Math.ceil((xmas.getTime()-now.getTime())/(ONE_DAY));
    return diff;

}

