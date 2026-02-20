/* ===== DEK360 — Single Post Renderer ===== */

document.addEventListener('DOMContentLoaded', () => {
  injectNav('blog');
  injectFooter();

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  const container = document.getElementById('postContent');

  if (!postId) {
    container.innerHTML = '<p style="text-align:center; color:var(--clr-text-muted); padding:var(--sp-3xl);">Post not found. <a href="blog.html">← Back to Blog</a></p>';
    return;
  }

  const post = getPostById(postId);
  if (!post) {
    container.innerHTML = '<p style="text-align:center; color:var(--clr-text-muted); padding:var(--sp-3xl);">Post not found. <a href="blog.html">← Back to Blog</a></p>';
    return;
  }

  // Update page metadata
  document.title = `${post.title} — DEK360 Ghana`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', post.excerpt || '');

  // Calculate reading time (avg 200 words per minute)
  const wordCount = (post.body || '').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Share URLs
  const pageURL = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.title);
  const twitterShare = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageURL}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${pageURL}`;

  container.innerHTML = `
    <a href="blog.html" class="post-back-link">${ICONS.arrow_right} Back to Blog</a>
    <span class="post-category">${post.category}</span>
    <h1>${post.title}</h1>
    <div class="post-meta">
      <span>${ICONS.calendar}&nbsp;${formatDate(post.date)}</span>
      <span>${ICONS.clock}&nbsp;${readTime} min read</span>
    </div>
    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-hero-image" loading="lazy">` : ''}
    <div class="post-body">${post.body || '<p>Content coming soon.</p>'}</div>
    <div class="post-share-bar">
      <span class="post-share-label">${ICONS.share}&nbsp;Share this story:</span>
      <div class="post-share-links">
        <a href="${twitterShare}" target="_blank" rel="noopener" class="share-btn share-twitter" title="Share on X/Twitter">${ICONS.twitter}&nbsp;X</a>
        <a href="${facebookShare}" target="_blank" rel="noopener" class="share-btn share-facebook" title="Share on Facebook">${ICONS.facebook}&nbsp;Facebook</a>
        <button class="share-btn share-copy" onclick="copyPostLink()" title="Copy link">${ICONS.share}&nbsp;Copy Link</button>
      </div>
    </div>
  `;

  // Related posts
  const allPosts = JSON.parse(localStorage.getItem('dek360_posts') || '[]')
    .filter(p => p.published && p.id !== postId && p.category === post.category)
    .slice(0, 3);

  const relatedSection = document.getElementById('relatedPosts');
  if (allPosts.length > 0) {
    relatedSection.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>More in ${post.category}</h2>
          <p>Continue reading similar stories from DEK360 Ghana.</p>
        </div>
        <div class="grid-3">
          ${allPosts.map(p => `
            <a href="post.html?id=${p.id}" class="card" style="text-decoration:none; color:inherit;">
              <div class="card-image">
                <img src="${p.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'}" alt="${p.title}" loading="lazy">
                <span class="card-category">${p.category}</span>
              </div>
              <div class="card-body">
                <h3>${p.title}</h3>
                <p>${truncate(p.excerpt, 80)}</p>
                <div class="card-meta"><span>${formatDate(p.date)}</span><span>Read more →</span></div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    relatedSection.innerHTML = '';
  }
});

window.copyPostLink = function () {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Link copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Could not copy link.', 'error');
  });
};
