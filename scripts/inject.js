function log(content) {
  console.log('[Corvimae\'s Better SRC]', content);
}

function injectCSS(filename) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = browser.runtime.getURL(`styles/${filename}`);

  document.head.appendChild(style);
  log(`Injected ${filename}.`);
}

function getWidget(name) {
  return document.querySelector(`div[component-name="${name}"]`);
}

function getPageType() {
  if (document.querySelector('.game-info-container') && document.querySelector('#leaderboardform')) {
    return 'leaderboard';
  }
  
  return 'other';
}

function hideCommentsWidget() {
  
  const widget = getWidget('CommentsWidget');

  if (widget) {
    log('Hiding comments widget...');
    widget.style.display = 'none';
  }
}

function fixRecentRunsLabels() {
  const widget = getWidget('GameRecentRunsSidebar');
  
  if (widget) {
    log('Fixing recent run labels...');
    [...widget.querySelectorAll(".leaderboard-row td:first-child")].forEach(rankCell => {
      const rankImage = rankCell.querySelector("img");

      if (rankImage) {
        const attribute = rankImage.getAttribute('alt');

        if (attribute) {
          rankCell.innerHTML = `<span>${attribute.replace(' place', '')}</span>`;
        }
      }
    });
  }
}

log(`Determining what stylesheets to inject (page type: ${2})...`);
const pageType = getPageType();


switch (pageType) {
  case 'leaderboard':
    injectCSS('leaderboard-page.css');
    break;
}

hideCommentsWidget();

setInterval(() => {
  fixRecentRunsLabels();
}, 1000);

