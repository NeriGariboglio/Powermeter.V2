// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartC = createCurrentChart();
  chartV = createVoltageChart();
  chartP = createPowerChart();
}

// Create Current Chart
function createCurrentChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-current',
      type: 'spline' 
    },
    series: [
      {
        name: 'Corriente'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M' }
    },
    yAxis: {
      title: { 
        text: 'Corriente en Amper' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Voltage Chart
function createVoltageChart(){
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-voltage',
      type: 'spline'  
    },
    series: [{
      name: 'Voltage'
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#50b8b4' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M' }
    },
    yAxis: {
      title: { 
        text: 'Voltage en Volt' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Power Chart
function createPowerChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-power',
      type: 'spline'  
    },
    series: [{
      name: 'Potencia'
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#A62639' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M' }
    },
    yAxis: {
      title: { 
        text: 'Potencia en  W' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}