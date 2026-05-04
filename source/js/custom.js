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

  // ---- 全站背景 / 大图 / 页脚 ----
  function applyGlobalBackground() {
    const img = getBackgroundImage();
    setBg(document.getElementById('web_bg'), img);
    const header = document.getElementById('page-header');
    if (header && header.classList.contains('full_page')) {
      setBg(header, img);
      header.style.backgroundAttachment = 'fixed';
    }
    setBg(document.getElementById('footer'), img);
    // 404 页面背景
    const errorBg = document.querySelector('#error-wrap');
    if (errorBg) setBg(errorBg, img);
  }

  // ---- 错误图片随机 ----
  function applyErrorImages() {
    const imgs = document.querySelectorAll('img[src*="error"], img[src*="friend_404"]');
    imgs.forEach(function (img, i) {
      img.src = pickImage(Date.now() + i);
    });
  }

  // ---- 加载清单后统一应用 ----
  function initWithManifest() {
    applyGlobalBackground();
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
})();
