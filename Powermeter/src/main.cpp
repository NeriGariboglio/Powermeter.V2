#include <Arduino.h>
#include <WiFiManager.h>
#include "powermeter.h"
#include "initWiFi.hpp"

Powermeter fase(A6,7.50,A7,180);
float current,voltage,power,powerFactor;

void setup(){  
  Serial.begin(9600);
  initWiFi();
}

void loop(){
  fase.getMeter();
  current = fase.getCurrent();
  voltage = fase.getVoltage();
  power = fase.getPower();
  powerFactor = fase.getPowerFactor();
}
