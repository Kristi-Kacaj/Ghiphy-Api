//Create array for the buttons
$(document).ready(function() {
    let cartoons = ["Tom & Jerry","Looney Tunes", "Ed, Edd, n' Eddy", "Rugrats", "Teenage Mutan Ninja Turtles", "Teen Titans"]

    //Create the buttons and display them to the page
    function cartoonbuttons(newArray, classToAdd, areaAddedTo) {
        $(arreaAddedTo).empty();

        for (let i = 0; i < newArray.length; i++) {
            let button = $("<button>");
            button.addClass(classToAdd);
            button.attr("data-type", newArray[i]);
            button.text(newArray[i]);
            $(areaAddedTo).append(button);
        }
    }

    //Function generates gif images from Ghiphy API
    $(document).on("click", ".cartoon-buttons", function() {
        $("#images").empty();
        $(".cartoon-buttons").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q" + type + "&api_key=vU4389qg2slcm6FN6k6M3uokVKmfAW4v=10";

        //Ajax Call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let results = response.data;

            for (let i = 0; i < results.length; i++) {
                let cartoonDiv = $("<div class=\"cartoon-shows\">");
                let rating = results[i].rating;
                let p = $("<p>").text("Rating: " + rating);
                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height;

                let cartoonImages = $("<img>");
                cartoonImages.attr("scr", still);
                cartoonImages.attr("data-still", still);
                cartoonImages.attr("data-animated", animated);
                cartoonImages.attr("data-state", "still");
                cartoonImages.addClass("cartoon-images");

                cartoonDiv.append(button);
                cartoonDiv.append(cartoonImages);
                $("#images").append(cartoonDiv);
            }
        })
    })
})

    //Changes from still to animated, back and forth, when an image is clicked on.
