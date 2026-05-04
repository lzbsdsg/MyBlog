// Butterfly 主题自定义脚本

(function () {
  'use strict';

  // ---- 图片池（构建时自动生成清单，前端读取） ----
  let IMG_POOL = [];

  // 确定性随机：同一个 seed 永远选同一张图
  function pickImage(seed) {
    if (!IMG_POOL.length) return '/images/picture1.png';
    const hash = ((seed * 2654435761) >>> 0) % IMG_POOL.length;
    return '/images/' + IMG_POOL[hash];
  }

  // 背景图：每 3 天换一张（全站统一）
  function getBackgroundImage() {
    const daySeed = Math.floor(Date.now() / (3 * 24 * 60 * 60 * 1000));
    return pickImage(daySeed);
  }

  // 设置元素背景（自适应）
  function setBg(el, img) {
    if (!el) return;
    el.style.backgroundImage = 'url(' + img + ')';
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center center';
    el.style.backgroundRepeat = 'no-repeat';
  }

  // 预加载图片，加载完成后再应用（避免跳动）
  function setBgPreload(el, img) {
    if (!el) return;
    var tester = new Image();
    tester.onload = function () {
      el.style.backgroundImage = 'url(' + img + ')';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center center';
      el.style.backgroundRepeat = 'no-repeat';
    };
    tester.src = img;
  }

  // ---- 路径哈希（确定性，同一路径永远同图） ----
  function hashPath(path) {
    var hash = 0;
    for (var i = 0; i < path.length; i++) {
      hash = ((hash << 5) - hash + path.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  // ---- 全站背景 / 大图 / 页脚 ----
  function applyGlobalBackground() {
    var globalImg = getBackgroundImage();
    // 全站背景 / 页脚 / 404 使用统一的全站背景
    setBg(document.getElementById('web_bg'), globalImg);
    setBg(document.getElementById('footer'), globalImg);
    var errorBg = document.querySelector('#error-wrap');
    if (errorBg) setBg(errorBg, globalImg);

    // 页面 header：根据当前路径选取独立随机图
    var header = document.getElementById('page-header');
    if (!header || !IMG_POOL.length) return;

    var path = window.location.pathname;
    var seed = hashPath(path);
    var img = pickImage(seed);

    // 首页大图使用全站背景（与 web_bg 一致）
    var targetImg = header.classList.contains('full_page') ? globalImg : img;

    // 预加载完成后再替换（避免跳动）
    setBgPreload(header, targetImg);
  }

  // ---- 上一篇/下一篇封面背景（与卡片一致） ----
  function applyPaginationCovers() {
    var navs = document.querySelectorAll('.pagination-related');
    if (!navs.length || !IMG_POOL.length) return;

    navs.forEach(function (nav) {
      var link = nav.getAttribute('href') || '';
      var seed = hashPath(link);
      var imgUrl = pickImage(seed);

      var imgCover = nav.querySelector('img.cover');
      var divCover = nav.querySelector('div.cover');

      if (imgCover) {
        imgCover.src = imgUrl;
        imgCover.style.objectFit = 'cover';
        imgCover.style.width = '100%';
        imgCover.style.height = '100%';
      } else if (divCover) {
        divCover.style.backgroundImage = 'url(' + imgUrl + ')';
        divCover.style.backgroundSize = 'cover';
        divCover.style.backgroundPosition = 'center';
        divCover.style.width = '100%';
        divCover.style.height = '100%';
      } else {
        // 没有 cover 元素，给整个导航块加背景
        nav.style.backgroundImage = 'url(' + imgUrl + ')';
        nav.style.backgroundSize = 'cover';
        nav.style.backgroundPosition = 'center';
      }
    });
  }

  // ---- 错误图片随机 ----
  function applyErrorImages() {
    const imgs = document.querySelectorAll('img[src*="error"], img[src*="friend_404"]');
    imgs.forEach(function (img, i) {
      img.src = pickImage(Date.now() + i);
    });
  }

  // ---- 文章卡片随机背景（与详情页 header 共用路径哈希） ----
  function applyCardBackgrounds() {
    var cards = document.querySelectorAll('#recent-posts .recent-post-item');
    if (!cards.length || !IMG_POOL.length) return;

    cards.forEach(function (card) {
      var coverEl = card.querySelector('.post_cover');
      var imgEl = card.querySelector('.post_cover img.post-bg');

      // 从卡片链接中提取文章路径
      var linkEl = card.querySelector('.article-title') || card.querySelector('a[href]');
      var path = linkEl ? linkEl.getAttribute('href') : '';
      var seed = hashPath(path);
      var imgUrl = pickImage(seed);

      if (imgEl) {
        // 有封面图片：替换为路径哈希对应的图（与详情页一致）
        imgEl.src = imgUrl;
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.objectFit = 'cover';
      } else if (coverEl) {
        // 有 .post_cover 但里面是 div（颜色背景），替换为图片
        var divBg = coverEl.querySelector('div.post-bg');
        if (divBg) {
          divBg.style.backgroundImage = 'url(' + imgUrl + ')';
          divBg.style.backgroundSize = 'cover';
          divBg.style.backgroundPosition = 'center';
          divBg.style.width = '100%';
          divBg.style.height = '100%';
        }
      } else {
        // 完全没有 .post_cover，直接给卡片加背景
        card.style.backgroundImage = 'url(' + imgUrl + ')';
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.backgroundRepeat = 'no-repeat';
        card.classList.add('no-cover-bg');
      }
    });
  }

  // ---- 加载清单后统一应用 ----
  function initWithManifest() {
    applyGlobalBackground();
    applyCardBackgrounds();
    applyPaginationCovers();
    applyErrorImages();
  }

  function initAll() {
    fetch('/images/manifest.json')
      .then(function (r) { return r.json(); })
      .then(function (list) {
        IMG_POOL = list;
        initWithManifest();
      })
      .catch(function () {
        IMG_POOL = ['picture1.png'];
        initWithManifest();
      });
  }

  // 图片懒加载完成后淡入
  function initImageFade() {
    var observer = new MutationObserver(function () {
      document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
        if (img.complete && !img.classList.contains('loaded')) {
          img.classList.add('loaded');
        } else {
          img.addEventListener('load', function () { img.classList.add('loaded'); }, { once: true });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      if (img.complete) img.classList.add('loaded');
      else img.addEventListener('load', function () { img.classList.add('loaded'); }, { once: true });
    });
  }

  // 文章卡片入场动画
  function initCardAnimation() {
    var posts = document.querySelectorAll('#recent-posts .recent-post-item');
    if (!posts.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i * 0.08) + 's';
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    posts.forEach(function (post) {
      post.classList.add('card-hidden');
      observer.observe(post);
    });
  }

  // 鼠标视差（仅首页大图）
  function initParallax() {
    var header = document.getElementById('page-header');
    if (!header || !header.classList.contains('full_page')) return;
    var ticking = false;
    document.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var x = (e.clientX / window.innerWidth - 0.5) * 8;
        var y = (e.clientY / window.innerHeight - 0.5) * 8;
        header.style.backgroundPosition = 'calc(50% + ' + x + 'px) calc(50% + ' + y + 'px)';
        ticking = false;
      });
    });
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', function () {
    initAll();
    initImageFade();
    initCardAnimation();
    initParallax();
  });

  // PJAX 导航后重新应用
  document.addEventListener('pjax:complete', function () {
    if (IMG_POOL.length) {
      applyGlobalBackground();
      applyCardBackgrounds();
      applyPaginationCovers();
      initCardAnimation();
    }
  });
})();
