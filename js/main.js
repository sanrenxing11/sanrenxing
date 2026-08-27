/* ============================================================
   三人行电玩 - 全局脚本
   导航配置化渲染 + 教程/资源数据渲染 + 交互
   ============================================================ */

/* ---------- 导航配置（可扩展） ----------
 * 以后新增板块（如数码产品、其他内容），只需在此数组追加一项：
 * { name: "数码产品", href: "digital.html" }
 */
const NAV_ITEMS = [
  { name: "首页", href: "index.html" },
  { name: "教程", href: "tutorials.html" },
  { name: "资源", href: "resources.html" }
];

/* ---------- 教程数据（占位示例，便于后续替换） ---------- */
const TUTORIALS = [
  {
    title: "Switch 双系统使用教程",
    desc: "从开机到双系统切换，保姆级图文教程，新手必看。",
    tag: "入门",
    tagClass: "tag-blue",
    url: "https://v.douyin.com/GYnNlXyH6qg/"
  },
  {
    title: "电视连接教程",
    desc: "电视/显示器连接设置，从插线到画面一步步来。",
    tag: "入门",
    tagClass: "tag-blue",
    url: "tutorial-tv.html"
  },
  {
    title: "如何备份导入存档",
    desc: "游戏存档备份与导入全流程，换机、重装不丢进度。",
    tag: "进阶",
    tagClass: "",
    url: "tutorial-backup.html"
  },
  {
    title: "虚拟系统的游戏安装",
    desc: "在虚拟系统下正确安装游戏资源，畅玩无忧。",
    tag: "进阶",
    tagClass: "",
    url: "tutorial-install.html"
  },
  {
    title: "金手指汉化补丁及MOD的使用",
    desc: "金手指、汉化补丁与 MOD 的安装使用方法详解。",
    tag: "进阶",
    tagClass: "",
    url: "tutorial-cheats.html"
  },
  {
    title: "大气层整合包的更换和固件升级",
    desc: "大气层整合包更新与固件升级的正确姿势，避免变砖。",
    tag: "高级",
    tagClass: "tag-pink",
    url: "tutorial-update.html"
  },
  {
    title: "常见问题 FAQ",
    desc: "黑屏、报错、无法开机等常见问题的解决方案汇总。",
    tag: "FAQ",
    tagClass: "tag-pink"
  }
];

/* ---------- 资源数据（占位示例，便于后续替换） ---------- */
const RESOURCES = [
  {
    title: "固件资源",
    desc: "最新版本固件，下载即用。",
    tag: "固件",
    tagClass: "tag-blue",
    links: [
      { name: "大气层 1.11.2（百度网盘）", url: "https://pan.baidu.com/s/1auI7pmlX0vMooATS1lkjaw?pwd=3ren" }
    ]
  },
  {
    title: "金手指mod资源",
    desc: "金手指、MOD 等游戏修改资源整理，下载即用。",
    tag: "金手指",
    tagClass: "",
    warning: "金手指和主题美化导致的系统崩溃和游戏崩溃不在质保范围之内",
    links: [
      { name: "Gamer520", url: "https://www.gamer520.com/" },
      { name: "NS游戏源", url: "https://www.nsysyx.top/" },
      { name: "NS头号玩家", url: "https://nsthwj.com" },
      { name: "短链资源", url: "https://shorturl.at/PxmLU" },
      { name: "NS游戏源2", url: "https://ns.nsyxck.com" }
    ]
  },
  {
    title: "游戏资源",
    desc: "热门游戏资源整理，下载即用。",
    tag: "游戏",
    tagClass: "tag-pink",
    notice: "注意：那些要你发短信的是广告页面，直接后退或叉掉就行。",
    links: [
      { name: "Gamer520", url: "https://www.gamer520.com/" },
      { name: "NS游戏源", url: "https://www.nsysyx.top/" },
      { name: "NS头号玩家", url: "https://nsthwj.com" },
      { name: "短链资源", url: "https://shorturl.at/PxmLU" },
      { name: "NS游戏源2", url: "https://ns.nsyxck.com" }
    ]
  },
  {
    title: "主题与美化",
    desc: "主机主题、图标等美化资源，让主机更有个性。",
    tag: "美化",
    tagClass: "",
    warning: "金手指和主题美化导致的系统崩溃和游戏崩溃不在质保范围之内",
    links: [
      { name: "Themezer", url: "https://themezer.net" }
    ]
  }
];

/* ---------- 工具函数 ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- 渲染导航 ---------- */
function renderNav() {
  const navList = document.getElementById("navList");
  if (!navList) return;

  const current = location.pathname.split("/").pop() || "index.html";

  navList.innerHTML = NAV_ITEMS.map(function (item) {
    const active = item.href === current ? " active" : "";
    return '<li><a href="' + item.href + '" class="' + active + '">' +
      escapeHtml(item.name) + "</a></li>";
  }).join("");
}

