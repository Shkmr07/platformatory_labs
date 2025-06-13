const { Worker } = require('@temporalio/worker');
const path = require('path');
async function run() {
  const worker = await Worker.create({
    workflowsPath: path.join(__dirname, 'workflows'), // Ensure workflows folder exists
    activities: require('./activities'),               // Ensure activities.js exports functions
    taskQueue: 'user-profile-queue'
  });
  await worker.run();
}
run().catch(err => {
  console.error('Worker failed:', err);
});