let head = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name");
    localStorage.setItem("name", myName);
    console.log(localStorage.getItem("name", myName));
    if (myName !== null && myName !== "") {
        head.textContent += ` MR ${myName}`;
    } else {
        alert("continue with gest");
        localStorage.setItem("name", "Gest");
        head.textContent += ` MR Gest`;
    }
}

setUserName();


// random api

const apiUrl = 'https://api.quotable.io/random';
var text = document.querySelector('.text');

async function getText() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        var gen = data.content;
        text.innerHTML = `<p>${data.content}</p> `;
        localStorage.setItem("strin", gen);
        localStorage.setItem("author",data.author );
        console.log(data);
    }
    catch (error) { }
}
document.addEventListener('DOMContentLoaded', getText)



var startTime;
var endTime;
document.getElementById("message-text").onclick = function () {
    if (document.getElementById("message-text").value !== null) {
        startTime = performance.now();
        console.log(startTime);
    }
}


var val = 0;
var time;
document.getElementById("bbt").onclick = function () {
    endTime = performance.now();
    console.log(endTime);
    var a = localStorage.getItem("name");
    var message = document.getElementById("message-text").value;
    var stored = localStorage.getItem("strin");
    time = (endTime - startTime) / 1000;
    time = parseFloat(time.toFixed(3));
    // console.log("Time taken: " + time  + "seconds");
    if (message === stored) {
        val++;
        getText();
        document.getElementById("h2").innerText = `Correct answer (${a})  POINTS(${val})  TIME(${time}s)`;
        document.getElementById("h2").style.color = "rgb(60, 255, 0)";
        document.getElementById("change").style.color = "rgb(60, 255, 0)";
    }
    else {
        alert("Wrong answer");
        val--;
        document.getElementById("h2").innerText = `Wrong answer (${a})  POINTS(${val})  TIME(${time}s)`;
        document.getElementById("h2").style.color = "rgb(255, 0, 0)";
        document.getElementById("change").style.color = "rgb(255, 0, 0)";
    }
    create();
    clearInput();
};

// about btn

let about = document.getElementById('bu4');
let hide = document.getElementById('about');

about.onclick = function () {
    if (!hide.classList.contains("co")) {
        about.style.top = "50%";
        hide.classList.add("co");
    } else {
        about.style.top = "-38%";
        hide.classList.remove("co");
    }
}






// dark--light

var mod = document.getElementById('mod');
var navCo = document.getElementById('nav-co');
var footer = document.getElementById('footer');
var changeAb = document.getElementById('change-ab');
var tap1 = document.getElementById('tap1');

mod.onclick = function () {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        mod.classList.add('fa-sun');
        mod.classList.remove('fa-moon');
        navCo.style.backgroundColor = "#fff";
        footer.style.backgroundColor = "rgb(85, 83, 85)";
        changeAb.style.backgroundColor = "#fff";
        tap1.style.backgroundColor='#fff';
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        mod.classList.add('fa-moon');
        mod.classList.remove('fa-sun');
        navCo.style.backgroundColor = "#000000c0";
        footer.style.backgroundColor = "#000";
        changeAb.style.backgroundColor = "#000";
        tap1.style.backgroundColor='#212529';
    }
}





// result table

// var resultbtn = document.getElementById('resultbtn');
// var tap1 = document.getElementById('tap1');
// var tap2 = document.getElementById('tap2');
// var tbody=document.getElementById('tbody');
// var tbody2=document.getElementById('tbody2');

// resultbtn.onclick = function () {
//     if (tap1.classList.contains('hide') && tap2.classList.contains('hide')) {
//         tap1.classList.remove('hide');
//         tap2.classList.remove('hide');
//     }
//     else {
//         tap1.classList.add('hide');
//         tap2.classList.add('hide');
//     }
// }
var resultObj;
var arrobj=[];
var lastval=0;
function create(){
    resultObj={
        author:localStorage.getItem("author" ),
        qoute:localStorage.getItem('strin'),
        totalPoint:val,
        time:time,
        point:function(){
            var curentval = this.totalPoint;
            if(curentval>lastval){
                lastval = curentval;
                console.log(1)
                return '+1'
            }
            else{
                lastval = curentval;
                console.log(0)
                return '-1'
            }
        },
        qouteCounter:function(){
            let words = this.qoute.split(" ").length;
            return words;
        }
    }
    arrobj.push(resultObj);
    // retrive(arrobj);
    retriveLast(arrobj);
    dispalyEndResult();
}

function totalTime(arr){
    var tTime=0;
    for(var i=0;i<arr.length;i++){
        tTime+=arr[i].time;
    }
    return tTime;
}

function totalqouteCounter(arr){
    var tword=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i].point()=='+1'){
            tword+=arr[i].qouteCounter();
        }
    }
    return tword;
}

function totalLeterCounter(arr){
    var tleter=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i].point()=='+1'){
            tleter+=arr[i].qoute.length;
        }
    }
    return tleter;
}

// function retrive(arr) {
//     var htmlCont = ``;
//     for(var i=0;i<arr.length;i++){
//         htmlCont += `
//         <tr>
//             <th scope="row">${i+1}</th>
//             <td>${arr[i].point()}</td>
//             <td>${arr[i].time} s</td>
//             <td>${arr[i].qouteCounter()}</td>
//             <td>${arr[i].qoute.length}</td>
//             <td>${arr[i].author}</td>
//         </tr>`
//     }
//     tbody.innerHTML = htmlCont;
// }

function retriveLast(arr){
    lastindex=arr.length-1;
    var htmlCont=`
    <tr>
        <th scope="row">${lastindex+1}</th>
        <td>${arr[lastindex].point()}</td>
        <td>${arr[lastindex].time} s</td>
        <td>${arr[lastindex].qouteCounter()}</td>
        <td>${arr[lastindex].qoute.length}</td>
        <td>${arr[lastindex].author}</td>
    </tr>`;
    tbody.innerHTML+=htmlCont;
}

function dispalyEndResult(){
    var htmlCont2 = `
        <tr>
            <th scope="row">$</th>
            <td>${resultObj.totalPoint}</td>
            <td>${totalqouteCounter(arrobj)}</td>
            <td>${totalLeterCounter(arrobj)}</td>
            <td>${totalTime(arrobj)} s</td>
        </tr>`
    tbody2.innerHTML = htmlCont2;
}


function clearInput(){
    document.getElementById("message-text").value='';
}

















// var a=prompt('TYPE zain');
// let b="zain";
// while(true){
//     if(b!==a){
//         alert("eror");
//         a = prompt('TYPE zain');
//     }
//     else{
//         break;
//     }
// }

// document.getElementById('h2').innerText=`correct answer (${a})`;
// alert('done');