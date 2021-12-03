import * as core from "@actions/core";
import axios from "axios";

const BACKEND_API_URL = "https://dev.gantry.app/api";

// most @actions toolkit packages have async methods
async function run() {
  try {
    const authToken = core.getInput("authToken");

    const res = await axios.post(
      "/builds",
      {},
      {
        baseURL: BACKEND_API_URL,
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    core.info(`Created build ${res.data.id}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
    core.setFailed("Unknown failure");
  }
}

run();
