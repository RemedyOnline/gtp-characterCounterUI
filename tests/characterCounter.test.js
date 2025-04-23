const sum = require("../sum.js");

test("sum of a and b", () => {
	expect(sum(2, 3)).toBe(5);
});
