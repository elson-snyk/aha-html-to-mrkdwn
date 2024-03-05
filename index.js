const convert = require("./convert");

let html1 = `<div class="user-content"><p>First paragraph</p><p>Need to <i>check</i> where <strong>ownership</strong> <br /><br>of <strike>this</strike> landed in the <a href="https://snyk.io">new org</a> structure</p></div>`;

let html2 = `<div class="user-content"><p>Testing Slack integration, ignore this comment...</p><h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6><hr><p>Paragraph with <b>bold</b>, <i>italic</i> and <u>underline</u>. </p><p>Paragraph with <del>strikethrough</del>, <code>code</code> and <span style="color:#64b80a;">font color</span>.</p><p>Also a <a href="https://snyk.io">link</a>.</p><blockquote>Blockquote</blockquote><pre><code>Preformatted code block</code></pre><p>Bulleted lists</p><ul>
<li><p>First bullet</p></li>
<li><p>Another bullet</p></li>
</ul><p>Numbered lists</p><ol>
<li><p>First item</p></li>
<li><p>Second item</p></li>
</ol><p><small>Created in Jira by Matt Rogers (matt.rogers@snyk.io)</small></p><p><img width="600" height="371" src="https://snyk.aha.io/attachments/7321716574533077379/token/68c12a5ef9ef42cd1ef69acf6f2d87d6a4823d64d6ac998676a4b389eff079db.download?size=original"></p></div>`;

let html3 = `<div><div></div><div class="user-content"><p>Are there more details on the use case that customers are asking for so that we can ensure its linked to the right feature card?<br><br>cc <span data-linked-element-type="User">@Steve Winton</span> </p></div></div>`;

console.log(convert.mrkdwn(html1));
console.log(convert.mrkdwn(html2));
console.log(convert.mrkdwn(html3));
