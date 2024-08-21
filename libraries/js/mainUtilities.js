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

    getUserTimezoneOffset: function () {
        const offset = new Date().getTimezoneOffset();
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        return (offset < 0 ? "+" : "-") + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    },

    sendto: function (url, delay) {
        if (typeof url !== 'string' || typeof delay !== 'number' || delay < 0) {
            console.error("sendto: 'url' must be a string and 'delay' must be a non-negative number.");
            return;
        }
        setTimeout(() => {
            window.location.href = url;
        }, delay);
    }
};

export default UtilityLibrary;
