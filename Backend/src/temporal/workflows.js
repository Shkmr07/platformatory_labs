const { proxyActivities } = require('@temporalio/workflow');
const { updateUserAndNotifyCrudCrud } = proxyActivities({
  startToCloseTimeout: '30 seconds',
});
async function updateUserProfileWorkflow(data) {
  await updateUserAndNotifyCrudCrud(data);
}
module.exports = { updateUserProfileWorkflow };