const DATA_URL = '/tools/insights/sample.json';

const formatTimestamp = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return 'Unavailable';
  return date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const buildKpiCard = ({ label, value, change }) => {
  const card = document.createElement('div');
  card.className = 'insights-dashboard__kpi-card';

  const title = document.createElement('p');
  title.className = 'insights-dashboard__kpi-label';
  title.textContent = label || 'KPI';

  const metric = document.createElement('p');
  metric.className = 'insights-dashboard__kpi-value';
  metric.textContent = value ?? '—';

  const delta = document.createElement('span');
  delta.className = 'insights-dashboard__kpi-change';
  const changeText = change ?? '';
  if (typeof changeText === 'string' && changeText.trim().startsWith('-')) {
    delta.classList.add('is-negative');
  } else if (changeText) {
    delta.classList.add('is-positive');
  }
  delta.textContent = changeText;

  card.append(title, metric);
  if (changeText) card.append(delta);

  return card;
};

const buildTrendItem = ({ title, detail }) => {
  const item = document.createElement('li');
  item.className = 'insights-dashboard__trend';

  const trendTitle = document.createElement('p');
  trendTitle.className = 'insights-dashboard__trend-title';
  trendTitle.textContent = title || 'Trend';

  if (detail) {
    const trendDetail = document.createElement('p');
    trendDetail.className = 'insights-dashboard__trend-detail';
    trendDetail.textContent = detail;
    item.append(trendTitle, trendDetail);
  } else {
    item.append(trendTitle);
  }

  return item;
};

const renderError = (block, message) => {
  block.innerHTML = '';
  block.classList.add('insights-dashboard', 'is-error');
  const error = document.createElement('p');
  error.className = 'insights-dashboard__error';
  error.textContent = message;
  block.append(error);
};

export default async function decorate(block) {
  block.innerHTML = '';

  let data;
  const dataUrl = window.hlx?.codeBasePath ? `${window.hlx.codeBasePath}${DATA_URL}` : DATA_URL;
  try {
    const resp = await fetch(dataUrl);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    data = await resp.json();
  } catch (error) {
    renderError(block, 'Unable to load insights data. Ensure /tools/insights/sample.json is published and reachable.');
    // eslint-disable-next-line no-console
    console.error('Insights dashboard fetch failed', error);
    return;
  }

  block.classList.add('insights-dashboard');
  const wrapper = document.createElement('div');
  wrapper.className = 'insights-dashboard__inner';

  const meta = document.createElement('div');
  meta.className = 'insights-dashboard__meta';
  const metaLabel = document.createElement('p');
  metaLabel.className = 'insights-dashboard__eyebrow';
  metaLabel.textContent = 'Insights Dashboard';
  const metaTimestamp = document.createElement('p');
  metaTimestamp.className = 'insights-dashboard__timestamp';
  metaTimestamp.textContent = `Generated ${formatTimestamp(data.generatedAt || data.generated_at)}`;
  meta.append(metaLabel, metaTimestamp);

  const kpiContainer = document.createElement('div');
  kpiContainer.className = 'insights-dashboard__kpis';
  if (Array.isArray(data.kpis) && data.kpis.length) {
    data.kpis.forEach((kpi) => kpiContainer.append(buildKpiCard(kpi)));
  } else {
    const empty = document.createElement('p');
    empty.className = 'insights-dashboard__empty';
    empty.textContent = 'No KPIs available in the data.';
    kpiContainer.append(empty);
  }

  const trendsContainer = document.createElement('div');
  trendsContainer.className = 'insights-dashboard__trends';
  const trendsTitle = document.createElement('p');
  trendsTitle.className = 'insights-dashboard__section-title';
  trendsTitle.textContent = 'Trends';
  trendsContainer.append(trendsTitle);

  if (Array.isArray(data.trends) && data.trends.length) {
    const trendsList = document.createElement('ul');
    trendsList.className = 'insights-dashboard__trends-list';
    data.trends.forEach((trend) => trendsList.append(buildTrendItem(trend)));
    trendsContainer.append(trendsList);
  } else {
    const emptyTrend = document.createElement('p');
    emptyTrend.className = 'insights-dashboard__empty';
    emptyTrend.textContent = 'No trends available in the data.';
    trendsContainer.append(emptyTrend);
  }

  wrapper.append(meta, kpiContainer, trendsContainer);
  block.append(wrapper);
}
