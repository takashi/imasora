/**
 * Module dependencies.
 */
var $        = require('jquery');
var settings = require('./settings');

/**
 * Instagram
 */
module.exports = function() {
    var baseURL = settings.instagram.baseURL;
    var accessToken = settings.instagram.accessToken;
    var tagName = 'イマソラ';

    function getTagsPhoto(tagName, nextMaxTagId) {
      return $.ajax({
        url: baseURL + tagName + '/media/recent',
        dataType: 'jsonp',
        data: {
          'access_token': accessToken,
          'max_tag_id'  : nextMaxTagId
        },
      });
    }

    return {
      getPhotos: function() {
        var args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        if(typeof args[0] === 'string' || typeof args[0] === 'number') {
          return getTagsPhoto(tagName, args[0])
        }else{
          return getTagsPhoto(tagName, null)
        }
      }
    };
  };
