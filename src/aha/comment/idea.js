import { getPayload } from "#root/src/slack/chat/postMessage/comment/idea.js";

let _payload = getPayload(inputData);
export default { payload: JSON.stringify(_payload) };
