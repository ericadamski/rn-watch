const colorSet = [
  { color: "#994ff3" },
  { color: "#16161a" },
  { color: "#f9bc60" },
  { color: "#004643" },
  { color: "#2cb67d" },
  { color: "#abd1c6" },
  { color: "#e16162" },
  { color: "#d1d1e9" },
  { color: "#fffffe" },
];

const options = [
  ['Background Color', 'colorBackground'],
  ['Seconds Color', 'colorSeconds'],
  ['Time Color', 'colorTime'],
  ['Date Color', 'colorDate'],
  ['Steps Color', 'colorSteps'],
  ['Digital Clock Color', 'colorDigitalTime'],
];

function mySettings(props) {
  return (
    <Page>
      {options.map(([title, settingsKey]) =>
        <Section title={title}>
          <ColorSelect
            settingsKey={settingsKey}
            colors={colorSet}
          />
        </Section>
      )}
    </Page>
  );
}

registerSettingsPage(mySettings);
