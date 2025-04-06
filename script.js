const toggleBtn = document.getElementById("themeToggle");
const logo = document.getElementById("logo");

toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("darkMode");

	if (document.body.classList.contains("darkMode")) {
		logo.src = "./assets/images/logo-dark-theme.svg";
	} else {
		logo.src = "./assets/images/logo-light-theme.svg";
	}

	if (document.body.classList.contains("darkMode")) {
		themeToggle.src = "./assets/images/icon-sun.svg";
	} else {
		themeToggle.src = "./assets/images/icon-moon.svg";
	}
});
