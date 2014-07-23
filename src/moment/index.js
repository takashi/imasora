/**
 * Module dependencies.
 */
var moment = require('moment');

/**
 * wrapper of moment.js
 */
module.exports = {
  displayUnixTime: function(unixTime) {
    if(!unixTime){
      return moment().format("YYYY MM DD hh:mm:ss");
    }
    return moment.unix(unixTime).format("YYYY MM DD h:mm:ss");
  }
}