document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            console.log("test");
            var x = document.getElementById("dev-projects")
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior : "smooth"
            });
        });
});

const toggleButton = document.getElementById("burger-menu");
const navBarLinks = document.getElementById("navbar-links");
toggleButton.addEventListener("click", () => {
    navBarLinks.classList.toggle("active");
});