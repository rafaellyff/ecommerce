// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require activestorage
//= require jquery
//= require jquery.turbolinks 
//= require rails-ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .

$( document ).on('turbolinks:load', function() {
 var mask = {
      money: function() {
        var el = this
        ,exec = function(v) {
          v = v.replace(/\D/g,"");
          v = new String(Number(v));
          var len = v.length;
          if (1== len)
            v = v.replace(/(\d)/,"0.0$1");
          else if (2 == len)
            v = v.replace(/(\d)/,"0.$1");
          else if (len > 2) {
            v = v.replace(/(\d{2})$/,'.$1');
          }
          return v;
        };
        setTimeout(function(){
          el.value = exec(el.value);
        },1);
      }
    }
  $(function(){
    $('.moeda').bind('keypress',mask.money)
  });
});
