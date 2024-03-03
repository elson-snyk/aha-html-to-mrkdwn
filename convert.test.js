const convert = require("./convert");

test("empty html string should be empty mrkdwn string", () => {
  expect(convert.mrkdwn("")).toBe('""');
});
