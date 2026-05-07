# Splunk Blog EDS Migration — Redux Test Site

Pipeline testing and calibration site for Project Forge. This is an isolated EDS site used to validate pipeline output before deploying to the production hackathon site.

## Environments

- Preview: https://main--splunk-project-forge-redux--adobe-professional-services.aem.page/
- Live: https://main--splunk-project-forge-redux--adobe-professional-services.aem.live/

## Relationship to Hackathon Site

| | Production | Redux (this repo) |
|---|---|---|
| **Repo** | `Splunk-Project-Forge` | `Splunk-Project-Forge-Redux` |
| **Purpose** | Hackathon demo (June 1-5) | Pipeline testing & calibration |
| **Project Pack** | `splunk-project-forge` | `splunk-project-forge-redux` |
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

This repo is a delivery target for the Project Forge engine. Stories from the `splunk-project-forge-redux` project pack produce code that lands here via feature branches and PRs.

Pipeline state is tracked in `.forge/` (gitignored in production; committed during pipeline test runs for observability).
