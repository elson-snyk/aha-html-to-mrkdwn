import { mrkdwn } from "#root/src/util/convert.js";

export function getPayload(data) {
  // get mrkdwn and first image
  let comment = mrkdwn(data["commentRaw"]);
  // JSON payload
  let _payload = {
    channel: data.slackChannel,
    text: `<@${data.commenterSlackID}> commented on Idea <${data.ideaURL}|${data.ideaReferenceNum}>`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${data.emoji} <@${data.commenterSlackID}> commented on Idea <${data.ideaURL}|${data.ideaReferenceNum}>`,
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
                text: data.ideaName,
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
            text: `*Status:*\n${data.ideaWorkflowStatusName}`,
          },
          {
            type: "mrkdwn",
            text: `*Votes:*\n${data.ideaVotes}`,
          },
          {
            type: "mrkdwn",
            text: `*Created by:*\n${data.creatorSlackID}`,
          },
          {
            type: "mrkdwn",
            text: `*Assigned to:*\n${data.assigneeSlackID}`,
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
              text: comment.text,
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "image",
                image_url: data.commenterSlackProfileImageURL,
                alt_text: data.commenterSlackRealName,
              },
              {
                type: "mrkdwn",
                text: data.commenterSlackRealName,
              },
              {
                type: "mrkdwn",
                text: `<!date^${data.commentUnixTimestamp}^Posted {date_short_pretty} at {time}^https://snyk.aha.io/${data.auditableType}s/${data.auditableID}|Posted ${data.auditCreatedAt}>`,
              },
              {
                type: "mrkdwn",
                text: `<https://snyk.aha.io/${data.auditableType}s/${data.auditableID}|View Aha! comment>`,
              },
            ],
          },
        ],
      },
    ],
  };

  // insert image if present
  if (!!comment.image) {
    _payload.attachments[0].blocks.splice(1, 0, {
      type: "image",
      image_url: comment.image,
      alt_text: "First image in comment",
    });
  }

  return _payload;
}
