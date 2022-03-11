let currentQuestion = 0;
let correctAnswer = 0;
let scoreArea = document.querySelector(".scoreArea");
let questionArea = document.querySelector(".questionArea");
let boxQuestion = document.querySelector(".questionArea .question");
let boxOptions = document.querySelector(".questionArea .options");
let progressBar = document.querySelector(".progress--bar");

const functionsQuestion = {
  showQuestion: function () {
    if (questions[currentQuestion]) {
      let q = questions[currentQuestion];
      let optionsHtml = "";
      let calcPercentage = Math.floor(
        (currentQuestion / questions.length) * 100
      );

      progressBar.style.width = `${calcPercentage}%`;
      scoreArea.style.display = "none";
      questionArea.style.display = "block";

      boxQuestion.innerHTML = q.question;

      for (let i in q.options) {
        optionsHtml += `
        <div data-op="${i}" class="option">
            <span>
                ${+i + 1}
            </span> 
            ${q.options[i]}
        </div>`;
      }
      boxOptions.innerHTML = optionsHtml;

      document.querySelectorAll(".options .option").forEach((option) => {
        option.addEventListener(
          "click",
          functionsQuestion.selectOptionForQuestion
        );
      });
    } else {
      functionsQuestion.finishQuestion();
    }
  },
  selectOptionForQuestion: function (e) {
    let clickedOption = +e.target.getAttribute("data-op");

    if (questions[currentQuestion].answer === clickedOption) {
      correctAnswer++;
    }

    currentQuestion++;
    functionsQuestion.showQuestion();
  },
  finishQuestion: function () {
    let percentagePoints = Math.floor((correctAnswer / questions.length) * 100);

    if (percentagePoints < 30) {
      functionsQuestion.setColorText("Ta ruim em?!", "red");
    } else if (percentagePoints >= 30 && percentagePoints < 70) {
      functionsQuestion.setColorText("Muito Bom!", "yellow");
    } else if (percentagePoints >= 70) {
      functionsQuestion.setColorText("Parabéns", "green");
    }

    document.querySelector(
      ".scorePct"
    ).innerHTML = `Você Acertou ${percentagePoints}%`;
    document.querySelector(
      ".scoreText2"
    ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`;

    progressBar.style.width = "100%";
    scoreArea.style.display = "block";
    questionArea.style.display = "none";
  },
  setColorText: function (text, color) {
    document.querySelector(".scorePct").style.color = `var(--${color})`;
    document.querySelector(".scoreText1").innerHTML = text;
  },
  resetQuestion: function () {
    correctAnswer = 0;
    currentQuestion = 0;
    functionsQuestion.showQuestion();
  },
};

document
  .querySelector(".scoreArea button")
  .addEventListener("click", functionsQuestion.resetQuestion);
functionsQuestion.showQuestion();
