
# Medidor de consumo energético

Con este proyecto se puede monitorear el consumo energético de una casa de manera remota gracias a la utilizacion de un microcontrolador ESP32 y los respectivos sensores de corriente y tensión para realizar las mediciones. Dichas mediciones seran visualizadas atraves de una [AppWeb](https://powermeteresp32.web.app/) almacenada en firebase, al igual que la base de datos de la misma.


## Tabla de contenidos:
- [Microcontrolador](#microcontrolador)
- [AppWeb-Firebase](#appweb-firebase)
- [Documentacion](#documentacion)
- [Autores](#autores)
### Materiales
- Microcontrolador: NodEMCU ESP-32S
- Sensor de corriente: SCT-013
- Sensor de tensión: ZMPT101B

## Microcontrolador
En la carpeta [Powermeter](https://github.com/NeriGariboglio/Powermeter.V2/tree/main/Powermeter) encontraremos el proyecto de Platformio destinado a nuestro microcontrolador. Al abrir dicho proyecto con la extension de Platformio en VSCode se instalaran las librerias necesarias para el funcionamiento del proyecto.
- ### Conexion a internet
    Se realiza la conexion a internet mediante la libreria Wifimanager que coloca el ESP en modo AccesPoint y genera un portal cautivo al que ingresamos y colocamos los datos de nuestra red (SSID y Password) 
- ### Conexión con Firebase
    Para conectarnos con Firebase se utilizo la libreria [FirebaseClient](https://github.com/mobizt/Firebase-ESP-Client?utm_source=platformio&utm_medium=piohome) donde se debe instanciar un objeto y definir la ruta de la base de datos a la que queremos apuntar.
- ### Lectura de Sensores
    Para la lectura de sensores se creo una clase llamada Powermeter, se debe instanciar un objeto con dicho nombre pasando como parametros el pin al que esta conectado el sensor de corriente, su calibración, pin de sensor de tensión y su respectiva calibración.
    La lectura se realiza cada un segundo, modificando los valores de corriente, tension y potencia eficaz, los mismos se envian a la base de datos cada un minuto.

- ### Consumo por Hora-Día-Mes
    Se utilizo la libreria [time](https://www.arduinolibraries.info/libraries/esp32-time) que hace uso del RTC interno de nuestro ESP y nos brinda metodos para determinar los datos de fecha como hora, dia y mes. Dicho valor se sincroniza con un servidor ntp al momento de encender nuestro ESP.
## AppWeb-Firebase 

## Documentacion

- [SCT-013](https://bc-robotics.com/datasheets/yhdc.pdf)

- [ZMPT101B](https://5nrorwxhmqqijik.leadongcdn.com/ZMPT101B+specification-aidijBqoKomRilSqqokpjkp.pdf)

- [emonlib](https://github.com/openenergymonitor/EmonLib)

- [Firebase](https://firebase.google.com/docs/cli?hl=es#sign-in-test-cli)
## Autores

- [Neri Gariboglio](https://github.com/NeriGariboglio)

- [Leonardo Galarza](https://github.com/LeonardoGalarza)