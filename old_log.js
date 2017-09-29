//---------------------------------------------------------------//
//  modules/log.js 
//  by :
//      Mr.kittisak raktham
//  history :
//      - 26/08/2017 : Created
//---------------------------------------------------------------//

module.exports = {
    Info : function () {
        // console.log('[INFO] ' + '[' + service_name + '] : ', _str);
        convert('INFO',arguments);
    },
    Warn : function () {
        // console.log('[WARN] ' + '[' + service_name + '] : ', _str);
        convert('WARN',arguments);
    },
    Error : function () {
        // console.log('[ERROR] ' + '[' + service_name + '] : ', _str);
        convert('ERROR',arguments);
    },
    Fatal : function () {
        // console.log('[FATAL] ' + '[' + service_name + '] : ', _str);
        convert('FATAL',arguments);
    },
    Trace : function () {
        // console.log('[TRACE] ' + '[' + service_name + '] : ', _str);
        convert('TRACE',arguments);
    },
    Debug : function () {
        convert('DEBUG',arguments);
    },
    DumpError : function(err) {
        if (typeof err === 'object') {
            if (err.message) {
                console.log('Message : ' + err.message)
            }
            if (err.stack) {
                console.log('Stacktrace : ====================\n' + err.stack);
            }
        } else {
            console.log('dumpError :: argument is not an object');
        }
    },
    GetDateTime : () => {
        return getDateTime();
    }
}

function convert(type,arg){
    var msg = '';
    for (var i=1; i<arg.length; i++){
        if(typeof arg[i] === 'object'){
            msg += ' ' + JSON.stringify(arg[i],null,2);
        }
        else{
            msg += ' ' + arg[i];
        }

    }
    console.log('[' + type + '] ' + '[' + arg[0] + '] :', msg);
}

function getDateTime(){
    var _date = new Date();
    var _time = _date.getFullYear() 
    + '-' + pad(_date.getMonth() + 1,2)
    + '-' + pad(_date.getDay(),2)
    + ' ' + pad(_date.getHours(),2)
    + ':' + pad(_date.getMinutes(),2)
    + ':' + pad(_date.getSeconds(),2)
    + '.' + pad(_date.getMilliseconds(),3);
    return _time;
}

function pad(num, size) {
    var s = num + ""
    while (s.length < size) s = "0" + s
    return s
}

// exports.Info = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [INFO] :', _str);
// }
// exports.Warn = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [WARN] :', _str);
// }
// exports.Error = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [ERROR] :', _str);
// }
// exports.Fatal = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [FATAL] :', _str);
// }
// exports.Trace = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [TRACE] :', _str);
// }
// exports.Debug = function (service_name,_str) {
//     console.log('[' + service_name + ']' + ' [DEBUG] :', _str);
// }


// exports.log = function (_service_name) {
//     // service_name = _service_name;
//     this.service_name = _service_name;
//     this.get_service_name = function () {
//         return this.service_name;
//     }
//     this.Info = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [INFO] :', _str);
//     }
//     this.Warn = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [WARN] :', _str);
//     }
//     this.Error = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [ERROR] :', _str);
//     }
//     this.Fatal = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [FATAL] :', _str);
//     }
//     this.Trace = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [TRACE] :', _str);
//     }
//     this.Debug = function (_str) {
//         console.log('[' + this.service_name + ']' + ' [DEBUG] :', _str);
//     }
// }