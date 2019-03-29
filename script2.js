function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
    }
    return false;
}

function details() {
    var key = getQueryParameter("key");
    console.log("key: " + key);
    $.ajax({
        url: 'https://itunes.apple.com/search?term=' + key,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: resFunc,
        error: function () {
            alert('ERROR 01: retrieval error');
        }
    });


}

function resFunc(data) {
    console.log(data);
    var int = getQueryParameter("song");
    console.log("song: " + int);
    //song rank
    $("#rankD").text(data.results[int].songRank);
    //song name
    $("#songD").text(data.results[int].trackName);
    //artist name
    $("#artistD").text(data.results[int].artistName);
    //album name
    $("#albumD").text(data.results[int].collectionName);
    //album artwork
    $("#albumImgD").attr("src", data.results[int].artworkUrl100);
    //audio snippet
    $("#audioPreD").attr("src", data.results[int].previewUrl);
    //track length (in minutes)
    var time = data.results[int].trackTimeMillis / 1000;
    time = time.toPrecision(3);
    $("#timeD").text("length(sec): " + time);
    //explicitness
    $("#explicit").text(data.results[int].trackExplicitness);
    //link to iTunes page for the song
    $("#linkD").text("to iTunes");
    $("#linkD").attr("href", data.results[int].trackViewUrl);
}
