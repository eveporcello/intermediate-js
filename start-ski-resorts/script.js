//
// TODO: List and Save Ski Resorts
//
//    @steps
//
//    1. When the document is ready collect input from the user
//    2. Display the collected Resorts in a list on the DOM
//    3. Save the list using webstorage
//    4. When the page loads load the list from webstorage
//
//

$(document).ready(function() {
    var resorts = load("myResorts");
    if(resorts) {
        $.each(resorts, function() {
            $('<li>').text(this).appendTo('section#resorts>ul:first-of-type');
        });
    }
    $('input').autocomplete({
       source: function(req, res) {
           $.getJSON('http://www.moonhighway.com/class/api/ski-resorts/' + req.term,
                    function(suggestions) {
                        res(suggestions);
                    });
       }
    });
    $('form').submit(function(e) {
       var val = $('input#add-resort').val();
       $('input#add-resort').val('');
       $('<li>').text(val).appendTo('section#resorts>ul:first-of-type');
       resorts = query();
       save("myResorts", resorts, true);
    });
});

function query() {
    return $.map($('section#resorts>ul:first-of-type').children(), function(li) {
       return $(li).text();
    });
}

function load(key) {
    var loaded;
    checkForStorage(function() {
        if(localStorage[key]) {
            loaded = JSON.parse(localStorage[key]);
        } else if(sessionStorage[key]) {
            loaded = JSON.parse(sessionStorage[key]);
        } else {
            console.warn("no storage data found for " + key);
        }
    });
    return loaded;
}

 var save = function(key, obj, perm) {
    checkForStorage(function() {
        window[(perm) ? "localStorage" : "sessionStorage"][key] = JSON.stringify(obj);
    });
};

function checkForStorage(fn) {
    if(localStorage && sessionStorage) {
        fn();
    } else {
        throw new Error("This app requires web storage");
    }
}