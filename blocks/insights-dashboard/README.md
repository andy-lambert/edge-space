# Insights Dashboard block

Renders a small KPI dashboard backed by JSON data served from `/tools/insights/sample.json`.

## Authoring
1. Add a new block table named `Insights Dashboard` (or `insights-dashboard`) in the page and leave its cells empty.
2. Publish `/tools/insights/sample.json` (or your own JSON at the same path) so the block can fetch it.
3. The block will display the generated timestamp, KPI cards, and a trends list from the JSON payload.

Sample data lives in `tools/insights/sample.json` and can be adjusted to match your needs. No additional scripting is required; the block fetches the JSON automatically.
