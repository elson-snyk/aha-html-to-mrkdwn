const rules = {
  // empty elements need to be stripped first
  _empty: {
    tags: ["\\w+"],
    filter: function (html) {
      return html.replace(emptyTagRegex(), "");
    },
  },
  paragraph: {
    tags: ["p"],
    filter: "\n$3\n",
  },
  heading: {
    tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
    filter: "\n*$3*\n",
  },
  strong: {
    tags: ["strong", "b"],
    filter: "*$3*",
  },
  emphasis: {
    tags: ["em", "i"],
    filter: "_$3_",
  },
  strike: {
    tags: ["del", "strike"],
    filter: "~$3~",
  },
  code: {
    tags: ["code"],
    filter: "`$3`",
  },
  // TODO - pre
  blockquote: {
    tags: ["blockquote"],
    filter: "> $3\n",
  },
  list: {
    tags: ["ul", "ol"],
    filter: "$3",
  },
  list_item: {
    tags: ["li"],
    filter: "• $3\n",
  },
  breaks: {
    tags: ["br", "hr"],
    filter: function (html) {
      return html.replace(/<[bh]r>/gi, "\n");
    },
  },
  img: {
    tags: ["img"],
    filter: function (html) {
      return html.replace(/<img.*?>/gi, "");
    },
  },
  link: {
    tags: ["a"],
    filter: function (html) {
      return html.replace(
        /<a href=(?:"|')(.*?)(?:"|').*?>(.*?)<\/a>/gi,
        "<$1|$2>"
      );
    },
  },
  _others: {
    tags: ["\\w+"],
    filter: "$3",
  },
};

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

function emptyTagRegex() {
  return new RegExp("<(\\w+)(\\s[^>]+)*?>\\s*?</\\1>", "gims");
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

export function mrkdwn(html) {
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
