const convert = require("./convert");

// empty strings
test("empty html string should be empty mrkdwn string", () => {
  expect(convert.mrkdwn("").text).toBe('""');
});

// empty results
test("empty elements should be omitted", () => {
  expect(convert.mrkdwn("<b></b>").text).toBe('""');
  expect(convert.mrkdwn("<b> </b>").text).toBe('""');
  expect(convert.mrkdwn("<b>  </b>").text).toBe('""');
  expect(convert.mrkdwn("<b>\n</b>").text).toBe('""');
  expect(convert.mrkdwn(" <b></b> ").text).toBe('""');
});

// whitespace
test("leading and trailing whitespace should be trimmed", () => {
  expect(convert.mrkdwn(" \n foo \n ").text).toBe('"foo"');
  expect(convert.mrkdwn(" \n <p>foo</p> \n ").text).toBe('"foo"');
});

// pararaphs
test("two new lines around p", () => {
  expect(convert.mrkdwn("<p>foo</p><p>bar</p>").text).toBe('"foo\\n\\nbar"');
});

// headings
test("headingsshould be wrapped in asterix", () => {
  expect(convert.mrkdwn("<h1>foo</h1>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<h2>foo</h2>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<h3>foo</h3>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<h4>foo</h4>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<h5>foo</h5>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<h6>foo</h6>").text).toBe('"*foo*"');
});

// strong
test("strong and b should be wrapped in asterix", () => {
  expect(convert.mrkdwn("<strong>foo</strong>").text).toBe('"*foo*"');
  expect(convert.mrkdwn("<b>foo</b>").text).toBe('"*foo*"');
});

// emphasis
test("em and i should be wrapped in underscore", () => {
  expect(convert.mrkdwn("<em>foo</em>").text).toBe('"_foo_"');
  expect(convert.mrkdwn("<i>foo</i>").text).toBe('"_foo_"');
});

// strike
test("strike should be wrapped in tilde", () => {
  expect(convert.mrkdwn("<strike>foo</strike>").text).toBe('"~foo~"');
  expect(convert.mrkdwn("<del>foo</del>").text).toBe('"~foo~"');
});

// inline code
test("inline code should be wrapped in backtick", () => {
  expect(convert.mrkdwn("<code>foo</code>").text).toBe('"`foo`"');
});

// blockquotes
test("blockquotes should be prefixed with less than symbols", () => {
  expect(convert.mrkdwn("<blockquote>foo</blockquote>").text).toBe('"> foo"');
});

// lists
test("unordered and ordered list elements should be stripped", () => {
  expect(convert.mrkdwn("<ol>foo</ol>").text).toBe('"foo"');
  expect(convert.mrkdwn("<ul>foo</ul>").text).toBe('"foo"');
});

test("list items should be prefixed with bullet symbols", () => {
  expect(convert.mrkdwn("<li>foo</li>").text).toBe('"• foo"');
  expect(convert.mrkdwn("<li>foo</li><li>bar</li>").text).toBe(
    '"• foo\\n• bar"'
  );
  expect(convert.mrkdwn("<li><p>foo</p></li>").text).toBe('"• foo"');
  expect(convert.mrkdwn("<li><p>foo</p></li><li><p>bar</p></li>").text).toBe(
    '"• foo\\n• bar"'
  );
});

// breaks
test("breaks should become new lines", () => {
  expect(convert.mrkdwn("foo<br>bar").text).toBe('"foo\\nbar"');
  expect(convert.mrkdwn("foo<hr>bar").text).toBe('"foo\\nbar"');
});

// images
test("images should be stripped", () => {
  expect(convert.mrkdwn('<img src="foo.jpg">').text).toBe('""');
  expect(convert.mrkdwn('<img src="foo.jpg"/>').text).toBe('""');
  expect(convert.mrkdwn('<img src="foo.jpg" />').text).toBe('""');
  expect(
    convert.mrkdwn('<img src="foo.jpg" width="10" height="10">').text
  ).toBe('""');
});

// links
test("links should become mrkdwn links", () => {
  expect(convert.mrkdwn('<a href="https://www.bar.com/">foo</a>').text).toBe(
    '"<https://www.bar.com/|foo>"'
  );
  expect(
    convert.mrkdwn('<a href="https://www.bar.com?key=value">foo</a>').text
  ).toBe('"<https://www.bar.com?key=value|foo>"');
  expect(
    convert.mrkdwn('<a href="https://www.bar.com/" target="_blank">foo</a>')
      .text
  ).toBe('"<https://www.bar.com/|foo>"');
});

// other elements should be stripped
test("other elements should be stripped", () => {
  expect(convert.mrkdwn("<nonsense/>").text).toBe('""');
  expect(convert.mrkdwn("<nonsense />").text).toBe('""');
  expect(convert.mrkdwn("<nonsense></nonsense>").text).toBe('""');
  expect(convert.mrkdwn("<div>foo</div>").text).toBe('"foo"');
  expect(convert.mrkdwn('<div class="user-content">foo</div>').text).toBe(
    '"foo"'
  );
  expect(convert.mrkdwn("<div><strong>foo</strong></div>").text).toBe(
    '"*foo*"'
  );
  expect(
    convert.mrkdwn(
      '<div><div><span data-linked-element-type="User">@Steve Winton</span></div></div>'
    ).text
  ).toBe('"@Steve Winton"');
});

// deeply nested elements
test("deeply nested elements should be handled", () => {
  expect(convert.mrkdwn("<div><div>foo</div></div>").text).toBe('"foo"');
  expect(convert.mrkdwn("<div><div><div>foo</div></div></div>").text).toBe(
    '"foo"'
  );
  expect(
    convert.mrkdwn("<div><div><div><div>foo</div></div></div></div>").text
  ).toBe('"foo"');
  expect(
    convert.mrkdwn("<div><div><div><strong>foo</strong></div></div></div>").text
  ).toBe('"*foo*"');
});

// strings with no image should return empty string
test("strings with no image should return empty string", () => {
  expect(convert.mrkdwn("").image).toBe("");
  expect(convert.mrkdwn("<div>foo</div>").image).toBe("");
});

// first image
test("first image url should be extracted", () => {
  expect(
    convert.mrkdwn('<img src="https://snyk.io/download.html">').image
  ).toBe("https://snyk.io/download.html");
  expect(
    convert.mrkdwn('<img src="https://snyk.io/download.html?size=original">')
      .image
  ).toBe("https://snyk.io/download.html?size=original");
  expect(
    convert.mrkdwn(
      '<img width="1222" height="453" src="https://snyk.io/download.html">'
    ).image
  ).toBe("https://snyk.io/download.html");
  expect(
    convert.mrkdwn(
      '<img src="https://snyk.io/download.html" width="1222" height="453">'
    ).image
  ).toBe("https://snyk.io/download.html");
  expect(
    convert.mrkdwn(
      '<div><img width="1222" height="453" src="https://snyk.io/download.html"></div>'
    ).image
  ).toBe("https://snyk.io/download.html");
  expect(
    convert.mrkdwn(
      '<img width="1222" height="453" src="https://snyk.io/download.html">'
    ).image
  ).toBe("https://snyk.io/download.html");
  expect(
    convert.mrkdwn(
      '<img width="1222" height="453" src="https://snyk.io/download.html"><img width="1222" height="453" src="https://snyk.io/other.html">'
    ).image
  ).toBe("https://snyk.io/download.html");
});
