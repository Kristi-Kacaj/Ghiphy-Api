//Create array for the buttons
$(document).ready(function() {
    let cartoons = ["Tom & Jerry","Looney Tunes", "Ed, Edd, n' Eddy", "Rugrats", "Teenage Mutan Ninja Turtles", "Teen Titans"]

    //Create the buttons and display them to the page
    function cartoonButtons(newArray, classToAdd, areaAddedTo) {
        $(areaAddedTo).empty();

        for (let i = 0; i < newArray.length; i++) {
            let button = $("<button>");
            button.addClass(classToAdd);
            button.attr("data-type", newArray[i]);
            button.text(newArray[i]);
            $(areaAddedTo).append(button);
        }
    }

    //Function generates gif images from Ghiphy API
    $(document).on("click", ".cartoon-button", function() {
        $("#images").empty();
        $(".cartoon-button").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=vU4389qg2slcm6FN6k6M3uokVKmfAW4v&limit=10";

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
                let static = results[i].images.fixed_height_still.url;
                let cartoonImages = $("<img>");

                cartoonImages.attr("src", static);
                cartoonImages.attr("data-still", static);
                cartoonImages.attr("data-animate", animated);
                cartoonImages.attr("data-state", "still");
                cartoonImages.addClass("cartoon-images");
                cartoonDiv.append(p);
                cartoonDiv.append(cartoonImages);

                $("#images").prepend(cartoonDiv);
            }
        })
    })
    
    //Changes from still to animated, back and forth, when an image is clicked on
    $(document).on("click", ".cartoon-images", function() {
        let state = $(this).attr("data-state");

        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $("#add-cartoon").on("click", function(event) {
        event.preventDefault();
        let newCartoons = $("input").eq(0).val();

        cartoons.push(newCartoons);

        cartoonButtons(cartoons, "cartoon-button", "#cartoon-buttons");
    })

    cartoonButtons(cartoons, "cartoon-button", "#cartoon-buttons");

})