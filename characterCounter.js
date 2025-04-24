// function for counting CHARACTERS
function countCharacters(textString, excludeSpaces = false) {
	if (excludeSpaces) {
		return textString.replace(/\s/g, "").length;
	}
	return textString.length;
}

// function for counting WORDS
function countWords(textString) {
	return textString
		.trim()
		.split(/\s+/)
		.filter((word) => word !== "").length;
}

// function for counting SENTENCES...
function countSentences(textString) {
	return textString.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "")
		.length;
}

// function for calculating the estimated reading time...
function estimatedReadingTime(wordCount) {
	const minutes = wordCount / 20;
	return minutes < 1 ? "< 1 minute" : `< ${Math.ceil(minutes)} minutes`;
}

// function for counting the letter frequencies
function getLetterFrequency(textString) {
	const letters = textString.toUpperCase().replace(/[^A-Z]/g, "");
	const frequency = {};

	for (const letter of letters) {
		frequency[letter] = (frequency[letter] || 0) + 1;
	}
	return frequency;
}

// function for sorting frequencies in descending order...
function getSortedFrequencies(frequencyList, limit = null) {
	const sorted = Object.entries(frequencyList).sort((a, b) => b[1] - a[1]);
	return limit ? sorted.slice(0, limit) : sorted;
}

module.exports = {
	countCharacters,
	countWords,
	countSentences,
	estimatedReadingTime,
	getLetterFrequency,
	getSortedFrequencies,
};
