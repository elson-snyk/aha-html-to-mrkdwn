const convert = require("./convert");

// empty strings
test("empty html string should be empty mrkdwn string", () => {
  expect(convert.mrkdwn("")).toBe('""');
});

// whitespace
test("leading and trailing whitespace should be trimmed", () => {
  expect(convert.mrkdwn(" \n foo \n ")).toBe('"foo"');
  expect(convert.mrkdwn(" \n <p>foo</p> \n ")).toBe('"foo"');
});

// pararaphs
test("two new lines around p", () => {
  expect(convert.mrkdwn("<p>foo</p><p>bar</p>")).toBe('"foo\\n\\nbar"');
});

// headings
test("headingsshould be wrapped in asterix", () => {
  expect(convert.mrkdwn("<h1>foo</h1>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<h2>foo</h2>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<h3>foo</h3>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<h4>foo</h4>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<h5>foo</h5>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<h6>foo</h6>")).toBe('"*foo*"');
});

// strong and emphasis
test("strong and em should be wrapped in asterix", () => {
  expect(convert.mrkdwn("<strong>foo</strong>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<b>foo</b>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<em>foo</em>")).toBe('"*foo*"');
  expect(convert.mrkdwn("<i>foo</i>")).toBe('"*foo*"');
});

// strong and emphasis
test("strike should be wrapped in tilde", () => {
  expect(convert.mrkdwn("<strike>foo</strike>")).toBe('"~foo~"');
  expect(convert.mrkdwn("<del>foo</del>")).toBe('"~foo~"');
});

// inline code
test("inline code should be wrapped in backtick", () => {
  expect(convert.mrkdwn("<code>foo</code>")).toBe('"`foo`"');
});

// blockquotes
test("blockquotes should be prefixed with less than symbols", () => {
  expect(convert.mrkdwn("<blockquote>foo</blockquote>")).toBe('"> foo"');
});

// lists
test("unordered and ordered list elements should be stripped", () => {
  expect(convert.mrkdwn("<ol>foo</ol>")).toBe('"foo"');
  expect(convert.mrkdwn("<ul>foo</ul>")).toBe('"foo"');
});

test("list items should be prefixed with bullet symbols", () => {
  expect(convert.mrkdwn("<li>foo</li>")).toBe('"• foo"');
  expect(convert.mrkdwn("<li>foo</li><li>bar</li>")).toBe('"• foo\\n• bar"');
  expect(convert.mrkdwn("<li><p>foo</p></li>")).toBe('"• foo"');
  expect(convert.mrkdwn("<li><p>foo</p></li><li><p>bar</p></li>")).toBe(
    '"• foo\\n• bar"'
  );
});

// breaks
test("breaks should become new lines", () => {
  expect(convert.mrkdwn("foo<br>bar")).toBe('"foo\\nbar"');
  expect(convert.mrkdwn("foo<hr>bar")).toBe('"foo\\nbar"');
});

// images
test("images should be stripped", () => {
  expect(convert.mrkdwn('<img src="foo.jpg">')).toBe('""');
  expect(convert.mrkdwn('<img src="foo.jpg"/>')).toBe('""');
  expect(convert.mrkdwn('<img src="foo.jpg" />')).toBe('""');
  expect(convert.mrkdwn('<img src="foo.jpg" width="10" height="10">')).toBe(
    '""'
  );
});

// links
test("links should become mrkdwn links", () => {
  expect(convert.mrkdwn('<a href="https://www.bar.com/">foo</a>')).toBe(
    '"<https://www.bar.com/|foo>"'
  );
  expect(
    convert.mrkdwn('<a href="https://www.bar.com?key=value">foo</a>')
  ).toBe('"<https://www.bar.com?key=value|foo>"');
  expect(
    convert.mrkdwn('<a href="https://www.bar.com/" target="_blank">foo</a>')
  ).toBe('"<https://www.bar.com/|foo>"');
});

// other elements should be stripped
test("other elements should be stripped", () => {
  expect(convert.mrkdwn("<nonsense/>")).toBe('""');
  expect(convert.mrkdwn("<nonsense />")).toBe('""');
  expect(convert.mrkdwn("<nonsense></nonsense>")).toBe('""');
  expect(convert.mrkdwn("<div>foo</div>")).toBe('"foo"');
  expect(convert.mrkdwn("<div><div>foo</div></div>")).toBe('"foo"');
  expect(convert.mrkdwn('<div class="user-content">foo</div>')).toBe('"foo"');
  expect(convert.mrkdwn("<div><strong>foo</strong></div>")).toBe('"*foo*"');
});
