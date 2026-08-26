let quoteDisplayEl = document.getElementById("quoteDisplay");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let timerEl = document.getElementById("timer");
let resultEl = document.getElementById("result");
let spinnerEl = document.getElementById("a");
let textareaEl = document.getElementById("quoteInput");

let counter = 0;
let timerId = null;

function startTimer() {
  counter = 0;
  timerEl.textContent = counter;

  if (timerId !== null) {
    clearInterval(timerId);
  }

  timerId = setInterval(function () {
    counter = counter + 1;
    timerEl.textContent = counter;
  }, 1000);
}

function fetchQuoteAndStartTest() {
  spinnerEl.classList.remove("d-none");
  
  textareaEl.value = "";
  resultEl.textContent = "";

  let options = {
    method: "GET"
  };

  fetch("https://apis.ccbp.in/random-quote", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      spinnerEl.classList.add("d-none");
      
     
      quoteDisplayEl.textContent = data.content;
      startTimer();
    });
}


submitBtnEl.onclick = function () {
  if (textareaEl.value === quoteDisplayEl.textContent) {
    clearInterval(timerId);
    resultEl.textContent = "You typed in " + counter + " seconds";
  } else {
    resultEl.textContent = "You typed incorrect sentence";
  }
};


resetBtnEl.onclick = function () {
  fetchQuoteAndStartTest();
};


fetchQuoteAndStartTest();
