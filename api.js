const config = require("./config");
const { INFO, ERROR } = require("./logs");
const { Pool } = require("pg");

const pool = new Pool(config.database);

function errorResponse(code, msg, res) {
  res.status(code).send(msg);
}

const get = async function (query, view, predicate, res, log, single_line) {
  try {
    var result;
    if (predicate) {
      result = await pool.query(`SELECT ${query} FROM ${view} ${predicate};`);
    } else {
      result = await pool.query(`SELECT ${query} FROM ${view};`);
    }

    if (result.rows.length) {
      INFO(`GET[${log}]: ${JSON.stringify(result.rows.length)} results`);

      if (single_line) {
        res.json(result.rows[0]);
      } else {
        res.json(result.rows);
      }
    } else {
      ERROR(
        `GET[${log} ${query} on ${view}]: Failed, result: ${JSON.stringify(
          result.rows
        )}`
      );
      errorResponse(402, `Failed to get ${log}`, res);
    }
  } catch (e) {
    ERROR(`get[${log} ${query} on ${view}]: error: ${e}`);
    errorResponse(401, `failed to get ${log}`, res);
  }
};

const statistics = async function (req, res, next) {
  await get("*", "overview_view", "", res, "statistics", true);
};

const topContributors = async function (req, res, next) {
  await get(
    "*",
    "top_contributors_view",
    "ORDER BY contributions DESC",
    res,
    "topContributors",
    false
  );
};

const commits = async function (req, res, next) {
  await get(
    "*",
    "commits_view",
    "ORDER BY commit_month",
    res,
    "commits",
    false
  );
};

const activeContributors = async function (req, res, next) {
  await get(
    "*",
    "active_contributors_view",
    "ORDER BY month",
    res,
    "activeContributors",
    false
  );
};

const recentCommits = async function (req, res, next) {
  await get(
    "*",
    "recent_commits_view",
    "ORDER BY commit_date DESC LIMIT 1000",
    res,
    "recentCommits",
    false
  );
};

const repositories = async function (req, res, next) {
  await get(
    "*",
    "repositories_view",
    "ORDER BY month",
    res,
    "repositories",
    false
  );
};

const activity = async function (req, res, next) {
  await get(
    "*",
    "activity_view",
    "ORDER BY month",
    res,
    "activity",
    false
  );
};

const active_repos = async function (req, res, next) {
  await get(
    "*",
    "active_repositories_view",
    "ORDER BY month",
    res,
    "active_repos",
    false
  );
};

module.exports = {
  statistics,
  topContributors,
  commits,
  activeContributors,
  recentCommits,
  repositories,
  activity,
  active_repos,
};
