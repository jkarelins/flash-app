let localStorageUser = localStorage.getItem("userQA");

if (localStorageUser === null) {
  // check that User does not exists, and request Username
  $("#mainIndexCard").empty();
  $("#mainIndexCard").append(`
    <div class="card-header">
      Flash Card Game
    </div>
    <div class="card-body">
      <h4>Please Enter Your Name</h4>
      <input
        type="text"
        class="form-control mb-3"
        id="inputYourName"
        placeholder="Please. Input Your Name."
      />
      <div id="alert"></div>

      <button
        type="button"
        class="btn btn-lg btn-primary"
        id="confirmYourName"
      >
        SUBMIT
      </button>
    </div>
  `);

  $("#confirmYourName").on("click", () => {
    const nameReceived = $("#inputYourName").val();
    if (nameReceived.length < 4) {
      $("#alert").empty();
      $("#alert").append(
        '<small class="text-danger">Sorry, Your name should contain more then 4 letters.</small>'
      );
    } else {
      localStorage.setItem("userQA", nameReceived);
      // location.reload();
      window.location.replace("/pages/cards.html");
    }
  });
} else {
  // Now we have user and can continue...
  window.location.replace("/pages/cards.html");
}
