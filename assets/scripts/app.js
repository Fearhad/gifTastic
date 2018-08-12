var topics = ["Sweden", "Iceland", "Denmark", "Norway", "Finland"];

function renderButtons() {

    $("#btnContainer").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("country");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#btnContainer").append(btn);
    }
};

$(document).on("click", ".country", function () {
    $("#imgContainer").empty();
    var country = $(this).attr("data-name");
    console.log(country);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        country + "&api_key=tFS9qiGX2UQszVY0UPQkFtxl8gW3gYNR&limit=10";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var countryDiv = $("<div class='imgBox polaroid rotate_right'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var pTitle = $("<p>").text("Title: " + results[i].title);
                var countryImage = $("<img data-state='still'>");
                countryImage.attr("src", results[i].images.fixed_height_still.url);
                countryImage.attr("data-still", results[i].images.fixed_height_still.url);
                countryImage.attr("data-animate", results[i].images.fixed_height.url);
                countryDiv.append(countryImage);
                countryDiv.append(pTitle);  
                countryDiv.append(p);                
                $("#imgContainer").append(countryDiv);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        })
});

$(document).on("click", "img", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", "#submit", function () {
   var addCountry = $("#addCountry").val().trim();
   topics.push(addCountry);
   renderButtons();
});

renderButtons();