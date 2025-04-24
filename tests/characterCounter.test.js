const {
	countCharacters,
	countWords,
	countSentences,
	estimatedReadingTime,
	getLetterFrequency,
	getSortedFrequencies,
} = require("../characterCounter.js");

// textString with spaces included...
describe("Unit test cases for character count functionality", () => {
	// best case: textString in the input box...
	test("counts all characters including spaces", () => {
		let myString = countCharacters("I love JEST");
		expect(myString).toBe(11);
	});

	// textString with spaces excluded...
	test("counts characters excluding spaces", () => {
		const myString = countCharacters("I love JEST", true);
		expect(myString).toBe(9);
	});

	// handles empty textStrings
	test("returns 0 for an empty textStrings", () => {
		const result = countCharacters("");
		expect(result).toBe(0);
	});

	// textString with only spaces
	test("returns 0 if all characters are blank spaces, and excludeSpaces is true", () => {
		const result = countCharacters("     ", true);
		expect(result).toBe(0);
	});

	test("handles special characters", () => {
		expect(countCharacters("Bye! @#$")).toBe(8);
	});
});

describe("Unit test cases for word count functionality", () => {
	// textString with a normal sentence...
	test("counts words in a sentence", () => {
		expect(countWords("Hello world")).toBe(2);
	});

	// textString with extra spaces between words...
	test("handles extra spaces between words", () => {
		expect(countWords("Hello     world")).toBe(2);
	});

	// textString with Leading and Trailing spaces...
	test("trims spaces at beginning and end", () => {
		expect(countWords("   Hello world   ")).toBe(2);
	});

	// textString with Empty Strings...
	test("returns 0 for an empty string", () => {
		expect(countWords("")).toBe(0);
	});

	// textString with tabs and newlines...
	test("handles tabs and newlines", () => {
		expect(countWords("Hello\nworld\tagain")).toBe(3);
	});
});

describe("unit test cases for sentence count functionality", () => {
	test("counts periods, exclamation marks, and question marks", () => {
		expect(countSentences("Hi. How are you? I'm fine!")).toBe(3);
	});

	test("ignores empty sentence segments", () => {
		expect(countSentences("Hello...")).toBe(1);
	});

	test("returns 0 for empty string", () => {
		expect(countSentences("")).toBe(0);
	});
});

describe("unit test cases for reading time functionality", () => {
	test("shows < 1 minute for short text", () => {
		expect(estimatedReadingTime(10)).toBe("< 1 minute");
	});

	test("rounds up to full minutes", () => {
		expect(estimatedReadingTime(25)).toBe("< 2 minutes");
	});

	test("handles 0 word count", () => {
		expect(estimatedReadingTime(0)).toBe("< 1 minute");
	});
});

describe("unit test cases for letter frequency functionality", () => {
	test("counts only A-Z letters", () => {
		expect(getLetterFrequency("AAB!!cc")).toEqual({ A: 2, B: 1, C: 2 });
	});

	test("is case-insensitive", () => {
		expect(getLetterFrequency("abcABC")).toEqual({ A: 2, B: 2, C: 2 });
	});

	test("returns empty object for no letters", () => {
		expect(getLetterFrequency("1234!")).toEqual({});
	});
});

describe("unit test cases for word count functionality", () => {
	const freqObj = { A: 5, B: 2, C: 8 };

	test("sorts frequencies in descending order", () => {
		expect(getSortedFrequencies(freqObj)).toEqual([
			["C", 8],
			["A", 5],
			["B", 2],
		]);
	});

	test("respects limit argument", () => {
		expect(getSortedFrequencies(freqObj, 2)).toEqual([
			["C", 8],
			["A", 5],
		]);
	});

	test("returns all if no limit provided", () => {
		expect(getSortedFrequencies(freqObj)).toHaveLength(3);
	});
});

// ---------------- DOM UPDATES ----------------
/**
 * @jest-environment jsdom
 */

const { fireEvent } = require("@testing-library/dom");

// Simulate your DOM update function
// function handleInput(text) {
function characterChanges(text) {
	document.getElementById("text-input").value = text;

	const charCount = countCharacters(text);
	const wordCount = countWords(text);
	const sentenceCount = countSentences(text);
	const reading = estimatedReadingTime(wordCount);

	document.getElementById(
		"char-count-value"
	).textContent = `Characters: ${charCount}`;
	document.getElementById(
		"word-count-value"
	).textContent = `Words: ${wordCount}`;
	document.getElementById(
		"sentence-count-value"
	).textContent = `Sentences: ${sentenceCount}`;
	document.getElementById(
		"reading-time"
	).textContent = `Estimated reading time: ${reading}`;

	const limitMessage = document.getElementById("limit-alert");
	if (charCount >= 500 && charCount < 600) {
		limitMessage.textContent = "Warning: You're nearing the character limit.";
	} else if (charCount >= 600) {
		limitMessage.textContent = "Character limit exceeded!";
	} else {
		limitMessage.textContent = "";
	}
}
describe("DOM Update Simulation...", () => {
	beforeEach(() => {
		document.body.innerHTML = `
    <textarea id="text-input"></textarea>
    <h3 id="char-count-value"></h3>
    <h3 id="word-count-value"></h3>
    <h3 id="sentence-count-value"></h3>
    <span id="reading-time"></span>
    <div id="limit-alert"></div>
  `;
	});

	test("updates all counters correctly", () => {
		const sampleText = "Hello world. This is a test!";
		characterChanges(sampleText);

		expect(document.getElementById("char-count-value").textContent).toBe(
			"Characters: 28"
		);
		expect(document.getElementById("word-count-value").textContent).toBe(
			"Words: 6"
		);
		expect(document.getElementById("sentence-count-value").textContent).toBe(
			"Sentences: 2"
		);
		expect(document.getElementById("reading-time").textContent).toBe(
			"Estimated reading time: < 1 minute"
		);
	});

	test("shows warning when character count is 500+", () => {
		const longText = "a".repeat(501);
		characterChanges(longText);

		expect(document.getElementById("limit-alert").textContent).toMatch(
			/nearing the character limit/i
		);
	});

	test("shows limit exceeded when character count hits 600", () => {
		const longText = "a".repeat(600);
		characterChanges(longText);

		expect(document.getElementById("limit-alert").textContent).toMatch(
			/limit exceeded/i
		);
	});

	test("clears warning when under 500 characters", () => {
		characterChanges("Short message");
		expect(document.getElementById("limit-alert").textContent).toBe("");
	});
});
