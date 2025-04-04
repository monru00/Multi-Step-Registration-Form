const steps = [
  document.querySelector(".step-1"),
  document.querySelector(".step-2"),
  document.querySelector(".step-3"),
];

const buttons = document.querySelectorAll(".button-1");

const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const topicButtons = document.querySelectorAll('.step-2 input[type="button"]');

const nameSummary = document.querySelector(".h1-s3");
const emailSummary = document.querySelector(".h2-s3");
const topicsSummary = document.querySelector(".h3-s3");

const radios = [
  document.querySelector("#page1"),
  document.querySelector("#page2"),
  document.querySelector("#page3"),
];
const stepperTexts = document.querySelectorAll(".stepper-txt");

let selectedTopics = [];
let currentStep = 0;

steps.forEach((step) => (step.style.display = "none"));

steps[0].style.display = "block";
updateRadioState();

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isSelected = button.classList.contains("selected");

    if (isSelected) {
      button.classList.remove("selected");
      button.style.backgroundColor = "#394050";
      selectedTopics = selectedTopics.filter((topic) => topic !== button.value);
    } else if (selectedTopics.length < 2) {
      button.classList.add("selected");
      button.style.backgroundColor = "#845EEE";
      selectedTopics.push(button.value);
    }
  });
});

buttons.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (index === 0) {
      if (!nameInput.value || !emailInput.value) {
        alert("Error: Please fill in both name and email fields");
        return;
      }
      if (!isValidEmail(emailInput.value)) {
        alert("Error: Please enter a valid email address");
        return;
      }
      moveToNextStep();
    } else if (index === 1) {
      if (selectedTopics.length === 0) {
        alert("Error: Please select at least one topic (max 2)");
        return;
      }
      moveToNextStep();

      nameSummary.textContent = nameInput.value;
      emailSummary.textContent = emailInput.value;
      displayTopicsAsList();
    } else if (index === 2) {
      alert("Finished successfully!");
      resetFormAndLoopBack();
    }
  });
});

function moveToNextStep() {
  steps[currentStep].style.display = "none";
  currentStep++;
  steps[currentStep].style.display = "block";
  updateRadioState();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayTopicsAsList() {
  topicsSummary.innerHTML = "";
  const ul = document.createElement("ul");
  selectedTopics.forEach((topic) => {
    const li = document.createElement("li");
    li.textContent = topic;
    ul.appendChild(li);
  });
  topicsSummary.appendChild(ul);
}

function resetFormAndLoopBack() {
  steps[currentStep].style.display = "none";

  nameInput.value = "";
  emailInput.value = "";

  selectedTopics = [];
  topicButtons.forEach((button) => {
    button.classList.remove("selected");
    button.style.backgroundColor = "#394050";
  });

  nameSummary.textContent = "";
  emailSummary.textContent = "";
  topicsSummary.innerHTML = "";

  currentStep = 0;
  steps[0].style.display = "block";
  updateRadioState();
}

function updateRadioState() {
  radios.forEach((radio, idx) => {
    radio.checked = idx === currentStep;

    radio.classList.remove("active");
    if (idx === currentStep) {
      radio.classList.add("active");
    }
  });
  stepperTexts.forEach(
    (text) => (text.textContent = `Step ${currentStep + 1} of 3`)
  );
}
