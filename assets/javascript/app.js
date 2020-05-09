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
})