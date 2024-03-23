import { mrkdwn } from "../convert";

// fixture data
const inputData = {
  slackChannel: "C06MH3Y4SFM",
  commenterSlackID: "U02PYEC2DQR",
  featureURL: "https://snyk.aha.io/features/OPENSOURCE-179",
  featureReferenceNum: "OPENSOURCE-179",
  featureName: "Artifactory Gatekeeper plugin: additional ecosystem support",
  featureWorkflowStatusName: "Roadmap Candidate",
  featureReleaseReferenceNum: "ENGINE-R-5",
  creatorSlackID: "alida.sefada@snyk.io",
  assigneeSlackID: "alida.sefada@snyk.io",
  commentRaw: `<div class='user-content'><p><a href="https://snyk.aha.io/users/7247123586814665774" data-mce-href="https://snyk.aha.io/users/7247123586814665774" data-linked-element-type="User">@Phil Wise</a> the reason I was asking is because the only CN (which was promited to this feature) is <a href="https://snyk.aha.io/ideas/ideas/CN-I-9719?reference-class=Ideas%3A%3AIdea" data-mce-href="https://snyk.aha.io/ideas/ideas/CN-I-9719?reference-class=Ideas%3A%3AIdea" data-linked-element-type="Ideas::Idea" data-visible-fields="icon,ref"><i class="fa-solid fa-lightbulb aha-reference-icon"></i> CN-I-9719</a>, and it is labelled JS to UCT. It may be clearer to define the JS to UCT epic and the features within (if that is even possible?)</p></div>`,
  commenterSlackProfileImageURL:
    "https://avatars.slack-edge.com/2023-04-20/5144360817730_4a286c0e124cfa6e2e8d_24.jpg",
  commenterSlackRealName: "Tyler Fridley",
  commentUnixTimestamp: "1708612423",
  auditableType: "comment",
  auditableID: "7343250073705986848",
  auditCreatedAt: "2024-03-06T14:00:41.193Z",
  emoji: ":speech_balloon:",
  featureReleaseName: "2024 Priority",
};

let _comment = mrkdwn(inputData.commentRaw);

// JSON payload
let _payload = {
  channel: inputData.slackChannel,
  text: `<@${inputData["commenterSlackID"]}> commented on Feature <${inputData.featureURL}|${inputData.featureReferenceNum}>`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${inputData.emoji} <@${inputData.commenterSlackID}> commented on Feature <${inputData.featureURL}|${inputData.featureReferenceNum}>`,
      },
    },
    {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: inputData.featureName,
              style: {
                bold: true,
              },
            },
          ],
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Status:*\n${inputData.featureWorkflowStatusName}`,
        },
        {
          type: "mrkdwn",
          text: `*Release:*\n${inputData.featureReleaseReferenceNum} ${inputData.featureReleaseName}`,
        },
        {
          type: "mrkdwn",
          text: `*Created by:*\n${inputData.creatorSlackID}`,
        },
        {
          type: "mrkdwn",
          text: `*Assigned to:*\n${inputData.assigneeSlackID}`,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "\n\n",
      },
    },
  ],
  attachments: [
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: _comment.text,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "image",
              image_url: inputData.commenterSlackProfileImageURL,
              alt_text: inputData.commenterSlackRealName,
            },
            {
              type: "mrkdwn",
              text: inputData.commenterSlackRealName,
            },
            {
              type: "mrkdwn",
              text: `<!date^${inputData.commentUnixTimestamp}^Posted {date_short_pretty} at {time}^https://snyk.aha.io/${inputData.auditableType}s/${inputData.auditableID}|Posted ${inputData.auditCreatedAt}>`,
            },
            {
              type: "mrkdwn",
              text: `<https://snyk.aha.io/${inputData.auditableType}s/${inputData.auditableID}|View Aha! comment>`,
            },
          ],
        },
      ],
    },
  ],
};

// insert image if present
if (!!_comment.image) {
  _payload.attachments[0].blocks.splice(1, 0, {
    type: "image",
    image_url: _comment.image,
    alt_text: "First image in comment",
  });
}

export default { payload: JSON.stringify(_payload) };
