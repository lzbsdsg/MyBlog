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

  // ---- 文章卡片随机背景（与全站背景使用不同种子） ----
  function applyCardBackgrounds() {
    var cards = document.querySelectorAll('#recent-posts .recent-post-item');
    if (!cards.length || !IMG_POOL.length) return;

    // 使用页面路径哈希作为种子，与全站 daySeed 完全独立
    function hashPath(path) {
      var hash = 0;
      for (var i = 0; i < path.length; i++) {
        hash = ((hash << 5) - hash + path.charCodeAt(i)) | 0;
      }
      return Math.abs(hash);
    }

    // 预生成一组不重复的随机索引
    function shuffleIndices(count) {
      var indices = [];
      for (var i = 0; i < IMG_POOL.length; i++) indices.push(i);
      // Fisher-Yates 洗牌
      for (var j = indices.length - 1; j > 0; j--) {
        var k = ((count * 2654435761 + j * 340573) >>> 0) % (j + 1);
        var tmp = indices[j];
        indices[j] = indices[k];
        indices[k] = tmp;
      }
      return indices.slice(0, count);
    }

    var shuffled = shuffleIndices(cards.length);

    cards.forEach(function (card, i) {
      var coverEl = card.querySelector('.post_cover');
      var imgEl = card.querySelector('.post_cover img.post-bg');

      if (imgEl) {
        // 有封面图片：确保 CSS 全覆盖
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.objectFit = 'cover';
      } else {
        // 无封面：从图片池随机选取（使用独立种子）
        var idx = shuffled[i % shuffled.length];
        var imgUrl = '/images/' + IMG_POOL[idx];

        if (coverEl) {
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
      }
    });
  }

  // ---- 加载清单后统一应用 ----
  function initWithManifest() {
    applyGlobalBackground();
    applyCardBackgrounds();
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
      applyCardBackgrounds();
      initCardAnimation();
    }
  });
})();
