let localStorageQA = JSON.parse(localStorage.getItem("localQA"));
let localStorageUser = localStorage.getItem("userQA");
let locStorCatSel = localStorage.getItem("lastCatSel");

// Check if local Storage is not empty
if (localStorageQA === null) {
  localStorage.setItem("localQA", JSON.stringify(qaObj));
  localStorageQA = JSON.parse(localStorage.getItem("localQA"));
  launchApp();
} else {
  launchApp();
}

function getQuestionsAnswers() {
  const defaultQA = localStorageQA.categories[0].questionArr;
  const randomQuestion = Math.floor(Math.random() * defaultQA.length);
  return defaultQA[randomQuestion];
}

function checkAnswer(question) {
  $("#submitAnswer").on("click", () => {
    let userAnswer = $("#answerText").val();
    if (userAnswer.toLowerCase() == question.answer.toLowerCase()) {
      // Should show right answer and ++
      $("#showRightAnswer").html(`
        <h4 class="text-success">You are Right!</h4>
        <button type="button" class="btn btn-success" id="nextQuestion">NEXT</button>
      `);
      $("#nextQuestion").on("click", () => {
        $("#answerText").val("");
        launchApp();
      });
    } else {
      // Should show right answer and --
      $("#showRightAnswer").html(`
        <h4 class="text-danger">Ohh NO!!</h4>
        <p>Right answer was: ${question.answer}</p>
        <button type="button" class="btn btn-success" id="nextQuestion">NEXT</button>
      `);
      $("#nextQuestion").on("click", () => {
        $("#answerText").val("");
        launchApp();
      });
    }
  });
}

function clearOld() {
  $("#greatUser").empty();
  $("#questionText").empty();
  $("#showRightAnswer").empty();
}

function launchApp() {
  clearOld();
  let randomQuestion = getQuestionsAnswers();
  console.log(randomQuestion);
  $("#greatUser").append(`Hello, ${localStorageUser}!`);
  $("#questionText").append(randomQuestion.question);
  checkAnswer(randomQuestion);
}

// Prevent submiting with enter
$(document).ready(function() {
  $(window).keydown(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

// Clear User Data
$("#clearMyData").on("click", e => {
  e.preventDefault();
  localStorage.clear();
  window.location.replace("/");
});

// $("#createNewQuestion").on("click", e => {
//   // e.preventDefault();
//   window.location.replace("/pages/createqa.html");
// });
