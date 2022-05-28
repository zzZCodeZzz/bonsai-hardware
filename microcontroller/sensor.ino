#include "ESP8266WiFi.h" // Enables the ESP8266 to connect to the local network (via WiFi)
#include "ArduinoJson.h"
#include "NTPClient.h"
#include "WiFiUdp.h"
#include "EspMQTTClient.h"

#define SensorPin A0 
#define PumpPin D0
/*
 * Timestamp
************************************************/
// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

// Variable to save current epoch time
unsigned long epochTime; 

// Function that gets current epoch time
unsigned long getTime() {
  timeClient.update();
  unsigned long now = timeClient.getEpochTime();
  return now;
}
/*
 * MQTT
************************************************/
const char* clientId = "zitronen-melisse";
const char* soilMoistureTopic = "/soil-moisture";
const char* pumpTopic = "/pump/zitronen-melisse";

EspMQTTClient mqttClient(
  "WLAN-5UXMHE",
  "1704662607658029",
  "192.168.2.108",
  clientId
);

// called from mqttClient when connected
void onConnectionEstablished() {
  Serial.println("connection established");
  mqttClient.subscribe(pumpTopic, [] (const String &payload)  {
    handlePumpMessage(payload);
  });
}

void publishSoilMoisture(const char* message) {
  if (!mqttClient.publish(soilMoistureTopic, message)) {
    Serial.println("Failed to send");
  }
}
/*
 * Pump
************************************************/
void initializePump() {
  pinMode(PumpPin, OUTPUT);
}

void pump(int seconds) {
  digitalWrite(PumpPin, HIGH);
  delay(seconds * 1000);
  digitalWrite(PumpPin, LOW);
}

void handlePumpMessage(String payload) {
  // Deserialize Json
    StaticJsonDocument<192> doc;
    DeserializationError error = deserializeJson(doc, payload);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
    }
    String pumpMode = doc["data"]["mode"];
    int pumpSeconds = doc["data"]["seconds"];
    
    if(pumpMode == "start") {
      pump(pumpSeconds);
    }  
}

/*
 * Soil Moisture Sensor
************************************************/
void readSensorAndPublish() {
  // Get analog soil moisture readout
  float analogReadValue = analogRead(SensorPin);

  // Create Json
  StaticJsonDocument<JSON_OBJECT_SIZE(3)> json;
  json["sensorId"] = clientId;
  json["analogReadValue"] = analogReadValue;
  json["timestamp"] = epochTime;
  String jsonMessage = "";
  serializeJson(json, jsonMessage);

  // Publish
  publishSoilMoisture(jsonMessage.c_str());
}

/*
 * Lifecycle
************************************************/
void setup() {
  Serial.begin(115200);
  timeClient.begin();
  Serial.println("connecting");
  initializePump();
}

void loop() {
  mqttClient.loop();
  
  // Get timestamp
  epochTime = getTime();
 
  if(mqttClient.isConnected()) {
    readSensorAndPublish();
  } else {
    Serial.print(".");
  }
  delay(1000);
}
