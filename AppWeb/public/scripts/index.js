
// convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime){
  return new Date((epochTime)*1000);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime){
  var epochDate = new Date(epochToJsDate(epochTime));
  var dateTime = epochDate.getFullYear() + "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
    ("00" + epochDate.getDate()).slice(-2) + " " +
    ("00" + epochDate.getHours()).slice(-2) + ":" +
    ("00" + epochDate.getMinutes()).slice(-2) + ":" +
    ("00" + epochDate.getSeconds()).slice(-2);
  console.log(dateTime);
  return dateTime;
}

// function to plot values on charts
function plotValues(chart, timestamp, value){
  var x = epochToJsDate(timestamp-10800).getTime();
  var y = Number (value);
  if(chart.series[0].data.length > 40) {
    chart.series[0].addPoint([x, y], true, true, true);
  } else {
    chart.series[0].addPoint([x, y], true, false, true);
  }
}

// DOM elements
const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector('#authentication-bar');
const deleteButtonElement = document.getElementById('delete-button');
const deleteModalElement = document.getElementById('delete-modal');
const deleteDataFormElement = document.querySelector('#delete-data-form');
const viewDataButtonElement = document.getElementById('view-data-button');
const hideDataButtonElement = document.getElementById('hide-data-button');
const tableContainerElement = document.querySelector('#table-container');
const chartsRangeInputElement = document.getElementById('charts-range');
const loadDataButtonElement = document.getElementById('load-data');
const cardsCheckboxElement = document.querySelector('input[name=cards-checkbox]');
const gaugesCheckboxElement = document.querySelector('input[name=gauges-checkbox]');
const chartsCheckboxElement = document.querySelector('input[name=charts-checkbox]');

// DOM elements for sensor readings
const cardsReadingsElement = document.querySelector("#cards-div");
const gaugesReadingsElement = document.querySelector("#gauges-div");
const chartsDivElement = document.querySelector('#charts-div');
const currElement = document.getElementById("curr");
const voltElement = document.getElementById("volt");
const powElement = document.getElementById("pow");
const pfcElement = document.getElementById("pfc");
const pdcElement = document.getElementById("pdc");
const pmcElement = document.getElementById("pmc");
const pfElement = document.getElementById("pf");
const pdElement = document.getElementById("pd");
const pmElement = document.getElementById("pm");
const updateElement = document.getElementById("lastUpdate")

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPath = 'UsersData/' + uid.toString() + '/readings'+'/fase';
    var chartPath = 'UsersData/' + uid.toString() + '/charts/range';

    // Database references
    var dbRef = firebase.database().ref(dbPath);
    var chartRef = firebase.database().ref(chartPath);
    
    // CARDS
    // Obtenga las últimas lecturas y muéstrelas en tarjetas
    dbRef.orderByKey().limitToLast(1).on('child_added', snapshot =>{
      var jsonData = snapshot.toJSON();
      var current = jsonData.current;
      var voltage = jsonData.voltage;
      var powerFactor = jsonData.powerFactor;
      var powerHourCurrent = jsonData.powerHourCurrent;
      var powerDayCurrent = jsonData.powerDayCurrent;
      var powerMonthCurrent = jsonData.powerMonthCurrent;
      var powerHour = jsonData.powerHour;
      var powerDay = jsonData.powerDay;
      var powerMonth = jsonData.powerMonth;
      var timestamp = jsonData.timestamp;
      // Actualiza los elementos DOM
      currElement.innerHTML = current;
      voltElement.innerHTML = voltage;
      powElement.innerHTML = powerFactor;
      pfcElement.innerHTML = powerHourCurrent;
      pdcElement.innerHTML = powerDayCurrent;
      pmcElement.innerHTML = powerMonthCurrent;
      pfElement.innerHTML = powerHour;
      pdElement.innerHTML = powerDay;
      pmElement.innerHTML = powerMonth;
      updateElement.innerHTML = epochToDateTime(timestamp);
    });
  // IF USER IS LOGGED OUT
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}