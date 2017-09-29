//---------------------------------------------------------------//
//  log.js 
//  history :
//      - 29/09/2017 : Created
//---------------------------------------------------------------//

var fs = require('fs');
var util = require('util');
var log_file;
var log_stdout = process.stdout;
var last_time = '';
var log_path = __dirname;

console.log = function () {
    // console.log('#A');
    // logStdout.write('#A');
    // var logFile = fs.createWriteStream(cnt++ + '.log', { flags: 'a' });
    checkLogFileName();
    log_file.write(util.format.apply(null, arguments) + '\n');
    log_stdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;
console.warn = console.log;
console.info = console.log;

const splice = '.'
var func = function (name) {
    this.error = function () { console.error(echo(name, 'ERROR', arguments)) }
    this.warn = function () { console.warn(echo(name, 'WARN ', arguments)) }
    this.info = function () { console.info(echo(name, 'INFO ', arguments)) }
    this.debug = function () { console.log(echo(name, 'DEBUG', arguments)) }
    this.fatal = function () { console.error(echo(name, 'FATAL', arguments)) }
    this.track = function () { console.log(echo(name, 'TRACK', arguments)) }
    this.getDateTime = function () { return getDateTime(); }
    this.dumpError = function (err) {
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
    var msg = getDateTime() + ' [' + type + ']' + ' [' + name + '] : ' + str;

    return msg;
    // console.error('[' + type + ']', '[' + name + ']', str)
}

function getDateTime() {
    var date = new Date();
    var time = date.getFullYear()
        + '-' + pad(date.getMonth() + 1, 2)
        + '-' + pad(date.getDate(), 2)
        + ' ' + pad(date.getHours(), 2)
        + ':' + pad(date.getMinutes(), 2)
        + ':' + pad(date.getSeconds(), 2)
        + '.' + pad(date.getMilliseconds(), 3);
    return time;
}

function checkLogFileName() {
    var date = new Date();
    var time = date.getFullYear()
        + '-' + pad(date.getMonth() + 1, 2)
        + '-' + pad(date.getDate(), 2)

    if (last_time != time) {
        last_time = time;
        log_file = fs.createWriteStream(log_path + last_time + '.log', { flags: 'a' });
    }
}

function pad(num, size) {
    var s = num + ""
    while (s.length < size) s = "0" + s
    return s
}

module.exports = function (name) {
    // console.log(name)
    if (name != undefined)
        return new func(name)
    else
        return new func('undefine')
}