export const rules = {
  // empty elements need to be stripped first
  _empty: {
    tags: ["\\w+"],
    filter: function (html) {
      return html.replace(/<(\w+)(\s[^>]+)*?>\s*?<\/\1>/gims, "");
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
