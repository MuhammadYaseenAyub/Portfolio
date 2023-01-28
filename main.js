import "./style.css";

document.querySelectorAll(".left-section > .tabs > .tab").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabName = e.currentTarget.getAttribute("data-tab");
    console.log({tabName, e})
    if(!tabName) return;
    document
      .querySelectorAll(".left-section > .tabs > .tab")
      .forEach((tab) => {
        tab.classList.remove("active");
      });
    e.currentTarget.classList.add("active");
    document
      .querySelectorAll(".left-section > .tab-content")
      .forEach((content) => {
        content.classList.remove("active");
      });
      console.log(`[data-tab=${tabName}]`)
    document.getElementById(tabName).classList.add("active");
  });
});
