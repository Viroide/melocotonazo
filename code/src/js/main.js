window.melocotonazo = window.melocotonazo || {};

(function (melocotonazo) {

    melocotonazo.index = function (rootElement) {
        this.dom = rootElement;
        this.autor = "Pablo Und Destruktion";
        this.autor_wiki = "Pablo Und Destruktion";
        this.cancion = "A veces la vida es hermosa";
        this.youtube_id = "hx9Udc1LloU";

        melocotonazo.updateTittles();
        melocotonazo.getSpotifyInfo();
        melocotonazo.updateYoutube();
        melocotonazo.readWiki();
    };
    melocotonazo.readWiki = function () {
        // var url = "https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+this.autor;
        // var autor = encodeURIComponent().replace(/%20/g,'+');
        var url = 'http://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&callback=?&titles='+this.autor_wiki;
        var extracts = [];
        $.when($.getJSON(url))
        .then(function(data){
            $.each(data.query.pages,function(k,v){
                // console.log(v.extract);
                extracts.push(v.extract);
            });
            return extracts;
        }).then(melocotonazo.appendWikiExtract);
    };

    melocotonazo.appendWikiExtract = function (extracts) {
        $.each(extracts, function(i, extract){
            melocotonazo.dom.find("#wikipedia .container").append(extract);
        });
    };
    melocotonazo.appendCover = function (image) {
        this.dom.css("background-image", "url("+image.url+")");
    };

    melocotonazo.updateTittles = function () {
        this.dom.find("header h1 .cancion").html(this.cancion);
        this.dom.find("header h1 .autor").html(this.autor);
    };

    melocotonazo.updateSpotify = function(id){
        this.dom.find("#spotify iframe").prop("src", "https://embed.spotify.com/?uri=spotify:track:"+id);
    };

    melocotonazo.updateYoutube = function(){
        this.dom.find("#youtube iframe").prop("src", "https://www.youtube.com/embed/"+this.youtube_id);
    };

    melocotonazo.getSpotifyInfo = function () {
        var url = 'https://api.spotify.com/v1/search?q='+melocotonazo.autor+' '+melocotonazo.cancion+'&type=track';
        var extracts = [];
        $.when($.getJSON(url))
        .then(function(data){
            melocotonazo.appendCover(data.tracks.items[0].album.images[0]);
            melocotonazo.updateSpotify(data.tracks.items[0].id);
        });
    };

    melocotonazo.showYoutube = function () {
        this.dom.find("#youtube").addClass("show");
        this.dom.find("#cerrarFullScreen").addClass("show");
    };

    melocotonazo.showWikipedia = function () {
        this.dom.find("#wikipedia").addClass("show");
        this.dom.find("#cerrarFullScreen").addClass("show");
    };

    melocotonazo.hideFullScreen = function () {
        this.dom.find("#youtube").removeClass("show");
        this.dom.find("#wikipedia").removeClass("show");
        this.dom.find("#cerrarFullScreen").removeClass("show");
    };

    melocotonazo.scafolding = function () {
    
    };

}(window.melocotonazo));