$(document).ready(function() {
    $('.loading').show().animate({'letter-spacing': '0.5em'}, 7000);
    $('table').hide();
});

$.getJSON('http://www.moonhighway.com/class/api/snowtooth/lifts',
    function(liftData) {
        $.each(liftData, function(i) {
            var tr = $('<tr>').attr('id', 'lift-' + i)
                .appendTo('tbody');
            $('<td>').text(this.name).appendTo(tr);
            $('<td>').text(this.type).appendTo(tr);
            $('<td>').text(this.status).appendTo(tr);
        });
        $('td:contains("open")').css('color', 'green');
        $('td:contains("closed")').css('color', 'red');
        $('td:contains("hold")').css('color', 'goldenrod');
        $('.loading').stop().fadeOut(1000);
        $('table').delay(1000).fadeIn(1000);
});