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

$(document).on( "click", "button", function() {
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
                var countryDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var countryImage = $("<img>");
                countryImage.attr("src", results[i].images.fixed_height.url);
                countryDiv.append(p);
                countryDiv.append(countryImage);
                $("#imgContainer").prepend(countryDiv);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
  });

renderButtons();