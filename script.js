const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => {
      // Show the "Copied!" feedback message
      const feedback = document.querySelector(".copy-feedback");
      feedback.style.display = "block"; // Make the feedback visible
      feedback.style.animation = "pop-up 1.5s forwards"; // Start the animation with 'forwards' to maintain the final keyframe state

      // Change the copy icon to a check mark and its color to blue temporarily
      const copyIcon = document.querySelector(".material-symbols-rounded");
      copyIcon.innerText = "check";

      // Hide the feedback message and reset its animation after 1.5 seconds
      setTimeout(() => {
        feedback.style.display = "none"; // Hide the feedback message
        feedback.style.animation = ""; // Reset the animation for next time
        copyIcon.innerText = "copy_all"; // Reset the icon back to copy
      }, 1500); // This timeout duration matches the animation duration
    })
    .catch((err) => console.error("Failed to copy text: ", err));
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
