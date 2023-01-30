import "./style.css";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const setActiveTab = (e) => {
  const tabName = e?.currentTarget?.getAttribute("data-tab");
  if (!tabName) {
    document
      .querySelectorAll(".left-section > .tab-content")
      .forEach((content) => {
        content.classList.remove("active");
      });
    const hr = document.querySelector(".tab > hr");
    const state = Flip.getState(hr);
    const tab = document.querySelector(".left-section > .tabs > .tab.active");
    tab.appendChild(hr);
    Flip.from(state, {
      duration: 1.25,
      absolute: true,
      ease: "elastic.out(1, 0.5)",
    });
    const tabName = tab?.getAttribute("data-tab");
    document.getElementById(tabName)?.classList.add("active");
    return;
  }

  const hr = document.querySelector(".tab.active > hr");
  const state = Flip.getState(hr);

  document.querySelectorAll(".left-section > .tabs > .tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  const currentTarget = e.currentTarget;

  currentTarget.classList.add("active");
  currentTarget.appendChild(hr);
  Flip.from(state, {
    duration: 1.25,
    absolute: true,
    ease: "elastic.out(1, 0.5)",
  });
  document
    .querySelectorAll(".left-section > .tab-content")
    .forEach((content) => {
      content.classList.remove("active");
    });
  document.getElementById(tabName).classList.add("active");
};
setActiveTab();

document.querySelectorAll(".left-section > .tabs > .tab").forEach((tab) => {
  tab.addEventListener("click", setActiveTab);
});
