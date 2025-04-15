const toggleBtn = document.getElementById("themeToggle");
const logo = document.getElementById("logo");

toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("darkMode");

	if (document.body.classList.contains("darkMode")) {
		logo.src = "./assets/images/logo-dark-theme.svg";
	} else {
		logo.src = "./assets/images/logo-light-theme.svg";
	}

	if (document.body.classList.contains("darkMode")) {
		themeToggle.src = "./assets/images/icon-sun.svg";
	} else {
		themeToggle.src = "./assets/images/icon-moon.svg";
	}
});

// LAB THREE (3)

// Selecting the Elements involved in dynamism...
const textBox = document.getElementById("text-box");
const excludedSpaces = document.getElementById("exclude-spaces");
const characterLimitChecker = document.getElementById("character-limit");
const characterLimitSetter = document.getElementById("set-limit");
const readTime = document.getElementById("read-time");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");
const densityDetails = document.getElementById("density-details-filled");

// Listening for Input Changes
