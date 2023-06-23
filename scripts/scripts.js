// scrolling navbar anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            var x = document.getElementById("dev-projects")
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior : "smooth"
            });
        });
});

// burger menu show/hide functionality
const toggleButton = document.getElementById("burger-menu");
const navBarLinks = document.getElementById("navbar-links");
toggleButton.addEventListener("click", () => {
    navBarLinks.classList.toggle("active");
});


// mouse spotlight effect
const main = document.querySelectorAll("body");
main.forEach(main => {
    main.addEventListener('mousemove', (e) => {
        const rect = main.getBoundingClientRect();
        const left = e.clientX - rect.left;
        const top = e.clientY - rect.top;
    
        main.style.setProperty("--mouse-x", `${left}px`);
        main.style.setProperty("--mouse-y", `${top}px`);
    });
})