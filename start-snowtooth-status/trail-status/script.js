//
// TODO: Load and Display Trail Status
//
//   -http://www.moonhighway.com/class/api/snowtooth/trails
//

$(document).ready(function() {

    $.getJSON('http://www.moonhighway.com/class/api/snowtooth/trails',
              function(liftData) {
                  $.each(liftData, function(i) {
                      $('<li>').addClass(this.difficulty)
                               .text(this.name + " - " + this.status)
                               .appendTo('ul#trails');
                  });

                  $('li:contains("open")').css('color', 'green');
                  $('li:contains("closed")').css('color', 'red');
    });

});