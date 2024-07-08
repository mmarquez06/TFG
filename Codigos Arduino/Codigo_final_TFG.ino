#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <TinyGPSPlus.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <UrlEncode.h>

String phoneNumber = "+34618476850";
String apiKey = "3575373";


const char *gpsStream =
  "$GPRMC,045103.000,A,3014.1984,N,09749.2872,W,0.67,161.46,030913,,,A*7C\r\n"
  "$GPGGA,045104.000,3014.1985,N,09749.2873,W,1,09,1.2,211.6,M,-22.5,M,,0000*62\r\n"
  "$GPRMC,045200.000,A,3014.3820,N,09748.9514,W,36.88,65.02,030913,,,A*77\r\n"
  "$GPGGA,045201.000,3014.3864,N,09748.9411,W,1,10,1.2,200.8,M,-22.5,M,,0000*6C\r\n"
  "$GPRMC,045251.000,A,3014.4275,N,09749.0626,W,0.51,217.94,030913,,,A*7D\r\n"
  "$GPGGA,045252.000,3014.4273,N,09749.0628,W,1,09,1.3,206.9,M,-22.5,M,,0000*6F\r\n";

TinyGPSPlus gps;

Adafruit_MPU6050 mpu;

String gradosData ="";
String gpsData = "";
String datatime ="";

double counter;

double media_acc_x;
double media_acc_y;
double media_acc_z;

double acc_x;
double acc_y;
double acc_z;

double cal_x = 0;
double cal_y = 0;
double cal_z = 0;

double gradosejex;
double gradosejey;
double gradosejez;

int umbral = 45;


// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "iPhone Maria"
#define WIFI_PASSWORD "athitos123"

// Insert Firebase project API Key
#define API_KEY "AIzaSyBUEaNOWqpIKrxXTwCpAbYuJ2rvgsJvbcA"

// Insert Authorized Email and Corresponding Password
#define USER_EMAIL "mmarquez2762@gmail.com"
#define USER_PASSWORD "Maria2762"

// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL "https://prueba-5eb0b-default-rtdb.firebaseio.com/"

double numero = 1.5;

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variable to save USER UID
String uid;

// Database main path (to be updated in setup with the user UID)
String databasePath;

String accpath = "/accdata";
String gpspath = "/gpsdata";
String timepath = "/timedata";


FirebaseJson json;

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
    
  }
  Serial.println(WiFi.localIP());
  Serial.println();

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  fbdo.setResponseSize(4096);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  // Update database path
  databasePath = uid;

// CONFIGURACION INICIAL MPU6050
mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  Serial.print("Accelerometer range set to: ");
  switch (mpu.getAccelerometerRange()) {
  case MPU6050_RANGE_2_G:
    Serial.println("+-2G");
    break;
  case MPU6050_RANGE_4_G:
    Serial.println("+-4G");
    break;
  case MPU6050_RANGE_8_G:
    Serial.println("+-8G");
    break;
  case MPU6050_RANGE_16_G:
    Serial.println("+-16G");
    break;
  }
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  Serial.print("Gyro range set to: ");
  switch (mpu.getGyroRange()) {
  case MPU6050_RANGE_250_DEG:
    Serial.println("+- 250 deg/s");
    break;
  case MPU6050_RANGE_500_DEG:
    Serial.println("+- 500 deg/s");
    break;
  case MPU6050_RANGE_1000_DEG:
    Serial.println("+- 1000 deg/s");
    break;
  case MPU6050_RANGE_2000_DEG:
    Serial.println("+- 2000 deg/s");
    break;
  }

  mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
  Serial.print("Filter bandwidth set to: ");
  switch (mpu.getFilterBandwidth()) {
  case MPU6050_BAND_260_HZ:
    Serial.println("260 Hz");
    break;
  case MPU6050_BAND_184_HZ:
    Serial.println("184 Hz");
    break;
  case MPU6050_BAND_94_HZ:
    Serial.println("94 Hz");
    break;
  case MPU6050_BAND_44_HZ:
    Serial.println("44 Hz");
    break;
  case MPU6050_BAND_21_HZ:
    Serial.println("21 Hz");
    break;
  case MPU6050_BAND_10_HZ:
    Serial.println("10 Hz");
    break;
  case MPU6050_BAND_5_HZ:
    Serial.println("5 Hz");
    break;
  }

}

void sendMessage(String message){

  // Data to send with HTTP POST
  String url = "http://api.callmebot.com/whatsapp.php?phone=" + phoneNumber + "&apikey=" + apiKey + "&text=" + urlEncode(message);
  WiFiClient client;    
  HTTPClient http;
  http.begin(client, url);

  // Specify content-type header
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // Send HTTP POST request
  int httpResponseCode = http.POST(url);
  if (httpResponseCode == 200){
   // Serial.print("Message sent successfully");
  }
  else{
    Serial.println("Error sending the message");
    Serial.print("HTTP response code: ");
    Serial.println(httpResponseCode);
  }

  // Free resources
  http.end();
}


String readMPU6050() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  //Las primeras 20 lecturas sirven para calibrar el sensor
 if (counter<20){
   // Calibrar el acelerometro a 1g en el eje z (ajustar el offset)
   media_acc_x = media_acc_x + a.acceleration.x;
   counter++;
  }
  else{
   cal_x = media_acc_x/20;
  }
      acc_x = a.acceleration.x ;
      acc_y = a.acceleration.y ;
      acc_z = a.acceleration.z ;

    gradosejex = atan(acc_x/sqrt((pow(2,acc_y)+(pow(2,acc_z)))))*100-cal_x;
    gradosData = String(gradosejex);

    if (gradosejex<umbral){
      Serial.print("CUIDAO SA CAIO");
      sendMessage("¡ALERTA! Consulte su app PawWheel Tracker para más información");
       Serial.print(gradosData);
       Serial.println("grados"); 
    }
    else {
      Serial.print("grados");
      Serial.println(gradosData);
    }

    return gradosData;
}

String NEO6READ() {
 Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
    gpsData = String(gps.location.lat(), 6) + "," + String(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }


return gpsData;
}


String date_timeInfo()
{
 

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

 Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());

    datatime = String(gps.time.hour()) + "," + String(gps.time.minute()) + "," + String(gps.time.second()) ;
    
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  
   return datatime;
}


void loop() {

 String accelerometerData = readMPU6050();

 //String gpsDataInfo = NEO6READ(); 
 //String timeData = date_timeInfo();

 String gpsDataInfo = "30.240455,-97.817713"; 
 String timeData = "9/3/2013 04:52:52.00";


  // Send new readings to database

  if (Firebase.ready()) {
    json.set(accpath.c_str(), String(accelerometerData));
    json.set(gpspath.c_str(), String(gpsDataInfo));
     json.set(timepath.c_str(), String(timeData));

    Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, databasePath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
  }

  delay(1000);
}
