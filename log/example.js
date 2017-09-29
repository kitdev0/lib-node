var log1 = require('./log')('test')
var log2 = require('./log')('demo')

log1.debug('debug');
log2.debug('debug');

log1.error('error');
log2.error('error');

log1.fatal('fatal');
log2.fatal('fatal');

log1.info('info');
log2.info('info');

log1.track('track');
log2.track('track');

log1.warn('warning');
log2.warn('warning');

log1.debug('Time => ',log1.getDateTime());
log2.debug('Time => ',log2.getDateTime());
