/* ===== DEK360 — Videos Page Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  injectNav('videos');
  injectFooter();

  let currentCategory = 'All';

  function getVideos() {
    return JSON.parse(localStorage.getItem('dek360_videos') || '[]')
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderVideos() {
    const videos = getVideos();
    const filtered = currentCategory === 'All' ? videos : videos.filter(v => v.category === currentCategory || (currentCategory === 'YouTube' && v.isAuto));

    const grid = document.getElementById('videoGrid');

    // Add a sync status indicator if videos are automated
    const hasAuto = videos.some(v => v.isAuto);
    const headerP = document.querySelector('.page-header p');
    if (hasAuto && !document.querySelector('.sync-badge')) {
      const badge = document.createElement('span');
      badge.className = 'sync-badge';
      badge.innerHTML = '● Auto-Synced';
      badge.style = 'background: rgba(46, 213, 115, 0.2); color: #2ed573; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-left: 10px; border: 1px solid rgba(46, 213, 115, 0.3);';
      headerP.appendChild(badge);
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:var(--sp-3xl); color:var(--clr-text-muted);">No videos yet. Check back soon!</div>';
    } else {
      grid.innerHTML = filtered.map(v => `
        <div class="video-card ${v.isAuto ? 'auto-video' : ''}">
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${v.youtubeId}" title="${v.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-info">
            <h3>${v.title}</h3>
            <p>${v.isAuto ? 'YouTube' : v.category} · ${formatDate(v.date)}</p>
          </div>
        </div>
      `).join('');
    }

    // Update tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.cat === currentCategory);
    });
  }

  // Listen for live sync updates
  document.addEventListener('videosSynced', () => {
    renderVideos();
  });

  window.filterVideos = (cat) => {
    currentCategory = cat;
    renderVideos();
  };

  renderVideos();
});
