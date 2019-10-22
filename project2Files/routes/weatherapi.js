var db = require("../models");

function weatherApi() {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    $.ajax({
        url: queryURL,
        data: {
            key: "1e73dab239aeea036401b8265c2ac676",
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
};

(function () {
    const $weatherBtn = $(".weatherApi");

    $weatherBtn.click(() => {
        weatherApi();
    })
})();