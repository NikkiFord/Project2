
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
})