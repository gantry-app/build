import * as core from '@actions/core';

// most @actions toolkit packages have async methods
async function run() {
  try {
    const authToken = core.getInput('authToken');
    core.info(`Got auth token with length ${authToken.length}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
    core.setFailed('Unknown failure')
  }
}

run();
