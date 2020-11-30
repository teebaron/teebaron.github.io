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

var door_nr_array = [
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
const curDay = 24-days_to_xmas();
// const curDay = 5;
console.log("Today: " + curDay);
counter.innerHTML = days_to_xmas();

//lock all doors 
var allDoors = document.getElementsByClassName("door");

Array.from(allDoors).forEach((el) => {
    var checkbox = el.parentElement.children[0];
    var front = el.getElementsByClassName("front")[0];
    var back = el.getElementsByClassName("back")[0];
    var day = parseInt(front.innerHTML);
    console.log(day);
    
    if(curDay === day){
        //today
        checkbox.checked = false;
        checkbox.disabled = false;
        back.onclick = function(ev) {
            checkbox.disabled = true; 
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function() {
                modal.style.display = "none";
            }
            modal.style.display = "block";

            //BTNs
            var btn_1 = document.getElementById("btn_1");
            var btn_2 = document.getElementById("btn_2");
            var btn_3 = document.getElementById("btn_3");
            console.log(btn_2);
            console.log(btn_3);
            var answer_wrong_div = document.getElementById("answer_wrong");
            var answer_div = document.getElementById("answer");
            btn_1.onclick = function() {
                answer_wrong_div.style.display = "block";
                answer_div.style.display = "none";
            }
            btn_2.onclick = function() {
                answer_wrong_div.style.display = "none";
                answer_div.style.display = "block";
            }
            btn_3.onclick = function() {
                answer_wrong_div.style.display = "block";
                answer_div.style.display = "none";
            }
        }
    }else if(curDay > day) {
        //past
        checkbox.checked = true;
        checkbox.disabled = false;
        back.innerHTML = door_nr_array[day-1];
    }else{
        //haha not now
        checkbox.checked = false;
        checkbox.disabled = true;
    }
});


function days_to_xmas() {
    const xmas = new Date(2020,11,24);
    const now = new Date();
    console.log(xmas);
    console.log(now);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(xmas - now);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}