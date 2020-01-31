let localStorageQA = JSON.parse(localStorage.getItem("localQA"));
let localStorageUser = localStorage.getItem("userQA");
const newCatObj = {
  categorieName: "",
  newQAobj: [
    {
      question: "",
      answer: ""
    }
  ]
};

// Check if local Storage is not empty
if (localStorageQA === null) {
  localStorage.setItem("localQA", JSON.stringify(qaObj));
  localStorageQA = JSON.parse(localStorage.getItem("localQA"));
  launchApp();
} else {
  launchApp();
}

function findUserInLocalObj(obj, user) {
  if (obj.username == user) {
  } else {
    obj.username = user;
    localStorage.setItem("localQA", JSON.stringify(obj));
    findUserInLocalObj(obj, user);
  }
}

function findCategories(obj) {
  $("#foundCategories").append(
    obj.categories
      .map(
        ({ name }) =>
          `<button type="button" class="btn btn-outline-primary m-3" data="${name}">${name}</button>`
      )
      .join("")
  );
}

function checkSelectedCategorie(obj) {
  $("#foundCategories").on("click", e => {
    const categorySelectedBtn = e.target.getAttribute("data");
    let categorySelected = [];
    for (category of obj.categories) {
      if (category.name == categorySelectedBtn) {
        categorySelected = category.questionArr;
      }
    }
    resetContent();
    createCategoryForm();
    saveNewQuestion(categorySelectedBtn);
  });
}

function resetContent() {
  $("#mainContent").empty();
}

function createCategoryForm() {
  $("#mainContent").append(`
    <form>
      <div class="form-group">
        <label for="newQuestion">New Question:</label>
        <input type="text" class="form-control" id="newQuestion" required>
      </div>
      <div class="form-group">
        <label for="rightAnswer">Right Answer</label>
        <input type="text" class="form-control" id="rightAnswer" required>
      </div>
      <div id="error"></div>
      <button type="button" class="btn btn-success mb-3" id="saveNewQA">Save</button>
    </form>
  `);
}

function saveNewQuestion(cat) {
  $("#saveNewQA").on("click", () => {
    const newQuest = $("#newQuestion").val();
    const newAnsw = $("#rightAnswer").val();
    if (newAnsw && newQuest) {
      for (category of localStorageQA.categories) {
        if (category.name == cat) {
          category.questionArr.push({
            question: newQuest,
            answer: newAnsw
          });
        }
      }
      localStorage.setItem("localQA", JSON.stringify(localStorageQA));
      localStorageQA = JSON.parse(localStorage.getItem("localQA"));
      $("#error").html(
        '<small class="text-success">Your New question added!</small>'
      );
      $("#newQuestion").val("");
      $("#rightAnswer").val("");
    } else {
      $("#error").html(
        '<small class="text-danger">Please input Question & Answer</small>'
      );
    }
  });
}

function launchApp() {
  findUserInLocalObj(localStorageQA, localStorageUser);
  findCategories(localStorageQA);
  checkSelectedCategorie(localStorageQA);
}

$("#btnNewCatToAdd").on("click", e => {
  e.preventDefault();
  const newCategoryName = $("#newCategoryToAdd").val();
  for (category of localStorageQA.categories) {
    if (category.name == newCategoryName) {
      $("#error").html(
        `<small class="text-danger"> Sorry we have this category. Choose other name.`
      );
    } else {
      localStorageQA.categories.push({
        name: newCategoryName,
        questionArr: []
      });
      localStorage.setItem("localQA", JSON.stringify(localStorageQA));
      $("#newCategoryToAdd").val("");
      location.reload();
      break;
      // console.log("goo");
    }
  }
  console.log(localStorageQA.categories);
});

// Clear User Data
$("#clearMyData").on("click", e => {
  e.preventDefault();
  localStorage.clear();
  window.location.replace("/");
});
