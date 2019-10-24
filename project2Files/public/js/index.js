
$(() => {
  const $startWizardBtn = $("button#startWizard");
  const $wizardModal = $("#wizardModal");

  $startWizardBtn.click(() => {
    $.get("/wizard-steps/step1", (response) => {
      $wizardModal.html(response);
      $wizardModal.modal("show");
    });
  });
  const $listViewBtn = $("#listView");

  $listViewBtn.click(() => {
    $.get("/listView", (response) =>{
      $listViewBtn.html(response);
    })
  })
  const $weatherBtn = $(".weatherApi");

  $weatherBtn.click(() => {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    $.ajax({
        url: queryURL,
        data: {
          appid: "1e73dab239aeea036401b8265c2ac676",
          q:"London"
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
  })
})