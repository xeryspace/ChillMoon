// ChillMoon Peek System
class ChillMoonPeekSystem {
    constructor() {
        this.moonQuotes = [
            "To the moon! 🚀",
            "Feeling chill up here!",
            "Moon vibes only ✨",
            "Join the lunar party!",
            "ChillMoon is the way!",
            "Cosmic dreams ahead!",
            "Moonlight feels good!",
            "Ready for liftoff?",
            "Space is so chill!",
            "Moon gang unite!"
        ];

        this.cloudQuotes = [
            "Floating on clouds!",
            "Sky high vibes!",
            "Cloud surfing time!",
            "Fluffy and chill!",
            "Above the clouds!",
            "Sky's the limit!",
            "Cloud nine feels!",
            "Drifting peacefully!",
            "Cloud hopping fun!",
            "Heavenly vibes!"
        ];

        this.sectionQuotes = {
            about: [
                "Learn about me!",
                "ChillMoon story time!",
                "Get to know us!"
            ],
            exchanges: [
                "Trade me everywhere!",
                "Available globally!",
                "Find me on exchanges!"
            ],
            tokenomics: [
                "Simple tokenomics!",
                "Fair distribution!",
                "Community first!"
            ],
            'how-to-buy': [
                "Easy to join!",
                "Get your ChillMoon!",
                "Join the mission!"
            ]
        };

        this.activePeeks = new Set();
        this.lastPeekTime = 0;
        this.minInterval = 3000; // Minimum 3 seconds between peeks
        this.maxInterval = 8000; // Maximum 8 seconds between peeks
        
        this.init();
    }

    init() {
        // Wait for page load
        window.addEventListener('load', () => {
            this.setupCloudPeeks();
            this.setupSectionPeeks();

            // Trigger first moon peek 2 seconds after page load
            setTimeout(() => {
                this.peekFromMoon();
                // Start random peeks after the first one
                setTimeout(() => {
                    this.startRandomPeeks();
                }, 3000); // Wait 3 seconds after first peek before starting random ones
            }, 2000);
        });
    }

    setupCloudPeeks() {
        // Add peek containers to clouds
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const peekContainer = document.createElement('div');
            peekContainer.className = 'chillmoon-peek cloud-peek';
            peekContainer.innerHTML = `
                <img src="assets/images/Character.png" class="chillmoon-character" alt="ChillMoon Character">
                <div class="speech-bubble">
                    <span class="bubble-text"></span>
                </div>
            `;
            cloud.style.position = 'relative';
            cloud.appendChild(peekContainer);
        });
    }

    setupSectionPeeks() {
        // Add peek containers to floating boxes
        const floatingBoxes = document.querySelectorAll('.floating-box');
        floatingBoxes.forEach((box, index) => {
            // Skip the first one (hero section)
            if (index === 0) return;
            
            const peekContainer = document.createElement('div');
            peekContainer.className = 'chillmoon-peek section-peek';
            peekContainer.innerHTML = `
                <img src="assets/images/Character.png" class="chillmoon-character" alt="ChillMoon Character">
                <div class="speech-bubble">
                    <span class="bubble-text"></span>
                </div>
            `;
            box.appendChild(peekContainer);
        });
    }

    startRandomPeeks() {
        this.scheduleNextPeek();
    }

    scheduleNextPeek() {
        const delay = this.minInterval + Math.random() * (this.maxInterval - this.minInterval);
        setTimeout(() => {
            this.performRandomPeek();
            this.scheduleNextPeek();
        }, delay);
    }

    performRandomPeek() {
        const currentTime = Date.now();
        if (currentTime - this.lastPeekTime < this.minInterval) {
            return; // Too soon for another peek
        }

        // Decide peek location randomly
        const peekTypes = ['moon', 'cloud', 'section'];
        const selectedType = peekTypes[Math.floor(Math.random() * peekTypes.length)];

        switch (selectedType) {
            case 'moon':
                this.peekFromMoon();
                break;
            case 'cloud':
                this.peekFromCloud();
                break;
            case 'section':
                this.peekFromSection();
                break;
        }

        this.lastPeekTime = currentTime;
    }

    peekFromMoon() {
        const moonPeek = document.querySelector('.moon-peek');
        if (!moonPeek || this.activePeeks.has(moonPeek)) return;

        const quote = this.moonQuotes[Math.floor(Math.random() * this.moonQuotes.length)];
        this.animatePeek(moonPeek, quote);
    }

    peekFromCloud() {
        const cloudPeeks = document.querySelectorAll('.cloud-peek');
        const availablePeeks = Array.from(cloudPeeks).filter(peek => !this.activePeeks.has(peek));
        
        if (availablePeeks.length === 0) return;

        const selectedPeek = availablePeeks[Math.floor(Math.random() * availablePeeks.length)];
        const quote = this.cloudQuotes[Math.floor(Math.random() * this.cloudQuotes.length)];
        this.animatePeek(selectedPeek, quote);
    }

    peekFromSection() {
        const sectionPeeks = document.querySelectorAll('.section-peek');
        const visiblePeeks = Array.from(sectionPeeks).filter(peek => {
            const rect = peek.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0 && !this.activePeeks.has(peek);
        });

        if (visiblePeeks.length === 0) return;

        const selectedPeek = visiblePeeks[Math.floor(Math.random() * visiblePeeks.length)];
        
        // Get section-specific quote
        const section = selectedPeek.closest('section');
        const sectionId = section ? section.id : 'about';
        const quotes = this.sectionQuotes[sectionId] || this.sectionQuotes.about;
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        
        this.animatePeek(selectedPeek, quote);
    }

    animatePeek(peekContainer, quote) {
        this.activePeeks.add(peekContainer);
        
        // Set the quote text
        const bubbleText = peekContainer.querySelector('.bubble-text');
        bubbleText.textContent = quote;

        // Start peeking animation
        peekContainer.classList.add('peeking');

        // Show speech bubble after character appears
        setTimeout(() => {
            peekContainer.classList.add('speaking');
        }, 500);

        // Hide everything after a delay
        setTimeout(() => {
            peekContainer.classList.remove('speaking');
            
            setTimeout(() => {
                peekContainer.classList.remove('peeking');
                this.activePeeks.delete(peekContainer);
            }, 300);
        }, 2500); // Reduced from 3000 to 2500 for quicker animations
    }

    // Manual trigger for testing
    triggerPeek(type = 'moon') {
        switch (type) {
            case 'moon':
                this.peekFromMoon();
                break;
            case 'cloud':
                this.peekFromCloud();
                break;
            case 'section':
                this.peekFromSection();
                break;
        }
    }
}

// Initialize the peek system
const chillMoonPeeks = new ChillMoonPeekSystem();

// Export for debugging
window.chillMoonPeeks = chillMoonPeeks;