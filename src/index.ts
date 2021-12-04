import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";

const BACKEND_API_URL = "https://dev.gantry.app/api";

const { owner, repo } = github.context.repo;

// most @actions toolkit packages have async methods
async function run() {
  try {
    const authToken = core.getInput("authToken");

    try {
      const res = await axios.post(
        "/builds",
        {
          repository: `git@github.com:${owner}/${repo}`,
          sha: github.context.sha,
          params: {},
        },
        {
          baseURL: BACKEND_API_URL,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      core.info(`Created build ${res.data.id}`);
    } catch (err) {
      console.log((err as any)?.response?.data ?? err);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
    core.setFailed("Unknown failure");
  }
}

run();
