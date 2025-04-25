// SELECTING INDIVIDUAL HTML ELEMENTS FOR SCRIPTING
const toggleBtnIcon = document.getElementById("themeToggle");
const toggleBtn = document.getElementById("themeWrap");
const logo = document.getElementById("logo");

// main input box...
const textInput = document.getElementById("text-input");

// additional input options...
const excludeSpacesCheckbox = document.getElementById("exclude-spaces");
const limitCheckbox = document.getElementById("limit-checkbox");
const limitInputContainer = document.getElementById("limit-input-container");
const textLimitInput = document.getElementById("limit-input");
const limitMessage = document.getElementById("limit-alert");
let limitInputTimer;

const readingTime = document.getElementById("reading-time");

// display values...
const charCountValue = document.getElementById("char-count-value");
const wordCountValue = document.getElementById("word-count-value");
const sentenceCountValue = document.getElementById("sentence-count-value");

// character metrices...
const filledDensityDetails = document.getElementById("density-details-filled");
const emptyDensityCaption = document.getElementById("density-details-empty");

// view more button...
const viewMoreBlock = document.getElementById("view-more-button-block");
const seeMoreButton = document.getElementById("view-more-button");
let isExpanded = false;

// creating lightMode and darkMode functionality...
toggleBtn.addEventListener("click", themeSwitch);

function themeSwitch() {
	document.body.classList.toggle("darkMode");
	const isDarkMode = document.body.classList.contains("darkMode");

	// toggling the logo...
	if (isDarkMode) {
		logo.src = "./assets/images/logo-dark-theme.svg";
	} else {
		logo.src = "./assets/images/logo-light-theme.svg";
	}

	// toggling the icon in the theme button...
	if (isDarkMode) {
		themeToggle.src = "./assets/images/icon-sun.svg";
	} else {
		themeToggle.src = "./assets/images/icon-moon.svg";
	}

	// saving the current theme to local storage...
	localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");

// toggling the theme of the website based on the saved theme state on local storage if any exist already...
if (savedTheme === "dark") {
	document.body.classList.add("darkMode");
	logo.src = "./assets/images/logo-dark-theme.svg";
	themeToggle.src = "./assets/images/icon-sun.svg";
} else {
	logo.src = "./assets/images/logo-light-theme.svg";
	themeToggle.src = "./assets/images/icon-moon.svg";
}

// Listening for Input Changes...
textInput.addEventListener("input", characterChanges);
textLimitInput.addEventListener("input", () => {
	clearTimeout(limitInputTimer);

	// preventing the limit input from triggering as soon as user starts entering a number...
	limitInputTimer = setTimeout(() => {
		characterChanges();
	}, 500);
});

// toggling the See More button to See Less on Click
seeMoreButton.addEventListener("click", () => {
	isExpanded = !isExpanded;
	characterChanges();
	seeMoreButtonState();
});

// main count function block...
function characterChanges() {
	let textCharacter = textInput.value;
	let interpretedText = textCharacter;

	// checking for space exclusion...
	if (excludeSpacesCheckbox.checked) {
		interpretedText = interpretedText.replace(/\s/g, "");
	}

	// toggling the limit message only when limit is reached
	if (limitCheckbox.checked) {
		const charLimitValue = parseInt(textLimitInput.value);
		if (!isNaN(charLimitValue)) {
			if (textCharacter.length >= charLimitValue) {
				textCharacter = textCharacter.substring(0, charLimitValue);
				textInput.value = textCharacter;
				textInput.classList.add("text-limit-reached");
				limitMessage.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">
				<p>Limit reached! Your text exceeds ${charLimitValue} characters</p>`;
			} else {
				textInput.classList.remove("text-limit-reached");
				limitMessage.innerHTML = "";
			}
		}
	}

	// toggling the limit input box only upon checking the limit checkbox...
	if (limitCheckbox.checked) {
		limitInputContainer.style.display = "block";
	} else {
		limitInputContainer.style.display = "none";
	}

	// charactor count calculation...
	const charCount = interpretedText.length;
	const paddedCharCount = String(charCount).padStart(2, "0");

	// word count calculation...
	const wordCount = textCharacter
		.trim()
		.split(/\s+/)
		.filter((word) => word !== "").length;
	const paddedWordCount = String(wordCount).padStart(2, "0");

	// sentence count calculation...
	const sentenceCount = textCharacter
		.split(/[.!?]+/)
		.filter((sentence) => sentence.trim() !== "").length;
	const paddedSentenceCount = String(sentenceCount).padStart(2, "0");

	// updating values on the UI dynamically...
	charCountValue.innerText = `${paddedCharCount}`;
	wordCountValue.innerText = `${paddedWordCount}`;
	sentenceCountValue.innerText = `${paddedSentenceCount}`;

	const readingTimeDisplay = estimatedReadingTime(wordCount);
	readingTime.innerText = `${readingTimeDisplay}`;

	// Reseting the density container...
	filledDensityDetails.innerHTML = "";

	// switching between Empty State and Filled state based on whether text is entered or not...
	if (interpretedText.length === 0) {
		emptyDensityCaption.style.display = "block";
		filledDensityDetails.style.display = "none";
		isExpanded = false;
		seeMoreButtonState();
	} else {
		emptyDensityCaption.style.display = "none";
		filledDensityDetails.style.display = "block";
	}

	// Counting letter frequencies only, not numbers...
	const alphabeticalCharactersOnly = interpretedText
		.toUpperCase()
		.replace(/[^A-Z]/g, "");
	const characterCounts = [];

	for (let character of alphabeticalCharactersOnly) {
		characterCounts[character] = (characterCounts[character] || 0) + 1;
	}

	const totalCharacters = alphabeticalCharactersOnly.length;

	// toggling the See more button based on whether entered characters are more than 5 or not...
	if (
		interpretedText.length === 0 ||
		Object.keys(characterCounts).length <= 5
	) {
		viewMoreBlock.style.display = "none";
		isExpanded = false;
		seeMoreButtonState();
	} else {
		viewMoreBlock.style.display = "block";
	}

	// Sorting by highest frequency...
	let sortedCharacters = Object.entries(characterCounts).sort(
		(a, b) => b[1] - a[1]
	);

	if (!isExpanded) {
		sortedCharacters = sortedCharacters.slice(0, 5); // thus, getting first top 5 characters only
	}

	// Dynamically creating and injecting character density details...
	sortedCharacters.forEach(([character, count]) => {
		const percentage = ((count / totalCharacters) * 100).toFixed(2);

		const densityItem = document.createElement("div");
		densityItem.classList.add("density-item");

		densityItem.innerHTML = `
		<p class="density-letter">${character}</p>
      <div class="total-progress">
        <div
          class="covered-progress"
          style="width: ${percentage}%;"
        ></div>
      </div>
      <p class="density-metrics">${count} (${percentage}%)</p>`;

		filledDensityDetails.appendChild(densityItem);
	});
}

// Creating the see more text state functionality...
function seeMoreButtonState() {
	seeMoreButton.querySelector("p").innerText = isExpanded
		? "See Less"
		: "See More";
}

// creating the reading time functionality...
function estimatedReadingTime(wordCount) {
	const minutes = wordCount / 20; // assuming 20 words per minute...
	return minutes < 1 ? "< 1 minute" : `< ${Math.ceil(minutes)} minutes`;
}

// tracking checkbox state changes...
excludeSpacesCheckbox.addEventListener("change", characterChanges);
limitCheckbox.addEventListener("change", characterChanges);
