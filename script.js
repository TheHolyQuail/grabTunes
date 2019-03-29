//make global variable result
var searchWord;

$(document).ready(function() {
    //code for searching
    $("body").on("click", "#submit", function() {
        var keyword = $('#nameEntry').val();
        console.log("key: " + keyword);
        $.ajax({
            url: 'https://itunes.apple.com/search?term=' + keyword,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (result) {
                console.log(result);
                dataSend(result, keyword);
                res = result;
            },
            error: function () {
                alert('ERROR 01: retrieval error');
            }
        });
    });
});

function dataSend(result, key) {
    $('#resArea').show();
    $("#table").empty();
    var table = '<br><table>';
    result.resultCount = $('#resCount').val();
    if (result.results.length == 0) {
        table += "<tr class='w3-panel w3-border-top w3-border-blue'>";
        //album art
        table += "<td><p>No Results. :( Check your spelling or try a less specific keyword.</p></td>";
        //
        table += "</tr>";

    } else {
        for (var i = 0; i < result.resultCount; i++) {
            //song rank - artist name - song name - audio preview - album name - album art
            if (result.results[i].kind = "song") {
                table += "<tr class='w3-panel w3-border-top w3-border-blue'>";
                //album art
                table += "<td><img src='" + result.results[i].artworkUrl100 + "'></td>";
                //song name
                table += "<td class='w3-panel w3-border-left w3-border-blue'>" + "album: " + result.results[i].collectionName + "</td>";
                //song name
                table += "<td class='w3-panel w3-border-left w3-border-blue'>" + "song: " + result.results[i].trackName + "</td>";
                //artist name
                table += "<td class='w3-panel w3-border-left w3-border-blue'>" + "Artist: " + result.results[i].artistName + "</td>";
                //audio preview
                table += "<td class='w3-panel w3-border-left w3-border-blue'><audio controls='true' src=" + result.results[i].previewUrl + " id='audio' type='audio/m4a'></audio></td>";
                //details
                table += "<td class='w3-panel w3-border-left w3-border-blue'><a href= 'details.html?key=" + key + "&song=" + i + "'>details</a></td>";
                //
                table += "</tr>";
            } else {
                table += "<tr class='w3-panel w3-border-top w3-border-blue'>";
                //album art
                table += "<td><p>ERROR.</p></td>";
                //
                table += "</tr>";
            }
        }
    }
    table += '</table>';
    $(table).appendTo('#table');
}

