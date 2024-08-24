// translator.js
import { customToJSMapping } from './customMapping.js';

export function translateCustomToJS(customCode) {
    let jsCode = customCode;

    for (const [customKeyword, jsKeyword] of Object.entries(customToJSMapping)) {
        const regex = new RegExp(`\\b${customKeyword}\\b`, 'g');
        jsCode = jsCode.replace(regex, jsKeyword);
    }

    return jsCode;
}
