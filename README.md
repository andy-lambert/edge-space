# Splunk Blog EDS Migration — Edge Space Test Site

Pipeline testing and calibration site for Project Forge. This is an isolated EDS site used to validate pipeline output.

## Environments

- Preview: https://main--edge-space--andy-lambert.aem.page/
- Live: https://main--edge-space--andy-lambert.aem.live/

## Relationship to Hackathon Site

| | Production | Edge Space (this repo) |
|---|---|---|
| **Repo** | `Splunk-Project-Forge` | `edge-space` |
| **Owner** | `Adobe-Professional-Services` | `andy-lambert` |
| **Purpose** | Hackathon demo (June 1-5) | Pipeline testing & calibration |
| **Project Pack** | `splunk-project-forge` | `edge-space` |
| **Content** | Migrated Splunk blog articles | Test pages for block validation |
| **Merge policy** | PR review required | Direct merge OK for testing |

## Local Development

```sh
npm install
aem up
```

Opens local dev at `http://localhost:3000`.

## Linting

```sh
npm run lint
```

## Project Forge Integration

This repo is a delivery target for the Project Forge engine. Stories from the `edge-space` project pack produce code that lands here via feature branches and PRs.

Pipeline state is tracked in `.forge/` (gitignored in production; committed during pipeline test runs for observability).
