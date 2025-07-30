const screenData = {
  home: { file: 'home.html', title: 'Home' },
  jrp: { file: 'jrp.html', title: 'Job Role and Projects' },
  ind1: { file: 'ind1.html', title: 'IND1' },
  ind2: { file: 'ind2.html', title: 'IND2' },
};

function openScreen(screenName) {
  const screenInfo = screenData[screenName];
  if (!screenInfo) {
    console.error('Screen not found:', screenName);
    return;
  }

  // Set the screen title
  document.getElementById('screen-title').textContent = screenInfo.title;

  // Load the content via fetch
  fetch(screenInfo.file)
    .then(res => {
      if (!res.ok) throw new Error('Failed to load content.');
      return res.text();
    })
    .then(html => {
      document.getElementById('screen-content').innerHTML = html;
      const screen = document.getElementById('screen');
      screen.classList.add('screen-open'); // Show screen
      screen.style.display = 'flex';       // Trigger flex layout
    })
    .catch(err => {
      document.getElementById('screen-content').innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

function closeScreen() {
  const screen = document.getElementById('screen');
  screen.classList.remove('screen-open');
  screen.style.display = 'none';
  document.getElementById('screen-title').textContent = '';
  document.getElementById('screen-content').innerHTML = '';
}
