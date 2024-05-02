#include <Arduino.h>
#include "powermeter.h"

Powermeter fase(A6,7.50,A7,180);
float current,voltage,power,powerFactor;

void setup(){  
  Serial.begin(9600);
}

void loop(){
  fase.getMeter();
  current = fase.getCurrent();
  voltage = fase.getVoltage();
  power = fase.getPower();
  powerFactor = fase.getPowerFactor();
}
