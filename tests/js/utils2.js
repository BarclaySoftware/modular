const UtilityLibrary = {
    getCurrentTime: function () {
        const now = new Date();
        return now.toLocaleTimeString();
    },

    getCurrentDate: function () {
        const now = new Date();
        return now.toLocaleDateString();
    },

    getUserLanguage: function () {
        return navigator.language || navigator.userLanguage;
    },

    // getUserLocation

    getUserIP: function (callback) {
        const pc = new (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/g;

        let ipAddress = null;

        pc.createDataChannel('');
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .catch(err => console.error("Error creating offer: ", err));

        pc.onicecandidate = function(event) {
            if (event.candidate && event.candidate.candidate) {
                const ip = event.candidate.candidate.match(ipRegex);
                if (ip) {
                    ipAddress = ip[0];
                    pc.close();
                    if (callback) {
                        callback(ipAddress);
                    }
                }
            }
        };

        setTimeout(() => {
            if (!ipAddress && callback) {
                callback(null);
            }
        }, 1000);

        return ipAddress;
    },

    getUserBrowser: function () {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";

        if (userAgent.indexOf("Firefox") > -1) {
            browser = "Mozilla Firefox";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            browser = "Samsung Internet";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browser = "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            browser = "Microsoft Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            browser = "Microsoft Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browser = "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            browser = "Apple Safari";
        }

        return browser;
    },

    getUserOS: function () {
        const platform = navigator.platform;
        let os = "Unknown";

        if (platform.indexOf("Win") > -1) {
            os = "Windows";
        } else if (platform.indexOf("Mac") > -1) {
            os = "MacOS";
        } else if (platform.indexOf("Linux") > -1) {
            os = "Linux";
        } else if (platform.indexOf("Android") > -1) {
            os = "Android";
        } else if (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1) {
            os = "iOS";
        }

        return os;
    },

    isMobileDevice: function () {
        return /Mobi|Android/i.test(navigator.userAgent);
    },

    getScreenResolution: function () {
        return `${window.screen.width} x ${window.screen.height}`;
    },

    getRandomNumber: function (min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') {
            console.error("getRandomNumber: Both 'min' and 'max' parameters must be numbers.");
            return;
        }

        if (min > max) {
            console.error("getRandomNumber: The 'min' parameter must be less than or equal to the 'max' parameter.");
            return;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // unitConvert

    getUserTimezoneOffset: function () {
        const offset = new Date().getTimezoneOffset();
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        return (offset < 0 ? "+" : "-") + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    },

    hexToRgb: function (hex) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            console.error("hexToRgb: Invalid HEX color format.");
            return;
        }

        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(char => char + char).join('');
        }

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    },

    hexToRgba: function (hex, alpha = 1.0) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            console.error("hexToRgba: Invalid HEX color format.");
            return;
        }

        if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
            console.error("hexToRgba: Alpha must be a number between 0 and 1.");
            return;
        }

        const rgb = this.hexToRgb(hex).replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        return rgb;
    },

    hexToHsl: function (hex) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            console.error("hexToHsl: Invalid HEX color format.");
            return;
        }

        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(char => char + char).join('');
        }

        const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    },

    // file to base64

    printMe: function (text) {
        if (typeof text !== 'string' || text < 0) {
            console.error("printMe: This function requireds text.");
            return;
        }

        return text;
    },

    // calculator

    getRandCard: function () {
        // program to shuffle the deck of cards

        // declare card elements
        const suits = ["Spades", "Diamonds", "Club", "Heart"];
        const values = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        ];

        // empty array to contain cards
        let deck = [];

        // create a deck of cards
        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { Value: values[x], Suit: suits[i] };
                deck.push(card);
            }
        }

        // shuffle the cards
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

        // console.log('The first five cards are:');

        // display 5 results
        for (let i = 0; i < 5; i++) {
            // console.log(`${deck[i].Value} of ${deck[i].Suit}`)
        }

        return `The first five cards are: ${deck[i].Value} of ${deck[i].Suit}`;
    },

    asciiChar: function (char) {
        // program to find the ASCII value of a character

        // take input from the user
        // const string = prompt('Enter a character: ');

        // convert into ASCII value
        const result = char.charCodeAt(0);

        return `The ASCII value is ${result}`
    },

    isPalendrome: function (string) {
        const len = string.length;

        for (let i = 0; i < len / 2; i++) {

            // check if first and last string are same
            if (string[i] !== string[len - 1 - i]) {
                return 'It is not a palindrome';
            }
        }
        return 'It is a palindrome';
    },

    reverse: function (string) {
        let newString = "";
        for (let i = string.length - 1; i >= 0; i--) {
            newString += str[i];
        }
        return newString;
    },

    convertSecondsToTime: function (seconds) {
        if (typeof seconds !== 'number' || seconds < 0) {
            console.error("convertSecondsToTime: The 'seconds' parameter must be a non-negative number.");
            return;
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    convertRelsToTime: function (rels) {
        console.warn("convertRelsToTime: This function is meant to be a joke and may be removed in the future.");
        if (typeof rels !== 'number' || rels < 0) {
            console.error("convertRelsToTime: The 'rels' parameter must be a non-negative number.");
            return;
        }
    
        const totalSeconds = rels * 1.2;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    

    sendto: function (url, delay) {
        if (typeof url !== 'string' || typeof delay !== 'number' || delay < 0) {
            console.error("sendto: 'url' must be a string and 'delay' must be a non-negative number.");
            return;
        }
        setTimeout(() => {
            window.location.href = url;
        }, delay);
    },

    
};

export default UtilityLibrary;
