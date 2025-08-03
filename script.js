const screenData = {
  reflection: { file: 'reflection.html', title: 'Reflection' },
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
      screen.classList.add('screen-open');
      screen.style.display = 'flex';

      // ✅ Call accordion initializer ONLY if it's ind1
      if (screenName === 'ind1') {
        initAccordion();
      }
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


function initAccordion() {
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const content = item.querySelector('.accordion-content');

      if (item.classList.contains('active')) {
        // Collapse current
        content.style.maxHeight = null;
        item.classList.remove('active');
      } else {
        // Expand current only, without closing others
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}




