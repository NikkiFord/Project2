
$(() => {
  const $addTripBtn = $("button#addTrip");
  const $wizardModal = $("#wizardModal");

  $addTripBtn.click(() => {
    $.get("/wizard-steps/step1", (response) => {
      $wizardModal.html(response);
      $wizardModal.modal("show");
    });
  });
});
