/*
  1) Input Pullup Serial
     https://www.arduino.cc/en/Tutorial/InputPullupSerial
  2) ELEGOO Super Starter Kit Tutorials: Lesson 4 RGB LED
  3) Arduino Reference: Functions
     https://www.arduino.cc/en/Reference/FunctionDeclaration

*/

#define ledPinR 11
#define ledPinG 10
#define ledPinB 9
#define colorButtonPin 3
#define lumButtonPin 2

#define lumOff 0
#define lumLow 1
#define lumHigh 2

#define white 0
#define red 1
#define yellow 2
#define green 3
#define cyan 4
#define blue 5
#define magenta 6

int colorButtonState = HIGH;
int lumButtonState = HIGH;

int colorState;
int lumState;

int lowVal = 50;
int highVal = 255;
int lumVal = lowVal;
int lumDif = highVal - lowVal;

int fadeTime = 500;
int lumRate = fadeTime / lumDif;
int colorRate = fadeTime / lumVal;

int r = lumVal;
int g = lumVal;
int b = lumVal;

int i = 0;

void ledColor(int r, int g, int b) {
  analogWrite(ledPinR, r);
  analogWrite(ledPinG, g);
  analogWrite(ledPinB, b);
}

void setup() {
  pinMode(ledPinR, OUTPUT);
  pinMode(ledPinG, OUTPUT);
  pinMode(ledPinB, OUTPUT);
  pinMode(colorButtonPin, INPUT_PULLUP);
  pinMode(lumButtonPin, INPUT_PULLUP);
  ledColor(r, g, b);
  colorState = white;
  lumState = lumLow;
}

void loop() {

  colorButtonState = digitalRead(colorButtonPin);
  lumButtonState = digitalRead(lumButtonPin);

  // LUMINOSITY LOW TO HIGH
  if (lumState == lumLow && lumButtonState == LOW) {

    if (colorState == white && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r += 1;
        g += 1;
        b += 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == red && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r += 1;
        g = 0;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == yellow && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r += 1;
        g += 1;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == green && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g += 1;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == cyan && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g += 1;
        b += 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == blue && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g = 0;
        b += 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == magenta && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r += 1;
        g = 0;
        b += 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }
    lumState = lumHigh;
    lumButtonState = HIGH;
    lumVal = highVal;
    colorRate = fadeTime / lumVal;
  }

  // LUMINOSITY HIGH TO LOW
  if (lumState == lumHigh && lumButtonState == LOW) {

    if (colorState == white && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r -= 1;
        g -= 1;
        b -= 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == red && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r -= 1;
        g = 0;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == yellow && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r -= 1;
        g -= 1;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == green && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g -= 1;
        b = 0;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == cyan && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g -= 1;
        b -= 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == blue && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r = 0;
        g = 0;
        b -= 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }

    if (colorState == magenta && lumButtonState == LOW) {
      for (i = 0; i < lumDif; i++) {
        r -= 1;
        g = 0;
        b -= 1;
        ledColor(r, g, b);
        delay(lumRate);
      }
    }
      lumState = lumLow;
      lumButtonState = HIGH;
      lumVal = lowVal;
      colorRate = fadeTime / lumVal;
  }


  // THE COLORS!

  if (colorState == white && colorButtonState == LOW ) {
    for (i = 0; i < lumVal; i++) {
      r = lumVal;
      g -= 1;
      b -= 1;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = red;
    colorButtonState = HIGH;
  }
  if (colorState == red && colorButtonState == LOW ) {
    for (i = 0; i < lumVal; i++) {
      r = lumVal;
      g += 1;
      b = 0;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = yellow;
    colorButtonState = HIGH;
  }
  if (colorState == yellow && colorButtonState == LOW ) {
    for (i = 0; i < lumVal; i++) {
      r -= 1;
      g = lumVal;
      b = 0;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = green;
    colorButtonState = HIGH;
  }
  if (colorState == green && colorButtonState == LOW ) {
    for (i = 0; i < lumVal; i++) {
      r = 0;
      g = lumVal;
      b += 1;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = cyan;
    colorButtonState = HIGH;
  }
  if (colorState == cyan && colorButtonState == LOW ) {
    for (i = 0; i < lumVal; i++) {
      r = 0;
      g -= 1;
      b = lumVal;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = blue;
    colorButtonState = HIGH;
  }
  if (colorState == blue && colorButtonState == LOW) {
    for (i = 0; i < lumVal; i++) {
      r += 1;
      g = 0;
      b = lumVal;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = magenta;
    colorButtonState = HIGH;
  }
  if (colorState == magenta && colorButtonState == LOW) {
    for (i = 0; i < lumVal; i++) {
      r = lumVal;
      g += 1;
      b = lumVal;
      ledColor(r, g, b);
      delay(colorRate);
    }
    colorState = white;
    colorButtonState = HIGH;
  }
}
