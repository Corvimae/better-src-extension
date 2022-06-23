function log(content) {
  console.log('[Corvimae\'s Better SRC]', content);
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
          const span = document.createElement('span');
          span.textContent = attribute.replace(' place', '');

          rankCell.replaceChildren(span);
        }
      }
    });
  }
}

function applyStickyLeaderboardHeaderScrollLogic() {
  document.addEventListener('scroll', () => {
    const profileMenu = document.querySelector('#profile-menu');

    if (profileMenu.offsetTop > 0) {
      profileMenu.classList.add('profile-menu-sticky');
    } else {
      profileMenu.classList.remove('profile-menu-sticky');
    }
  });
}

function tagModeratorWidget() {
  const modWidgetTitle = [...document.querySelectorAll('.widget-title')].find(item => item.textContent === 'Moderators');

  if (modWidgetTitle) {
    modWidgetTitle.parentElement.parentElement.classList.add('moderator-widget');
  }
}

log(`Page type: ${2}`);

const pageType = getPageType();

document.body.classList.add(`src-page-${pageType}`);

switch (pageType) {
  case 'leaderboard':
    applyStickyLeaderboardHeaderScrollLogic();
    tagModeratorWidget();
    break;
}

hideCommentsWidget();

setInterval(() => {
  fixRecentRunsLabels();
}, 1000);

