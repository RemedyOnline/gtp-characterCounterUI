const {
	countCharacters,
	countWords,
	countSentences,
	estimatedReadingTime,
	getLetterFrequency,
	getSortedFrequencies,
} = require("../characterCounter.js");

// textString with spaces included...
describe("unit test cases for character count functionality", () => {
	// best case: textString in the input box...
	test("counts all characters including spaces", () => {
		let myString = countCharacters("Hello world");
		expect(myString).toBe(11);
	});

	// textString with spaces excluded...
	test("counts characters excluding spaces", () => {
		const myString = countCharacters("Hello world", true);
		expect(myString).toBe(10);
	});

	// handles empty textStrings
	test("returns 0 for an empty textStrings", () => {
		const result = countCharacters("");
		expect(result).toBe(0);
	});

	// textString with only spaces
	test("returns 0 if all characters are spaces and excludeSpaces is true", () => {
		const result = countCharacters("     ", true);
		expect(result).toBe(0);
	});

	test("handles special characters", () => {
		expect(countCharacters("hi! @#$")).toBe(7);
	});
});

describe("unit test cases for word count functionality", () => {
	// textString with a normal sentence...
	test("counts words in a regular sentence", () => {
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
