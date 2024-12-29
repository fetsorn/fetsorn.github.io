window.addEventListener("DOMContentLoaded", () => {
  // fold icons
  const chapterToggles = Array.from(
    document.querySelectorAll(".chapter li > a.toggle div"),
  );

  chapterToggles.forEach((el) => {
    el.innerHTML = "&gt;";
    el.style.visibility = "visible";
  });

  // external links in the summary
  const chapterItems = Array.from(document.querySelectorAll(".chapter-item"));

  const lastChapter = chapterItems[chapterItems.length - 1];

  const links = [
    {
      title: "Source",
      url: 'https://codeberg.org/norcivilianlabs'
    },
    {
      title: "Blog",
      url: 'https://norcivilianlabs.substack.com'
    }
  ];

  if (lastChapter) {
    const extraLinks = links
      .map((link) => {
        return `<li class="chapter-item">
        <a href="${link.url}" rel="noreferrer" target="_blank">${link.title}</a>
      </li>`;
      })
      .join("");

    lastChapter.insertAdjacentHTML("afterend", extraLinks);
  }

  // translation
  window.gtranslateSettings = {
    default_language: "en",
    native_language_names: true,
    detect_browser_language: true,
    languages: ["zh-CN", "en", "hi", "es", "ar", "fr", "bn", "pt", "ru"],
    wrapper_selector: ".gtranslate_wrapper",
  };

  // insert at the end of the list of chapters
  lastChapter.parentElement.insertAdjacentHTML("beforeend", `<li class="chapter-item"><div class="gtranslate_wrapper"></div></li>`);

  const script = document.createElement("script");

  // script.setAttribute("src", "https://cdn.gtranslate.net/widgets/latest/ln.js");
  script.setAttribute("src", "https://cdn.gtranslate.net/widgets/latest/dropdown.js");

  document.head.appendChild(script);
});
