let quoteDisplayEl = document.getElementById("quoteDisplay");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let timerEl = document.getElementById("timer");
let resultEl = document.getElementById("result");
let spinnerEl = document.getElementById("a");
let textareaEl = document.getElementById("quoteInput");

let counter = 0;
let timerId = null;

// Function to start the timer cleanly
function startTimer() {
  counter = 0;
  timerEl.textContent = counter;

  // Clear existing interval if one is already running
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timerId = setInterval(function () {
    counter = counter + 1;
    timerEl.textContent = counter;
  }, 1000);
}

// Function to fetch a new quote and handle loading state
function fetchQuoteAndStartTest() {
  // Show spinner while fetching
  spinnerEl.classList.remove("d-none");
  
  // Clear previous result and input
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
      // Hide spinner once content is loaded
      spinnerEl.classList.add("d-none");
      
      // Update quote display & start the timer
      quoteDisplayEl.textContent = data.content;
      startTimer();
    });
}

// Event Handler for Submit Button
submitBtnEl.onclick = function () {
  if (textareaEl.value === quoteDisplayEl.textContent) {
    // Stop the timer ONLY when the quote matches
    clearInterval(timerId);
    resultEl.textContent = "You typed in " + counter + " seconds";
  } else {
    // Keep timer running and display error message
    resultEl.textContent = "You typed incorrect sentence";
  }
};

// Event Handler for Reset Button
resetBtnEl.onclick = function () {
  fetchQuoteAndStartTest();
};

// Initial load when the script runs
fetchQuoteAndStartTest();
