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
    tab?.appendChild(hr);
    Flip.from(state, {
      duration: 1.25,
      absolute: true,
      ease: "elastic.out(1, 0.5)",
    });
    const tabName = tab?.getAttribute("data-tab");
    document.getElementById(tabName)?.classList.add("active");
    return;
  }

  const hr = document.querySelector(".tab > hr");
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

const openModal = (e) => {
  const project = e.currentTarget;
  const overlay = document.querySelector(".overlay");
  const state = Flip.getState(project);
  overlay.appendChild(project);
  project.classList.toggle("active");
  Flip.from(state, {
    duration: 0.5,
    absolute: true,
    toggleClass: "flipping",
    onComplete: () => {
      gsap.to(".project-container.active > .project-detail", {
        duration: 1.5,
        opacity: 1,
      });
      gsap.to(".project-container.active", {
        duration: 0.5,
        padding: 50,
      });
      gsap.to(".overlay > button", {
        duration: 0.5,
        opacity: 1,
      });
    },
  });
  project.removeEventListener("click", openModal);
};

const closeModal = (e) => {
  const activeProject = document.querySelector(".project-container.active");
  const activeProjectOuterContainer = document.querySelector(
    ".project-outer-container:not(:has(.project-container))"
  );
  console.log(activeProjectOuterContainer);
  gsap.to(".project-container > .project-detail", {
    duration: 0.5,
    opacity: 0,
  });
  gsap.to(".project-container.active", {
    duration: 0,
    padding: 20,
  });
  gsap.to(".overlay > button", {
    duration: 0.5,
    opacity: 1,
  });
  const state = Flip.getState(activeProject);
  activeProjectOuterContainer.appendChild(activeProject);
  activeProject.classList.toggle("active");
  Flip.from(state, {
    duration: 0.5,
    absolute: true,
    toggleClass: "flipping",
  });
  activeProject.addEventListener("click", openModal);
};

document.querySelectorAll(".project-container").forEach((project) => {
  project.addEventListener("click", openModal);
});

document
  .querySelector(".overlay > button")
  .addEventListener("click", closeModal);

const resizeProjectOuterContainer = () => {
  const display = window.getComputedStyle(document.querySelector(".tab-content#projects")).display;
  if(display === "none") return;
  document
    .querySelectorAll(".project-outer-container")
    .forEach((projectOuterContainer) => {
      projectOuterContainer.style.minHeight = window.getComputedStyle(
        projectOuterContainer.firstElementChild
      ).height;
      projectOuterContainer.firstElementChild.style.height = "100%";
    });
};
window.onload = resizeProjectOuterContainer;
document.querySelector(".tab[data-tab='projects']").addEventListener("click", resizeProjectOuterContainer);
