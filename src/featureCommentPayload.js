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
  commentMrkdwn: "This is already achievable using CLI parameters:",
  commentImage:
    "https://snyk.aha.io/attachments/7343250026469379711/token/872463676fd92f298a6544d16e2f385c463d98377175a95449ccc04851b1727e.download?size=original",
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

// JSON payload
let _payload = {
  channel: inputData.slackChannel,
  text: `<@${inputData.commenterSlackID}> commented on Feature <${inputData.featureURL}|${inputData.featureReferenceNum}>`,
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
            text: inputData.commentMrkdwn,
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
if (!!inputData.commentImage) {
  _payload.attachments[0].blocks.splice(1, 0, {
    type: "image",
    image_url: inputData.commentImage,
    alt_text: "First image in comment",
  });
}

output = { payload: JSON.stringify(_payload) };

console.log(JSON.stringify(_payload, null, 2));
