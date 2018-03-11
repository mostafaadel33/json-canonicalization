// ES6 JSON Canonicalizer
'use strict';
var CanonicalizedJSON = {
    stringify: function (object) {

        var result = '';
        serialize(object);
        return result;

        function serialize(object) {
            if (object !== null && typeof object === 'object') {
                if (Array.isArray(object)) {
                    result += '[';
                    var next = false;
                    object.forEach((element) => {
                        if (next) {
                            result += ',';
                        }
                        next = true;
                        serialize(element);
                    });
                    result += ']';
                } else {
                    result += '{';
                    var next = false;
                    Object.keys(object).sort().forEach((property) => {
                        if (next) {
                            result += ',';
                        }
                        next = true;
                        result += JSON.stringify(property);
                        result += ":";
                        serialize(object[property]);
                    });
                    result += '}';
                }
            } else {
                result += JSON.stringify(object);
            }
        }
    }
};