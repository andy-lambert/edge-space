const buildMockOutput = ({
  preview,
  intent,
  tone,
  constraints,
}) => {
  const normalizedPreview = preview || 'Not provided';
  const normalizedIntent = intent || 'general';
  const normalizedTone = tone || 'neutral';
  const normalizedConstraints = constraints || 'None specified.';

  const edits = [
    `Tighten the lead to match a ${normalizedTone} tone focused on the "${normalizedIntent}" goal.`,
    'Highlight the primary CTA once above the fold and once near the end of the page.',
    'Add a short bullets block that answers the top 3 reader questions.',
  ];

  return [
    `Preview: ${normalizedPreview}`,
    `Intent: ${normalizedIntent}`,
    `Tone: ${normalizedTone}`,
    `Constraints: ${normalizedConstraints}`,
    '',
    'Suggested edits:',
    ...edits.map((line, idx) => `${idx + 1}. ${line}`),
  ].join('\n');
};

const wireUpForm = () => {
  const form = document.getElementById('assist-form');
  const output = document.getElementById('output');
  const status = document.getElementById('status');
  const runBtn = document.getElementById('run-btn');

  if (!form || !output || !status || !runBtn) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runBtn.disabled = true;
    status.textContent = 'Running (mock)...';

    const formData = new FormData(form);
    const payload = {
      preview: formData.get('preview'),
      intent: formData.get('intent'),
      tone: formData.get('tone'),
      constraints: formData.get('constraints'),
    };

    window.setTimeout(() => {
      output.textContent = buildMockOutput(payload);
      status.textContent = 'Done (mocked response).';
      runBtn.disabled = false;
    }, 150);
  });
};

window.addEventListener('DOMContentLoaded', wireUpForm);
