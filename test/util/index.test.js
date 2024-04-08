import { convert } from '#root/src/util/convert.js';

// empty strings
test('empty html string should be empty convert string', () => {
  expect(convert('').text).toBe('');
});

// empty results
test('empty elements should be omitted', () => {
  expect(convert('<b></b>').text).toBe('');
  expect(convert('<b> </b>').text).toBe('');
  expect(convert('<b>  </b>').text).toBe('');
  expect(convert('<b>\n</b>').text).toBe('');
  expect(convert(' <b></b> ').text).toBe('');
});

// whitespace
test('leading and trailing whitespace should be trimmed', () => {
  expect(convert(' \n foo \n ').text).toBe('foo');
  expect(convert(' \n <p>foo</p> \n ').text).toBe('foo');
});

// pararaphs
test('two new lines around p', () => {
  expect(convert('<p>foo</p><p>bar</p>').text).toBe('foo\n\nbar');
});

// headings
test('headingsshould be wrapped in asterix', () => {
  expect(convert('<h1>foo</h1>').text).toBe('*foo*');
  expect(convert('<h2>foo</h2>').text).toBe('*foo*');
  expect(convert('<h3>foo</h3>').text).toBe('*foo*');
  expect(convert('<h4>foo</h4>').text).toBe('*foo*');
  expect(convert('<h5>foo</h5>').text).toBe('*foo*');
  expect(convert('<h6>foo</h6>').text).toBe('*foo*');
});

// strong
test('strong and b should be wrapped in asterix', () => {
  expect(convert('<strong>foo</strong>').text).toBe('*foo*');
  expect(convert('<b>foo</b>').text).toBe('*foo*');
});

// emphasis
test('em and i should be wrapped in underscore', () => {
  expect(convert('<em>foo</em>').text).toBe('_foo_');
  expect(convert('<i>foo</i>').text).toBe('_foo_');
});

// strike
test('strike should be wrapped in tilde', () => {
  expect(convert('<strike>foo</strike>').text).toBe('~foo~');
  expect(convert('<del>foo</del>').text).toBe('~foo~');
});

// inline code
test('inline code should be wrapped in backtick', () => {
  expect(convert('<code>foo</code>').text).toBe('`foo`');
});

// blockquotes
test('blockquotes should be prefixed with less than symbols', () => {
  expect(convert('<blockquote>foo</blockquote>').text).toBe('> foo');
});

// lists
test('unordered and ordered list elements should be stripped', () => {
  expect(convert('<ol>foo</ol>').text).toBe('foo');
  expect(convert('<ul>foo</ul>').text).toBe('foo');
});

test('list items should be prefixed with bullet symbols', () => {
  expect(convert('<li>foo</li>').text).toBe('• foo');
  expect(convert('<li>foo</li><li>bar</li>').text).toBe('• foo\n• bar');
  expect(convert('<li><p>foo</p></li>').text).toBe('• foo');
  expect(convert('<li><p>foo</p></li><li><p>bar</p></li>').text).toBe(
    '• foo\n• bar'
  );
});

// breaks
test('breaks should become new lines', () => {
  expect(convert('foo<br>bar').text).toBe('foo\nbar');
  expect(convert('foo<hr>bar').text).toBe('foo\nbar');
});

// images
test('images should be stripped', () => {
  expect(convert('<img src="foo.jpg">').text).toBe('');
  expect(convert('<img src="foo.jpg"/>').text).toBe('');
  expect(convert('<img src="foo.jpg" />').text).toBe('');
  expect(convert('<img src="foo.jpg" width="10" height="10">').text).toBe('');
});

// links
test('links should become convert links', () => {
  expect(convert('<a href="https://www.bar.com/">foo</a>').text).toBe(
    '<https://www.bar.com/|foo>'
  );
  expect(convert('<a href="https://www.bar.com?key=value">foo</a>').text).toBe(
    '<https://www.bar.com?key=value|foo>'
  );
  expect(
    convert('<a href="https://www.bar.com/" target="_blank">foo</a>').text
  ).toBe('<https://www.bar.com/|foo>');
  expect(
    convert(
      '<a href="https://www.foo.com/">foo</a> and <a href="https://www.bar.com/">bar</a>'
    ).text
  ).toBe('<https://www.foo.com/|foo> and <https://www.bar.com/|bar>');
});

// other elements should be stripped
test('other elements should be stripped', () => {
  expect(convert('<nonsense/>').text).toBe('');
  expect(convert('<nonsense />').text).toBe('');
  expect(convert('<nonsense></nonsense>').text).toBe('');
  expect(convert('<div>foo</div>').text).toBe('foo');
  expect(convert('<div class="user-content">foo</div>').text).toBe('foo');
  expect(convert('<div><strong>foo</strong></div>').text).toBe('*foo*');
  expect(
    convert(
      '<div><div><span data-linked-element-type="User">@Steve Winton</span></div></div>'
    ).text
  ).toBe('@Steve Winton');
});

// deeply nested elements
test('deeply nested elements should be handled', () => {
  expect(convert('<div><div>foo</div></div>').text).toBe('foo');
  expect(convert('<div><div><div>foo</div></div></div>').text).toBe('foo');
  expect(convert('<div><div><div><div>foo</div></div></div></div>').text).toBe(
    'foo'
  );
  expect(
    convert('<div><div><div><strong>foo</strong></div></div></div>').text
  ).toBe('*foo*');
});

// strings with no image should return empty string
test('strings with no image should return empty string', () => {
  expect(convert('').image).toBe('');
  expect(convert('<div>foo</div>').image).toBe('');
});

// first image
test('first image url should be extracted', () => {
  expect(convert('<img src="https://snyk.io/download.html">').image).toBe(
    'https://snyk.io/download.html'
  );
  expect(
    convert('<img src="https://snyk.io/download.html?size=original">').image
  ).toBe('https://snyk.io/download.html?size=original');
  expect(
    convert(
      '<img width="1222" height="453" src="https://snyk.io/download.html">'
    ).image
  ).toBe('https://snyk.io/download.html');
  expect(
    convert(
      '<img src="https://snyk.io/download.html" width="1222" height="453">'
    ).image
  ).toBe('https://snyk.io/download.html');
  expect(
    convert(
      '<div><img width="1222" height="453" src="https://snyk.io/download.html"></div>'
    ).image
  ).toBe('https://snyk.io/download.html');
  expect(
    convert(
      '<img width="1222" height="453" src="https://snyk.io/download.html">'
    ).image
  ).toBe('https://snyk.io/download.html');
  expect(
    convert(
      '<img width="1222" height="453" src="https://snyk.io/download.html"><img width="1222" height="453" src="https://snyk.io/other.html">'
    ).image
  ).toBe('https://snyk.io/download.html');
});
