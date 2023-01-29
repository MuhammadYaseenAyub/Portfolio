import "./style.css";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

document.querySelectorAll(".left-section > .tabs > .tab").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabName = e.currentTarget.getAttribute("data-tab");
    if (!tabName) return;

    const hr = document.querySelector(".tab.active > hr");
    const state = Flip.getState(hr);

    document.querySelectorAll(".left-section > .tabs > .tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    const currentTarget = e.currentTarget;

    currentTarget.classList.add("active");
    currentTarget.appendChild(hr);
    Flip.from(state, { duration: 1.25, absolute: true, ease: "elastic.out(1, 0.5)" });
    document
      .querySelectorAll(".left-section > .tab-content")
      .forEach((content) => {
        content.classList.remove("active");
      });
    document.getElementById(tabName).classList.add("active");
  });
});
