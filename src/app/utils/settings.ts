export type Themes = "dark" | "light";
export class Theme {

  static getTheme() {
    return {
      dark: localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
      light: localStorage.getItem("color-theme") === "light" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches),
    };
  }

  static setTheme(theme: Themes) {
    localStorage.setItem("color-theme", theme);
  }

  static update(theme: Theme) {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  }

}

export function toggleHandler() {
    let [themeToggleDarkIcon, themeToggleLightIcon] = [
      document.getElementById("theme-toggle-dark-icon")!,
      document.getElementById("theme-toggle-light-icon")!
    ]

    if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle")!;

    themeToggleBtn.addEventListener("click", () => {

      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      Theme.update(Theme.getTheme());
    });
  }