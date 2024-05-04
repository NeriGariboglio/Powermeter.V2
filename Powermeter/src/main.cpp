#include <Arduino.h>
#include <WiFiManager.h>
#include <Firebase_ESP_Client.h>
#include <ESP32Time.h>
#include "powermeter.h"
#include "time.h"
#include "getRTC.hpp"
#include "initWiFi.hpp"
#include "firebaseP.h"

Powermeter fase(A6,7.50,A7,180);
const char* ntpServer = "pool.ntp.org";
float current,voltage,power,powerFactor;
int timestamp;

void setup(){  
  Serial.begin(9600);
  initWiFi();
  configTime(0, 0, ntpServer);
}

void loop(){
  fase.getMeter();
  current = fase.getCurrent();
  voltage = fase.getVoltage();
  power = fase.getPower();
  powerFactor = fase.getPowerFactor();
  timestamp = getTime();// Obtener la hora actual
}
