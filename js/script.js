document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const helloText = document.getElementById('hello-text');
    const helloTexts = [
        { text: "வணக்கம்", lang: "Tamil" },
        { text: "Привет", lang: "Russian" },
        { text: "नमस्ते", lang: "Hindi" },
        { text: "Bonjour", lang: "French" },
        { text: "Hola", lang: "Spanish" },
        { text: "Ciao", lang: "Italian" },
        { text: "こんにちは", lang: "Japanese" },
        { text: "안녕하세요", lang: "Korean" },
        { text: "你好", lang: "Chinese" },
        { text: "Hallo", lang: "German" },
        { text: "Olá", lang: "Portuguese" },
        { text: "مرحبا", lang: "Arabic" },
        { text: "Γεια σας", lang: "Greek" },
    ];
    let currentIndex = 0;
    let isGreetingShown = false;

    // Function to start the greeting sequence
    const startGreeting = () => {
        if (isGreetingShown) return; // Prevent greeting if already shown

        helloText.style.opacity = '0'; // Fade out the current text

        const updateHelloText = () => {
            helloText.style.opacity = '0';
            setTimeout(() => {
                helloText.textContent = helloTexts[currentIndex].text;
                helloText.style.opacity = '1';
                currentIndex = (currentIndex + 1) % helloTexts.length;
            }, 100); // Speed up the text transition
        };

        updateHelloText();
        const helloInterval = setInterval(updateHelloText, 100); // Speed up the greeting transition

        setTimeout(() => {
            clearInterval(helloInterval);
            loadingScreen.style.opacity = '0';
            mainContent.style.opacity = '1';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.classList.remove('overflow-hidden');
                isGreetingShown = true; // Mark greeting as shown
            }, 100);
        }, (helloTexts.length * 100) + 10); // Adjusted to match faster speed
    };

    // Check if it's the first visit to the homepage
    const isFirstVisit = sessionStorage.getItem('firstVisit') === null;

    if (isFirstVisit) {
        sessionStorage.setItem('firstVisit', 'true'); // Mark first visit
        startGreeting(); // Show greeting if it's the first visit
    } else {
        // Skip greeting if it's not the first visit
        loadingScreen.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        mainContent.style.opacity = '1';
    }

    // Handle navigation to prevent greeting when clicking on links or back-to-top
    const navigateToHome = () => {
        if (isGreetingShown) {
            // Do not show greeting if already visited
            loadingScreen.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
            mainContent.style.opacity = '1';
        }
    };

    // Example for Back to Top or home link (you can apply this to any relevant link)
    document.getElementById('back-to-top').addEventListener('click', () => {
        navigateToHome();
    });

    // You can also apply this to other links on the page to prevent greeting when navigating back
    document.querySelectorAll('a[href^="#"], a[href="/"]').forEach(anchor => {
        anchor.addEventListener('click', navigateToHome);
    });
});
