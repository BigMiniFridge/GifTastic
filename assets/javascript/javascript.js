$(document).ready(function() {

    //initial array of types of game titles to pre-populate starter buttons

    var topics = ["Call of Duty", "Minecraft", "Fortnite", "Counter Strike", "No Man's Sky", "Warcraft", "Starcraft", "Gran Turismo", "Battlefield"];

    //first need function to GET attributes and display content to DOM using Giphy API and JSON

    function displayInfo() {
        var game = $(this).attr("game-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";

        //use AJAX to GET information on game button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty games div so new selection appends to emtpy div

            $("#games").empty();

            var results = response.data;

            //user for loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together

            for (var i = 0; i < results.length; i++) {
                var gameDiv = $("<div class='userGame'>");

                //make variable for rating for clean appending

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //make variables for still url and animated url for clean build

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                gameDiv.append(gif);
                gameDiv.append(pRate);

                //append all for loop created divs to the DOM

                $("#games").append(gameDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime on render

        $("#gameButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var gameRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            gameRender.addClass("game");
            gameRender.attr("game-name", topics[i]);
            gameRender.text(topics[i]);
            $("#gameButtons").append(gameRender);
        }
    }

    //on click event to add an additional game button when submitted - push input to array.

    $("#addGame").on("click", function(event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        topics.push(game);
            $("#game-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "game" and run display function
    $(document).on("click", ".game", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});