import { getPayload as getFeaturePayload } from "#root/src/slack/chat/postMessage/comment/feature.js";
import { getPayload as getIdeaPayload } from "#root/src/slack/chat/postMessage/comment/idea.js";
import { inputData as featureData } from "./fixtures/feature.data.js";
import { inputData as ideaData } from "./fixtures/idea.data.js";

let _featurePayload = getFeaturePayload(featureData);
let featureOutput = { payload: JSON.stringify(_featurePayload) };

let _ideaPayload = getIdeaPayload(ideaData);
let ideaOutput = { payload: JSON.stringify(_ideaPayload) };

// placeholder
test("payloads should not contain undefined", () => {
  expect(featureOutput.payload).not.toMatch(/undefined/);
  expect(ideaOutput.payload).not.toMatch(/undefined/);
});
