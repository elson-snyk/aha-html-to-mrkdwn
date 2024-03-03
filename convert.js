const rules = {
  div: {
    tags: ["div"],
    filter: "$3",
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
    filter: "*$3*",
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
      return html.replace(/<a href=(?:"|')(.*)(?:"|')>(.*?)<\/a>/gi, "<$1|$2>");
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

function genericTagFilter(html, tag, filter) {
  // Regex based on https://gist.github.com/gavin-asay/6cd089ca72b9810957254ec6a0cfced7
  // Capture groups: 1) tag name, 2) attributes, 3) tag contents
  let pattern = new RegExp(
    "<(" + tag + ")(\\s[^>]+)*(?:>(.*?)</\\1>|\\s?/>)",
    "gims"
  );
  return html.replace(pattern, filter);
}

function postProcess(output) {
  output = output.replace(/•\s\n(.*?)\n\n\n/g, "• $1\n"); // clean up list items with nested paragraphs
  output = output.trim();

  return JSON.stringify(output);
}

function mrkdwn(html) {
  let result = html;
  Object.keys(rules).forEach((rule) => {
    result = applyRule(rule, result);
  });

  return postProcess(result);
}

exports.mrkdwn = mrkdwn;
