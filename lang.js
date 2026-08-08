// lang.js — language toggle for wuyong diorama sites

var KEY = "wuyong-lang";

function pageLangs() {
  var langs = {};
  document.querySelectorAll("article[lang]").forEach(function (el) {
    langs[el.getAttribute("lang")] = true;
  });
  if (Object.keys(langs).length === 0) {
    document.querySelectorAll("main > [lang]").forEach(function (el) {
      langs[el.getAttribute("lang")] = true;
    });
  }
  // index lists
  if (Object.keys(langs).length === 0) {
    document.querySelectorAll("ul[lang]").forEach(function (el) {
      langs[el.getAttribute("lang")] = true;
    });
  }
  return Object.keys(langs);
}

function allLangs() {
  var btns = document.querySelectorAll(".lang-toggle button[data-lang]");
  var langs = [];
  btns.forEach(function (b) {
    langs.push(b.getAttribute("data-lang"));
  });
  if (langs.length > 0) return langs;
  return pageLangs();
}

function getDefault() {
  var available = allLangs();
  // URL hash
  var hash = location.hash.replace("#", "");
  if (hash && available.indexOf(hash) !== -1) return hash;
  // localStorage
  try {
    var stored = localStorage.getItem(KEY);
    if (stored && available.indexOf(stored) !== -1) return stored;
  } catch (e) {}
  // browser language
  var nav = (navigator.language || "").slice(0, 2).toLowerCase();
  if (available.indexOf(nav) !== -1) return nav;
  // first available
  return available[0] || "en";
}

function setLang(lang, persist) {
  var available = pageLangs();
  if (available.length > 0 && available.indexOf(lang) === -1) {
    lang = available[0];
    persist = false;
  }
  // articles
  document.querySelectorAll("article[lang]").forEach(function (el) {
    el.classList.toggle("hidden", el.getAttribute("lang") !== lang);
  });
  // elements with lang attribute
  document
    .querySelectorAll("main [lang], footer [lang], button [lang]")
    .forEach(function (el) {
      el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    });
  document.querySelectorAll("main > [lang]").forEach(function (el) {
    el.style.display = el.getAttribute("lang") === lang ? "" : "none";
  });
  // index lists
  document.querySelectorAll("ul[lang]").forEach(function (el) {
    el.style.display = el.getAttribute("lang") === lang ? "" : "none";
  });
  // nav link spans
  document.querySelectorAll("nav ul a").forEach(function (a) {
    var spans = a.querySelectorAll("span[lang]");
    if (spans.length === 0) return;
    var match = a.querySelector('span[lang="' + lang + '"]');
    spans.forEach(function (s) {
      s.style.display = "none";
    });
    if (match) {
      match.style.display = "";
    } else {
      spans[0].style.display = "";
    }
  });
  // toggle buttons
  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
  if (persist !== false) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  // ambient play/pause
  var audio = document.getElementById("ambient");
  var ambientBtn = document.getElementById("ambient-play");
  if (audio && ambientBtn) {
    ambientBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        ambientBtn.classList.add("playing");
        ambientBtn.textContent = "pause";
      } else {
        audio.pause();
        ambientBtn.classList.remove("playing");
        ambientBtn.textContent = "enter";
      }
    });
  }

  setLang(getDefault());
});

// item audio play/pause
function toggleItemAudio(btn) {
  var section = btn.closest("section");
  var audio = section.querySelector(".item-audio");
  if (!audio) return;
  document.querySelectorAll(".item-play.playing").forEach(function (other) {
    if (other !== btn) {
      var otherAudio = other.closest("section").querySelector(".item-audio");
      if (otherAudio) otherAudio.pause();
      other.classList.remove("playing");
      other.innerHTML = "▶";
    }
  });
  if (audio.paused) {
    audio.play();
    btn.classList.add("playing");
    btn.innerHTML = "❚❚";
  } else {
    audio.pause();
    btn.classList.remove("playing");
    btn.innerHTML = "▶";
  }
  audio.onended = function () {
    btn.classList.remove("playing");
    btn.innerHTML = "▶";
  };
}
