//---------------------------------------------------------------//
//  log.js 
//  history :
//      - 29/09/2017 : Created
//---------------------------------------------------------------//

const splice = '.'
var func = function (name) {
    this.error = function () { console.error(echo(name, 'ERROR', arguments)) }
    this.warn = function () { console.warn(echo(name, 'WARN ', arguments)) }
    this.info = function () { console.info(echo(name, 'INFO ', arguments)) }
    this.debug = function () { console.log(echo(name, 'DEBUG', arguments)) }
    this.fatal = function () { console.log(echo(name, 'FATAL', arguments)) }
    this.track = function () { console.log(echo(name, 'TRACK', arguments)) }
    this.getDateTime = function () {return getDateTime();},
    this.dumpError = function(err) {
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
    }
}
var echo = function (name, type, args) {
    var str = ''
    // console.log(args)
    for (var key in args) {
        if (args.hasOwnProperty(key)) {
            var element = args[key];
            // console.log(element)
            if (typeof element == 'object' || typeof element == 'array') {
                str += JSON.stringify(element, null, 2) + ' '
            } else {
                str += element + ' '
            }
        }
    }
    return  getDateTime() + ' [' + type + ']' + ' [' + name + '] : ' + str
    // console.error('[' + type + ']', '[' + name + ']', str)
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

module.exports = function (name) {
    // console.log(name)
    return new func(name)
}