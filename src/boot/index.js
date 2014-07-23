/**
 * Module dependencies.
 */
var Instagram = require('instagram');
var Vue       = require('vue');
var $         = require('jquery');
var rAF       = require('raf');


/**
 * Boot
 */
new Vue({
    el: '#imasoraApp',

    created: function() {
      this.load();
      rAF();
      this.resize();
      /**
       * does 'v-on' work with onscroll and onresize :/ ?
       */
      window.onresize = this.resize;
      window.onscroll = this.paginate.bind(this);
    },

    data: {
      nextMaxTagId: null,
      photos: [],
      imageSize: '200px',
      isPaginating: false
    },

    methods: {
      load: function() {
        var self = this;
        var next = $.proxy(self.next, self);
        next().then(next).then(next);
      },
      next: function() {
        this.isPaginating = true;
        var self = this;
        return (new Instagram()).getPhotos(self.nextMaxTagId)
          .done($.proxy(self.setPhotos, self));
      },
      paginate: function() {
        if(this.isPaginating){
          return;
        }
        var top = $(window).scrollTop();
        var height = window.innerHeight;
        var clientHeight = document.body.clientHeight;
        if(height === clientHeight || height > clientHeight){
          this.next();
          return;
        }
        var diff = (clientHeight - height) - top
        if(diff < 100){
          this.next();
          return;
        }
      },
      setPhotos: function(msg){
        for(var i=0, image; image = msg.data[i]; i++){
          if(image.tags.indexOf('カコソラ') === -1) {
            this.photos.push(image.images);
          }
        }
        this.isPaginating = false;
        this.nextMaxTagId = msg.pagination.next_max_tag_id;
      },
      resize: function() {
        var width = window.innerWidth;
        var iw = width / 9;
        $('.photo').css({
          width: iw,
          height: iw
        });
        $('.photo-source').css({
          "backgroundSize": iw*1.3+'px '+iw*1.3+'px'
        });
      }
    }
  });