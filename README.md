# Scientific Calculator
## Overview
This project is a JavaScript-based scientific calculator that handles:
- Basic arithmetic operations: +, -, *, /, %
- Parentheses and operator precedence
- Unary operators (+, -)
- Scientific functions: sin, cos, tan, log, ln, etc.
- Constants: π and e
- Factorials and power operations
## Features
### Basic Operations
- Addition, subtraction, multiplication, division
- Handles parentheses for proper precedence
- Supports unary positive and negative numbers
```javascript
-5 + (3*2) → 1
```
### Scientific Functions
- sin(x), cos(x), tan(x)
- Logarithms: log(x) (base 10), ln(x) (natural log)
- Factorials: 5! → 120
- Powers: 2^3 → 8
```javascript
cos(0) + 1 → 2
sin(π/2)(2+3) → 5
```
### Implicit Multiplication
The calculator supports expressions like:
```javascript
(2+3)4 → 20
2π → 6.283...
```
### History
- Every calculation is stored in the browser's localStorage
- Users can view past calculations even after page reload
- History is updated dynamically as calculations are performed
## How It Works
### 1. Parsing:
- Input string is converted to an array of tokens
- Unary operators, numbers, scientific functions, constants, and parentheses are identified
- Implicit multiplication is detected automatically
### 2. Evaluation:
- The token array is converted into postfix notation
- Postfix expression is evaluated to compute the result
- Supports standard operator precedence
### 3. History:
- Result and expression are stored in localStorage
- Past calculations are displayed in a history panel
## Folder Structure
```
calculator/
│
├─ index.html       
├─ style.css        
├─ script.js        
├─ stack.js
├─ history.js                
└─ README.md        
```