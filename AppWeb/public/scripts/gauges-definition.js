// Crea el indicador PowerHs 
function createPowerHsGauge(){
    var gauge = new RadialGauge({
        renderTo: 'gauge-powerhs',
        width: 300,
        height: 300,
        units: "Consumo W",
        minValue: 0,
        maxValue: 7000,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueInt: 2,
        majorTicks: [
            "0",
            "1000",
            "2000",
            "3000",
            "4000",
            "5000",
            "6000",
            "7000"
    
        ],
        minorTicks: 1,
        strokeTicks: true,
        highlights: [
            {
                "from": 6000,
                "to": 7000,
                "color": "#e2360f"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "line",
        colorNeedle: "#007F80",
        colorNeedleEnd: "#007F80",
        needleWidth: 2,
        needleCircleSize: 3,
        colorNeedleCircleOuter: "#007F80",
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
    });
    return gauge;
}