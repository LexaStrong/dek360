/* ===== DEK360 — Videos Page Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  injectNav('videos');
  injectFooter();

  let currentCategory = 'All';
  let visibleCount = 6;
  const BATCH_SIZE = 6;

  function getVideos() {
    return JSON.parse(localStorage.getItem('dek360_videos') || '[]')
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderVideos() {
    const videos = getVideos();
    let filtered;
    if (currentCategory === 'YouTube') {
      filtered = videos.filter(v => v.isAuto);
    } else if (currentCategory === 'All') {
      filtered = videos;
    } else {
      filtered = videos.filter(v => v.category === currentCategory);
    }

    const grid = document.getElementById('videoGrid');

    // Add a sync status indicator if videos are automated
    const hasAuto = videos.some(v => v.isAuto);
    const headerP = document.querySelector('.page-header p');
    if (hasAuto && headerP && !document.querySelector('.sync-badge')) {
      const badge = document.createElement('span');
      badge.className = 'sync-badge';
      badge.innerHTML = '● Auto-Synced';
      badge.style = 'background: rgba(46, 213, 115, 0.2); color: #2ed573; padding: 4px 10px; border-radius: 20px; font-size: 12px; margin-left: 10px; border: 1px solid rgba(46, 213, 115, 0.3);';
      headerP.appendChild(badge);
    }

    const toShow = filtered.slice(0, visibleCount);

    if (toShow.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:var(--sp-3xl); color:var(--clr-text-muted);">No videos yet. Check back soon!</div>';
    } else {
      grid.innerHTML = toShow.map(v => `
        <div class="video-card ${v.isAuto ? 'auto-video' : ''}">
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${v.youtubeId}" title="${v.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-info">
            <h3>${v.title}</h3>
            <p>${v.isAuto ? '<span style="color:var(--clr-success);">● YouTube</span>' : v.category} · ${formatDate(v.date)}</p>
          </div>
        </div>
      `).join('');
    }

    // Update tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.cat === currentCategory);
    });

    // Load more button
    const existing = document.getElementById('loadMoreBtn');
    if (existing) existing.remove();

    if (filtered.length > visibleCount) {
      const loadMoreWrap = document.createElement('div');
      loadMoreWrap.style.cssText = 'text-align:center; margin-top:var(--sp-2xl);';
      loadMoreWrap.innerHTML = `<button id="loadMoreBtn" class="btn btn-secondary" onclick="loadMoreVideos()">Load More Videos (${filtered.length - visibleCount} remaining)</button>`;
      grid.parentElement.appendChild(loadMoreWrap);
    }
  }

  // Listen for live sync updates
  document.addEventListener('videosSynced', () => {
    renderVideos();
  });

  window.filterVideos = (cat) => {
    currentCategory = cat;
    visibleCount = BATCH_SIZE;
    renderVideos();
  };

  window.loadMoreVideos = () => {
    visibleCount += BATCH_SIZE;
    renderVideos();
  };

  renderVideos();
});
