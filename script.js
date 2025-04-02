const MY_WEBSITE = "Personal Website";
var currentSection = "home";

// Smooth scrolling and section toggling
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });

        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        showSection(targetId);
    });
});

function showSection(sectionId) {
    const sections = document.getElementsByClassName("container");
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add("hidden");
    }
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove("hidden");
        currentSection = sectionId;
    }
}

// Portfolio Functions
function compareWords() {
    let w1 = prompt("Enter word 1: ").trim();
    let w2 = prompt("Enter word 2: ").trim();
    if (!w1 || !w2) return alert("Please enter both words.");
    if (w1.length > w2.length) alert(`The longer word is "${w1}".`);
    else if (w1.length < w2.length) alert(`The longer word is "${w2}".`);
    else alert("Both words are equal in length.");
}

function performOperation() {
    let num1 = parseFloat(prompt("Enter number 1: "));
    let num2 = parseFloat(prompt("Enter number 2: "));
    let op = prompt("Enter operation: A (Add), S (Subtract), M (Multiply), D (Divide)").toLowerCase().trim();
    if (isNaN(num1) || isNaN(num2)) return alert("Invalid input! Please enter valid numbers.");
    switch (op) {
        case "a": alert(`${num1} + ${num2} = ${num1 + num2}`); break;
        case "s": alert(`${num1} - ${num2} = ${num1 - num2}`); break;
        case "m": alert(`${num1} * ${num2} = ${num1 * num2}`); break;
        case "d": num2 === 0 ? alert("Error: Division by 0.") : alert(`${num1} / ${num2} = ${num1 / num2}`); break;
        default: alert("Invalid operation.");
    }
}

function showBirthstone() {
    let month = prompt("Enter birth month (e.g., January):").toLowerCase().trim();
    if (!month) return alert("Please enter a valid month.");
    const birthstones = {
        "january": "Garnet", "february": "Amethyst", "march": "Aquamarine", "april": "Diamond",
        "may": "Emerald", "june": "Alexandrite & Pearl", "july": "Ruby", "august": "Peridot",
        "september": "Sapphire", "october": "Opal & Tourmaline", "november": "Citrine & Topaz",
        "december": "Blue Zircon, Turquoise & Tanzanite"
    };
    birthstones[month] ? alert(`Your birth month is ${month}, Your birthstone is ${birthstones[month]}`) : alert("Invalid month.");
}

function convertCelsiusToFahrenheit() {
    let celsius = parseFloat(prompt("Enter temperature in Celsius: "));
    if (isNaN(celsius)) return alert("Please enter a valid number.");
    let fahrenheit = celsius * 1.8 + 32;
    alert(`${celsius} degree Celsius is equal to ${fahrenheit.toFixed(2)} degree Fahrenheit`);
}

function computeAcceleration() {
    let velocity = parseFloat(prompt("Enter velocity (m/s): "));
    let time = parseFloat(prompt("Enter time (s): "));
    if (isNaN(velocity) || isNaN(time)) return alert("Please enter valid numbers.");
    if (time === 0) return alert("Error: Time cannot be 0.");
    let acceleration = velocity / time;
    alert(`Acceleration = ${acceleration.toFixed(2)} m/s²`);
}

// Favorites Functions
function toggleLike(element) {
    try {
        if (!element || !(element instanceof HTMLElement)) throw new Error("Invalid element provided");
        const img = element.querySelector('img');
        if (!img) throw new Error("Heart image not found");
        const artwork = element.closest('.artwork');
        if (!artwork) throw new Error("Artwork container not found");

        const isLiked = artwork.getAttribute('data-liked') === 'true';
        
        if (isLiked) {
            element.classList.remove('liked');
            artwork.setAttribute('data-liked', 'false');
            img.src = 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'; // Black outline heart
        } else {
            element.classList.add('liked');
            artwork.setAttribute('data-liked', 'true');
            img.src = 'https://scontent.fceb1-2.fna.fbcdn.net/v/t1.15752-9/387617409_733804601911466_4902706488157288925_n.png?stp=dst-png_s480x480&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGI78JB6MSvXSlg4bnUEWU9nYB8ubIL7cedgHy5sgvtx2Ea3zNXb6pee4g0L39-AJ_lfATsQwlM6XsvVK2PAURg&_nc_ohc=e2pa77VOVpEQ7kNvgEFGNp6&_nc_oc=AdlagJBKue4_7O4QojWIMb313-uPvX5-2AnEKaC1nOZMpP697oJ9Et5IYQOtgbbPhuQ&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fceb1-2.fna&oh=03_Q7cD1wHZL9nLZKAdJRidKzyoN2s6kaYxaKBt5l7Mxj28zI6x_Q&oe=681363F1'; // Red filled heart
        }
    } catch (error) {
        console.error("Error in toggleLike:", error);
        alert("An error occurred while toggling the like button. Please try again.");
    }
}

function addComment(element) {
    const commentInput = element.previousElementSibling;
    const commentText = commentInput.value.trim();
    const commentsList = element.closest('.comments-section').querySelector('.comments-list');
    const commentCount = parseInt(commentsList.getAttribute('data-comment-count'), 10);
    const maxComments = 5;

    if (commentText === '') return alert('Please enter a comment before posting.');
    if (commentCount >= maxComments) return alert('Maximum comment limit reached.');

    const newComment = document.createElement('li');
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
    commentsList.setAttribute('data-comment-count', commentCount + 1);
    commentInput.value = '';
}

// Carousel Functionality
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const destinationCards = document.querySelectorAll('.cards-container .card');
const cardsContainer = document.querySelector('.cards-container');
const heroSection = document.querySelector('.hero-section');
const slideCounter = document.querySelector('.slide-counter');
let currentIndex = 0;
const cardScrollAmount = 195;

function showSlide(index) {
    carouselItems.forEach((item, i) => {
        item.classList.remove('active');
        dots[i].classList.remove('active');
        destinationCards[i].classList.remove('active');
        if (i === index) {
            item.classList.add('active');
            dots[i].classList.add('active');
            destinationCards[i].classList.add('active');
            heroSection.style.backgroundImage = `url('${item.getAttribute('data-bg')}')`;
            slideCounter.textContent = String(i + 1).padStart(2, '0');
        }
    });
}

showSlide(currentIndex);

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
    cardsContainer.scrollBy({ left: cardScrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
    cardsContainer.scrollBy({ left: -cardScrollAmount, behavior: 'smooth' });
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        cardsContainer.scrollTo({ left: index * cardScrollAmount, behavior: 'smooth' });
    });
});

destinationCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentIndex = parseInt(card.getAttribute('data-index'));
        showSlide(currentIndex);
        cardsContainer.scrollTo({ left: index * cardScrollAmount, behavior: 'smooth' });
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
    cardsContainer.scrollBy({ left: cardScrollAmount, behavior: 'smooth' });
}, 5000);

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    showSection("home");
});

// Connect Discover buttons to Favorites section
document.querySelectorAll('.discover-btn').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target'); // Get target section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Smooth scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            const navLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
            if (navLink) navLink.classList.add('active');

            // Show the target section
            showSection(targetId);
        }
    });
});


function closeWindow() {
    try {
        self.close();
        if (!window.closed) {
            alert("This window cannot be closed programmatically because it wasn't opened by a script. Please close it manually using the browser's close button.");
        }
    } catch (error) {
        console.error("Error closing window:", error);
        alert("An error occurred while trying to close the window. Please close it manually.");
    }
}
