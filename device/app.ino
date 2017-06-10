/*
MarvinLaptop

Basic controls of IoT Academy Marvin LoRa Development board through your Laptop

This version supports:
  - Sending LoRa uplink messages using ABP that are given as input from the serial port on your laptop
  - Blink three times when sending data
  - Power control to RN2483 module

Instructions:
  - Get the latest version of the Arduino software
  - In Arduino IDE select Arduino Leonardo and com port of your device
  - Please adjust ABP adresses and key below to match yours
*/

#include <time.h>
#include <stdlib.h>

// Port to assign the type of lora data (any port can be used between 1 and 223)
int     set_port  = 1;

// Some standard ports that depend on the layout of the Marvin
long    defaultBaudRate = 57600;
int     reset_port = 5;
int     RN2483_power_port = 6;
int     led_port = 13;
const int ledPin=13;

//*** Set parameters here BEGIN ---->
String  set_nwkskey = "b6b4d924f4dea0ce0320ebf401c16644"; // Put your 32 hex char here
String  set_appskey = "591f7e1a9173e344ea7a2973f652ff8b"; // Put your 32 hex char here
String  set_devaddr = "04001E78"; // Put your 8 hex char here
//*** <---- END Set parameters 

// Some global items
String reader = "";

/*
 * Setup() function is called when board is started. Marvin uses a serial connection to talk to your pc and a serial
 * connection to talk to the RN2483, these are both initialized in seperate functions. Also some Arduino port are 
 * initialized and a LED is called to blink when everything is done. 
 */
void setup() {
  InitializeSerials(defaultBaudRate);
  initializeRN2483(RN2483_power_port, reset_port);
  pinMode(led_port, OUTPUT); // Initialize LED port  
  blinky();
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT);
  srand(time(NULL));
  
}

void loop() {
    int r = rand();
    Serial.println((float)r*0.00001);  
    int sensorValue = analogRead(A3);
    Serial.println(sensorValue);
    delay(1000);
    if(sensorValue==1023)
    {
        digitalWrite(ledPin,HIGH);
        send_LoRa_data(set_port, (String)r);
        blinky();
        read_data_from_LoRa_Mod();
        delay(1000);
    }
    else
    {
        digitalWrite(ledPin,LOW);
    }

    
}

void InitializeSerials(long baudrate)
{
  Serial.begin(baudrate);
  Serial1.begin(baudrate);
  delay(1000);
  print_to_console("Serial ports initialised");
}

void initializeRN2483(int pwr_port, int rst_port)
{
  //Enable power to the RN2483
  pinMode(pwr_port, OUTPUT);
  digitalWrite(pwr_port, HIGH);
  print_to_console("RN2483 Powered up");
  delay(1000);
  
  //Disable reset pin
  pinMode(rst_port, OUTPUT);
  digitalWrite(rst_port, HIGH);

  //Configure LoRa module
  send_LoRa_Command("sys reset");
  read_data_from_LoRa_Mod();

  send_LoRa_Command("mac set nwkskey " + set_nwkskey);
  read_data_from_LoRa_Mod();

  send_LoRa_Command("mac set appskey " + set_appskey);
  read_data_from_LoRa_Mod();

  send_LoRa_Command("mac set devaddr " + set_devaddr);
  read_data_from_LoRa_Mod();

  //For this commands some extra delay is needed.
  send_LoRa_Command("mac set adr on");
  //send_LoRa_Command("mac set dr 0"); //uncomment this line to fix the RN2483 on SF12 (dr=DataRate)
  delay(1000);
  read_data_from_LoRa_Mod();

  send_LoRa_Command("mac save");
  delay(1000);
  read_data_from_LoRa_Mod();

  send_LoRa_Command("mac join abp");
  delay(1000);
  read_data_from_LoRa_Mod();

  send_LoRa_Command("radio set crc off");
  delay(1000);
  read_data_from_LoRa_Mod();

}

void print_to_console(String message)
{
  Serial.println(message);
}

void read_data_from_LoRa_Mod()
{
  if (Serial1.available()) {
    String inByte = Serial1.readString();
    Serial.println(inByte);
  }

}

void send_LoRa_Command(String cmd)
{
  print_to_console("Now sending: " + cmd);
  Serial1.println(cmd);
  delay(500);
}

void send_LoRa_data(int tx_port, String rawdata)
{
  send_LoRa_Command("mac tx uncnf " + String(tx_port) + String(" ") + rawdata);
}


void blinky()
{
  digitalWrite(led_port, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);              // wait for a second
  digitalWrite(led_port, LOW);    // turn the LED off by making the voltage LOW
  delay(500);              // wait for a second
  digitalWrite(led_port, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);              // wait for a second
  digitalWrite(led_port, LOW);    // turn the LED off by making the voltage LOW
  delay(500);              // wait for a second
}

int randomNum(){
  srand(time(NULL));
  int r = rand();

   return r;
}

