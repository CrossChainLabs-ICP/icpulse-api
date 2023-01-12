const config = require("./config");
const { INFO } = require("./logs");
const {
  statistics,
  topContributors,
  commits,
  activeContributors,
  recentCommits,
  repositories,
  activity,
} = require("./api");

var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());

app.get("/statistics", statistics);
app.get("/top_contributors", topContributors);
app.get("/commits", commits);
app.get("/active_contributors", activeContributors);
app.get("/recent_commits", recentCommits);
app.get("/repositories", repositories);
app.get("/activity", activity);

app.listen(config.api.port, () => {
  INFO("Startup");
  INFO("ICPulse API running on port: " + config.api.port);
});
