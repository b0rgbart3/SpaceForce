/*  

    SpaceForce 
    ------------

    This app was written by Bart Dority using Javascript, JQuery, the NASA Public Image API,
    and the Wikipedia API

*/

// Global variables
var responseObject;
var searchWord;
var imageURLS = [];
var descriptions = [];
var keywords = [];
var timer = null;



$(document).ready(function() {
    $("#searchBtn").click(respondToSearchInput);
  //  $(".nasaImg").click(showImgInfoModal);
    $(".preset").click(presetSearch);
  //  $(".carousel-control-prev-icon").click(closeModal);
   // $(".carousel-control-next-icon").click(closeModal);
});


// This is the search input input handler
var respondToSearchInput =function(event) { 
    event.preventDefault();	   
    searchNASA();
}

var presetSearch = function(event) {
    if (event && event.target && event.target.id) {
        var thisPreset = event.target.id;
        if (thisPreset) {
            thisPreset = thisPreset.toLowerCase();
        }
        console.log(thisPreset);
        $("#searchInput").val(thisPreset);
        searchNASA();
      //  searchWIKI();
        }
}




var searchNASA=function() {

    console.log("Starting the AJAX request to the NASA API");
    searchWord = $("#searchInput").val();
    if (searchWord) {
        searchWord = searchWord.toLowerCase();
    }
   // console.log(searchWord.length);
    if (searchWord.length < 3) {
        $("#error").css({"display": "block"})
        // console.log(searchWord.length);
    }
    else {
        $("#error").css({"display": "none"})
    var NASAQueryURL = "https://images-api.nasa.gov/search?q="+searchWord;

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: NASAQueryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(collectNASAData);
}}

// var searchWIKI=function(event) {
 
//     // interrupt the browser default process of redirecting to another page
//     // when the form input is filled out
//     // event.preventDefault();
//     console.log("Initializing Wiki search");

//     searchWord = $("#searchInput").val();
//     if (searchWord) {
//         searchWord = searchWord.toLowerCase();
//     }
//     // var CorsKey = "https://cors-anywhere.herokuapp.com/";
//     var WIKIQueryURL ="https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + searchWord + "&limit=1";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: WIKIQueryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(collectWIKIData);
// }



// var collectWIKIData = function(response) {
    

//     var collection; 
//     var items;

//     // Here I need to parse through the response object into
//     // data that we can actually use, starting with an array of images

//     // make sure we got something
//     if (response) {
        
//         console.log(response);
//         console.log(response.pages[0]);
//         console.log(response.pages[0].title);
//         console.log(response.pages[0].excerpt);
//         // What the heck - let's save our own copy of this response object
//         // in case we want to look at it later
        
        
//         buildWikiNodes(response.pages[0]);
//     }
// }

var displayImageSlider = function() {
    // make the image slider visible on the page
    //$("#imageSlider").style.attr({"display":"block"});
    $("#imageSlider").css({"opacity":"1"});
}
// var showImgInfoModal = function() {

//    // $("#imageInfoModal").style.attr({"display":"block"});


// }


// var buildWikiNodes = function(searchInfo) {
    
//     var wikiTag = $("<h2>")
//     // wikiTag.attr("href", href);
//     var wikiTagtoo= $("<p>")
//     wikiTag.text(searchInfo.title);
//     wikiTagtoo.html(searchInfo.excerpt);
//     $("#wikiDescription").empty();
//     $("#wikiDescription").append(wikiTag);
//     $("#wikiDescription").append(wikiTagtoo);

// }





// These function declaration can go anywhere

// searchNASA - this function gets called when the user
// enters a new search term in the input field

var searchNASA=function(event) {
 
    // interrupt the browser default process of redirecting to another page
    // when the form input is filled out
  //  console.log("in searchNasa:");
    if (event) {    event.preventDefault(); }
 
   // console.log("Initializing search");

    searchWord = $("#searchInput").val();
    if (searchWord) {
        searchWord = searchWord.toLowerCase();
    }
  //  console.log("Search word: " + searchWord);
    var NASAQueryURL = "https://images-api.nasa.gov/search?q="+searchWord;

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: NASAQueryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(collectNASAData);
}

