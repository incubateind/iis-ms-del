
#include <Wire.h>

#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);
int X;
int Y;
float TIME = 0.0 ;
float FREQUENCY = 0.0;
float WATER = 0.0;
float TOTAL = 0.0;
float LS = 0.0;
const int input = A0;
void setup()
{
  pinMode(13,OUTPUT);
  lcd.init();
  lcd.backlight();
  lcd.begin(16, 2);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("  Smart Shower");
  lcd.setCursor(0, 1);
  lcd.print("  Team CRONOZ");
  delay(2000);
  pinMode(input, INPUT);
}
void loop()
{
  digitalWrite(13, HIGH);   //Solonoid Valve
  delay(1000);                       
  digitalWrite(13, LOW);    
  delay(1000);
  
  X = pulseIn(input, HIGH);  //Water Flow Sensor
  Y = pulseIn(input, LOW);
  TIME = X + Y;
  FREQUENCY = 1000000 / TIME;
  WATER = FREQUENCY / 7.5;
  LS = WATER / 60;
  if (FREQUENCY >= 0)
  {
    if (isinf(FREQUENCY))
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("VOL. :0.00");
      lcd.setCursor(0, 1);
      lcd.print("TOTAL:");
      lcd.print( TOTAL);
      lcd.print(" L");
    }
    else
    {
      TOTAL = TOTAL + LS;
      Serial.println(FREQUENCY);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("VOL.: ");
      lcd.print(WATER);
      lcd.print(" L/M");
      lcd.setCursor(0, 1);
      lcd.print("TOTAL:");
      lcd.print( TOTAL);
      lcd.print(" L");
    }
  }
  delay(1000);
}
