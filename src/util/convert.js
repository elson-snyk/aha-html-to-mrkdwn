import { rules } from "./rules";

function applyRule(rule, html) {
  const { tags, filter } = rules[rule];
  let result = html;
  tags.forEach((tag) => {
    if (typeof filter === "string") {
      result = genericTagFilter(result, tag, filter);
    } else if (typeof filter === "function") {
      result = filter.call(this, result);
    }
  });
  return result;
}

function genericTagRegex(tag) {
  // Regex based on https://gist.github.com/gavin-asay/6cd089ca72b9810957254ec6a0cfced7
  // Capture groups: 1) tag name, 2) attributes, 3) tag contents
  return new RegExp(
    "<(" + tag + ")(\\s[^>]+)*(?:>(.*?)</\\1>|\\s?/?>)",
    "gims"
  );
}

function genericTagFilter(html, tag, filter) {
  let pattern = genericTagRegex(tag);
  return html.replace(pattern, filter);
}

function firstImageUrl(html) {
  let image = html.match(/<img\s[^>]*src="(.*?)"/i);
  let url = image && image.length > 1 ? image[1] : "";

  return url;
}

function postProcess(output) {
  output = output.replace(/•\s\n(.*?)\n\n/g, "• $1\n"); // clean up list items with nested paragraphs
  output = output.trim();

  return JSON.parse(JSON.stringify(output));
}

export function mrkdwn(html = "") {
  let image = firstImageUrl(html);
  let text = html;
  // the basic regex approach used here can miss deeply nested elements
  // so we call the rules recursively while any elements remain
  while (genericTagRegex("\\w+").test(text)) {
    Object.keys(rules).forEach((rule) => {
      text = applyRule(rule, text);
    });
  }
  text = postProcess(text);

  return { text, image };
}
