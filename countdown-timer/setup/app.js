const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const giveaway=document.querySelector('.giveaway');
const deadline=document.querySelector('.deadline');
const items=document.querySelectorAll('.deadline-format h4');

let tempDate=new Date();
let tempYear=tempDate.getFullYear();
let tempMonth=tempDate.getMonth();
let tempDay=tempDate.getDay();

//let futureDate=new Date(2022,2,1,12,0,0);

const futureDate=new Date(tempYear,tempMonth+1,tempDay,12,00,00);

const year=futureDate.getFullYear();
const hours =futureDate.getHours();
const minutes=futureDate.getMinutes();
let month = months[futureDate.getMonth()];
const date= futureDate.getDate();
const weekday=weekdays[futureDate.getDay()-1];

giveaway.textContent=`giveaway ends on ${weekday} ${date}. ${month} ${year}, ${hours}:${minutes}0am`;

// future time in ms
const futureTime=futureDate.getTime();

function getRemainingTime(){
  const today=new Date().getTime();
  const t=futureTime-today;
  // 1s=1000ms 
  // 1m=60s=60000ms
  // 1hr=60ms=3600000ms
  // 1d=24hr=86400000ms
  const oneDay=24*60*60*1000;
  const oneHour=60*60*1000;
  const oneMinute=60*1000;
  // calc
  let days=t/oneDay;
  days=Math.floor(days);
  let hours=Math.floor((t%oneDay)/oneHour);
  let minutes=Math.floor((t%oneHour)/oneMinute);
  let seconds=Math.floor((t%oneMinute)/1000);

  // 
  const values=[days,hours,minutes,seconds];

  items.forEach(function(item,index){
    item.innerHTML=format(values[index]);
  })




  function format(item){
    if(item<10){
      return item=`0${item}`;
    }
    return item;
  }

  if(t<0){
    clearInterval(countdown);
    deadline.innerHTML=`<h4 class='expired'>proso brzi voz</h4>`;
  }
}

// countdown
let countdown=setInterval(getRemainingTime,1000);

getRemainingTime();