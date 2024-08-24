// main.js
import { translateCustomToJS } from './translator.js';

// Your custom language code
const customCode = `
call greet(meet) {
    output("Hi, " + meet + "!");
}

let digit = 10;
when (digit higher 5) {
    greet("John");
} or_else {
    output("Digit is too small.");
}
`;

// Translate the custom code to JavaScript
const jsCode = translateCustomToJS(customCode);

// Log the translated JavaScript code (optional)
console.log("Translated JavaScript Code:");
console.log(jsCode);

// Execute the translated JavaScript code
eval(jsCode);
