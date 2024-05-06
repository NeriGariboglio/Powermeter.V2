
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
    
    // CHARTS
    // Number of readings to plot on charts
    var chartRange = 0;
    // Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
    chartRef.on('value', snapshot =>{
      chartRange = Number(snapshot.val());
      console.log(chartRange);
      // Delete all data from charts to update with new values when a new range is selected
      chartC.destroy();
      chartV.destroy();
      chartP.destroy();
      // Render new charts to display new range of data
      chartC = createCurrentChart();
      chartV = createVoltageChart();
      chartP = createPowerChart();
      // Update the charts with the new range
      // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
      dbRef.orderByKey().limitToLast(chartRange).on('child_added', snapshot =>{
        var jsonData = snapshot.toJSON();
        // Save values on variables
        // Llamar a las funciones plotValues para los tres gráficos
        var current = jsonData.current;
        var voltage = jsonData.voltage;
        var power = jsonData.power;
        var timestamp = jsonData.timestamp;
        // Plot the values on the charts
        plotValues(chartC, timestamp, current);
        plotValues(chartV, timestamp, voltage);
        plotValues(chartP, timestamp, power);
      });
    });

    // Update database with new range (input field)
    chartsRangeInputElement.onchange = () =>{
      chartRef.set(chartsRangeInputElement.value);
    };

    //CHECKBOXES
    // Checbox (cards for sensor readings)
    cardsCheckboxElement.addEventListener('change', (e) =>{
      if (cardsCheckboxElement.checked) {
        cardsReadingsElement.style.display = 'block';
      }
      else{
        cardsReadingsElement.style.display = 'none';
      }
    });
    // Checbox (gauges for sensor readings)
    gaugesCheckboxElement.addEventListener('change', (e) =>{
      if (gaugesCheckboxElement.checked) {
        gaugesReadingsElement.style.display = 'block';
      }
      else{
        gaugesReadingsElement.style.display = 'none';
      }
    });
    // Checbox (charta for sensor readings)
    chartsCheckboxElement.addEventListener('change', (e) =>{
      if (chartsCheckboxElement.checked) {
        chartsDivElement.style.display = 'block';
      }
      else{
        chartsDivElement.style.display = 'none';
      }
    });

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

    // GAUGUE
    // Get the latest readings and display on gauges
    dbRef.orderByKey().limitToLast(1).on('child_added', snapshot =>{
      var jsonData = snapshot.toJSON();
      var power = jsonData.power;
      var timestamp = jsonData.timestamp;
      // Update DOM elements
      var gaugeP= createPowerHsGauge();
      gaugeP.draw();
      gaugeP.value = power;
      updateElement.innerHTML = epochToDateTime(timestamp);
    });

    // DELETE DATA
    // Add event listener to open modal when click on "Delete Data" button
    deleteButtonElement.addEventListener('click', e =>{
      console.log("Remove data");
      e.preventDefault;
      deleteModalElement.style.display="block";
    });

    // Add event listener when delete form is submited
    deleteDataFormElement.addEventListener('submit', (e) => {
      // delete data (readings)
      dbRef.remove();
    });

    // TABLE
    var lastReadingTimestamp; //guarda la última marca de tiempo mostrada en la tabla
    // Función que crea la tabla con las primeras 100 lecturas
    function createTable(){
      // agregar todos los datos a la tabla
      var firstRun = true;
      dbRef.orderByKey().limitToLast(100).on('child_added', function(snapshot) {
        if (snapshot.exists()) {
          var jsonData = snapshot.toJSON();
          console.log(jsonData);
          var current = jsonData.current;
          var voltage = jsonData.voltage;
          var power = jsonData.power;
          var timestamp = jsonData.timestamp;
          var content = '';
          content += '<tr>';
          content += '<td>' + epochToDateTime(timestamp) + '</td>';
          content += '<td>' + current + '</td>';
          content += '<td>' + voltage + '</td>';
          content += '<td>' + power + '</td>';
          content += '</tr>';
          $('#tbody').prepend(content);
          // Guardar lastReadingTimestamp --> corresponde a la primera marca de tiempo en los datos de la instantánea devuelta
          if (firstRun){
            lastReadingTimestamp = timestamp;
            firstRun=false;
            console.log(lastReadingTimestamp);
          }
        }
      });
    };

    // agregar lecturas a la tabla (después de presionar el botón Más resultados...)
    function appendToTable(){
      var dataList = []; // guarda la lista de lecturas devueltas por la instantánea (más antigua-->más nueva)
      var reversedList = []; // Igual que el anterior, pero invertido (más nuevo--> más antiguo)
      console.log("APEND");
      dbRef.orderByKey().limitToLast(100).endAt(lastReadingTimestamp).once('value', function(snapshot) {
        // convertir la instantánea a JSON
        if (snapshot.exists()) {
          snapshot.forEach(element => {
            var jsonData = element.toJSON();
            dataList.push(jsonData); // crear una lista con todos los datos
          });
          lastReadingTimestamp = dataList[0].timestamp; //la marca de tiempo más antigua corresponde a la primera en la lista (más antigua -> más nueva)
          reversedList = dataList.reverse(); // invertir el orden de la lista (datos más recientes --> datos más antiguos)

          var firstTime = true;
          // recorrer todos los elementos de la lista y agregarlos a la tabla (los elementos más nuevos primero)
          reversedList.forEach(element =>{
            if (firstTime){ // ignorar la primera lectura (ya está en la mesa de la consulta anterior)
              firstTime = false;
            }
            else{
              var current = element.current;
              var voltage = element.voltage;
              var power = element.power;
              var timestamp = element.timestamp;
              var content = '';
              content += '<tr>';
              content += '<td>' + epochToDateTime(timestamp) + '</td>';
              content += '<td>' + current + '</td>';
              content += '<td>' + voltage + '</td>';
              content += '<td>' + power + '</td>';
              content += '</tr>';
              $('#tbody').append(content);
            }
          });
        }
      });
    }

    viewDataButtonElement.addEventListener('click', (e) =>{
      // Toggle DOM elements
      tableContainerElement.style.display = 'block';
      viewDataButtonElement.style.display ='none';
      hideDataButtonElement.style.display ='inline-block';
      loadDataButtonElement.style.display = 'inline-block'
      createTable();
    });

    loadDataButtonElement.addEventListener('click', (e) => {
      appendToTable();
    });

    hideDataButtonElement.addEventListener('click', (e) => {
      tableContainerElement.style.display = 'none';
      viewDataButtonElement.style.display = 'inline-block';
      hideDataButtonElement.style.display = 'none';
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