/* ---------- 渲染教程列表 ---------- */
function renderTutorials() {
  const list = document.getElementById("tutorialList");
  if (!list) return;

  list.innerHTML = TUTORIALS.map(function (t) {
    // 有 url 的教程整卡可点击跳转到对应页面
    if (t.url) {
      // 外链（http/https 开头）在新窗口打开，站内页面保持原样
      var external = /^https?:\/\//.test(t.url);
      var linkAttrs = external ? ' target="_blank" rel="noopener"' : "";
      return (
        '<a class="tutorial-item tutorial-link" href="' + escapeHtml(t.url) + '"' + linkAttrs + '>' +
        '<span class="item-icon">📖</span>' +
        '<div class="item-body">' +
        "<h3>" + escapeHtml(t.title) + "</h3>" +
        "<p>" + escapeHtml(t.desc) + "</p>" +
        "</div>" +
        '<div class="item-meta"><span class="tag ' + t.tagClass + '">' +
        escapeHtml(t.tag) + "</span>" +
        '<span class="tutorial-go">查看教程 →</span></div>' +
        "</a>"
      );
    }
    return (
      '<article class="tutorial-item">' +
      '<span class="item-icon">📖</span>' +
      '<div class="item-body">' +
      "<h3>" + escapeHtml(t.title) + "</h3>" +
      "<p>" + escapeHtml(t.desc) + "</p>" +
      "</div>" +
      '<div class="item-meta"><span class="tag ' + t.tagClass + '">' +
      escapeHtml(t.tag) + "</span></div>" +
      "</article>"
    );
  }).join("");
}

/* ---------- 渲染资源列表 ---------- */
function renderResources() {
  const list = document.getElementById("resourceList");
  if (!list) return;

  list.innerHTML = RESOURCES.map(function (r) {
    const link = r.url
      ? '<a class="resource-link" href="' + escapeHtml(r.url) + '" target="_blank" rel="noopener">访问网站 →</a>'
      : "";
    const linksBtn = r.links
      ? '<button class="resource-link resource-btn" data-resource="' + escapeHtml(r.title) + '">查看资源 →</button>'
      : "";
    return (
      '<article class="resource-item">' +
      '<span class="item-icon">📦</span>' +
      '<div class="item-body">' +
      "<h3>" + escapeHtml(r.title) + "</h3>" +
      "<p>" + escapeHtml(r.desc) + "</p>" +
      "</div>" +
      '<div class="item-meta"><span class="tag ' + r.tagClass + '">' +
      escapeHtml(r.tag) + "</span>" + link + linksBtn + "</div>" +
      "</article>"
    );
  }).join("");
}

/* ---------- 移动端菜单交互 ---------- */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // 点击导航项后自动收起菜单
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- 页脚年份 ---------- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- 资源弹窗 ---------- */
function initResourceModal() {
  const modal = document.getElementById("resourceModal");
  const overlay = document.getElementById("modalOverlay");
  if (!modal || !overlay) return;

  const modalTitle = document.getElementById("modalTitle");
  const modalWarning = document.getElementById("modalWarning");
  const modalWarningText = document.getElementById("modalWarningText");
  const modalContent = document.getElementById("modalContent");
  const modalNotice = document.getElementById("modalNotice");
  const modalLinks = document.getElementById("modalLinks");
  const closeBtn = document.getElementById("modalClose");
  const confirmBtn = document.getElementById("modalConfirm");

  function openModal() {
    modal.classList.add("open");
    overlay.classList.add("open");
  }
  function closeModal() {
    modal.classList.remove("open");
    overlay.classList.remove("open");
  }

  // 点击「查看资源」按钮时打开弹窗
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".resource-btn");
    if (!btn) return;
    const title = btn.getAttribute("data-resource");
    const res = RESOURCES.find(function (r) {
      return r.title === title;
    });
    if (!res) return;

    modalTitle.textContent = res.title;
    modalNotice.textContent = res.notice || "";
    modalLinks.innerHTML = (res.links || [])
      .map(function (l) {
        return (
          '<a class="modal-link" href="' +
          escapeHtml(l.url) +
          '" target="_blank" rel="noopener">' +
          escapeHtml(l.name) +
          " →</a>"
        );
      })
      .join("");

    // 有警告则先显示警告，确认后才显示内容
    if (res.warning) {
      modalWarningText.textContent = res.warning;
      modalWarning.style.display = "block";
      modalContent.style.display = "none";
    } else {
      modalWarning.style.display = "none";
      modalContent.style.display = "block";
    }
    openModal();
  });

  // 点击「确认」认同警告后显示内容
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      modalWarning.style.display = "none";
      modalContent.style.display = "block";
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", function () {
  renderNav();
  renderTutorials();
  renderResources();
  initNavToggle();
  initResourceModal();
  initYear();
});