// collectNASAData 
// This is the callback function that receives the data from NASA
var collectNASAData = function(response) {
    var collection; 
    var items;

    console.log("Got back from the the NASA API, and now collecting the data");
   // console.log("In collectNasa Data");
    // Here I need to parse through the response object into
    // data that we can actually use, starting with an array of images

    // make sure we got something
    if (response) {
        //console.log(JSON.stringify(response));
        // What the heck - let's save our own copy of this response object
        // in case we want to look at it later
        responseObject = response;
        collection = responseObject.collection;
        
        items = collection.items;
        descriptions = [];
        // console.log(JSON.stringify(items) );
        if (items)
        {
            imageURLS = [];
            
            items.forEach(function(item, index) {
              //  console.log(item);
                 loadThisImageItem (item, index);
               
            });

            // if (imageURLS.length <1 ) {
            //     console.log("There was a problem loading all the images.");
            //     items.forEach(function(item, index) {
            //         //  console.log(item);
            //            loadThisImageItem (item, index);
                     
            //       });
            //       if (imageURLS.length <1 ) {
            //         console.log("AGAIN, There was a problem loading all the images.");
            //       }
            // }

        }
       console.log("About to call buildImageNodes: ImageUrls:", imageURLS.length);
        buildImageNodes();
        // this will trigger the display to show the images in the slider
        displayImageSlider();
    }
}

var displayImageSlider = function() {
    // make the image slider visible on the page
    //$("#imageSlider").style.attr({"display":"block"});
    $("#imageSlider").css({"opacity":"1"});
}
// var showImgInfoModal = function() {

//     $("#imageInfoModal").style.attr({"display":"block"});


// }
var shorten  = function( longString, desiredLength ) {
    if (longString.length > desiredLength) {
    let shorter = longString.substring(0, desiredLength);
    return shorter + "..."; }
    else {
        return longString;
    }
}

var loadThisImageItem = function(item, index) {

    if(item.links && item.links[0] && item.links[0].href  && index < 26 && item.links[0].render === "image") 
    {
    
        // collect image urls
        var thisURL = item.links[0].href;
        var testImage = new Image();
        testImage.src = thisURL;

        // check to make sure the image loads -- otherwise we don't want
        // to include it.
        // if (testImage.width != 0 )
        // {

             // store them in a local array
        imageURLS.push(thisURL);

        // make sure the data object exists
        if (item.data && item.data[0]) {
            
            // grab the description and keywords and store them
            var thisDescription = shorten(item.data[0].description, 240);
            var theseKeyWords = item.data[0].keywords;
            descriptions.push(thisDescription);
            keywords.push(theseKeyWords);
        } else {
            console.log("There was a problem with one of the datums");
        }


        } else {
            console.log("Image didn't load properly.");
        }
        
      
       
  //  }

}

// buildImageNodes
// This dynamically generates image nodes in the DOM
// for the slider
var buildImageNodes = function() {
    if (imageURLS) {
        //console.log("imageUrls");
        var container = $("#carousel-inner")
        container.empty();
        var newDiv = null;
        var indicators = $("#carousel-indicators");
        indicators.empty();
        var newIndicator = null;
        imageURLS.forEach( function(imageURL, index) {

            
            if (index === 0 ) {
                newIndicator =  $("<li data-target='#carouselExampleCaptions' data-slide-to='0' class='active'></li>");
            } else {
            newIndicator =  $("<li data-target='#carouselExampleCaptions' data-slide-to='{$index}'></li>");}

            indicators.append(newIndicator);


            var newCenter = $("<div class='carousel-item-center'>");

            if (index === 0 ) {
                newDiv = $("<div class='carousel-item active' id='0'>");
            } else {
              newDiv = $("<div class='carousel-item' id={$index}>"); }
            
            var actualImage = new Image;
            actualImage.src = imageURL;


            var newImage = $("<img class='nasaImage'>");
            newImage.attr("src",imageURL);
            newImage.attr("data-id", index);
            newCenter.append(newImage);

            let newCaption= $("<div class='caption group'>"+ descriptions[index] +"</div>")
            console.log(index);
                
            newDiv.append(newCenter);
            newDiv.append(newCaption);

            container.append(newDiv);

            $(".nasaImage")
    //.on('load', function() { console.log("image loaded correctly"); })
    .on('error', function() { console.log("error loading image"); })
    //.attr("src", $(originalImage).attr("src"))
;

        })

     //   $(".nasaImage").click(showModal);
    }
}

// var showModal = function(e) {

//     var id= $(e.target).data('id');
//   //  console.log(descriptions[id]);

//     var modal = $("#modal");
//     modal.empty();
//     var newPar = $("<p>" + descriptions[id] + "</p>");
//     modal.append(newPar);
//     modal.toggleClass('showMe');

//     timer = setTimeout(function() { 
//        closeModal();
//     }, 10000)
// }

// var closeModal = function() {
//   //  console.log("closing modal");
//     var modal = $("#modal");
//     modal.removeClass('showMe'); 
//     if (timer) { clearInterval(timer); }

// }