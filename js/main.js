// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 1500);


    // GSAP Animations
    // Hero animations
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    // Buttons are immediately visible - no animation needed

    gsap.from('.hero-moon-container', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        delay: 0.1,
        ease: 'elastic.out(1, 0.5)'
    });

    // Parallax effects
    gsap.to('.cloud1', {
        x: 100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.cloud2', {
        x: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.cloud3', {
        x: 150,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Star parallax
    gsap.to('.stars', {
        y: -100,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.stars2', {
        y: -200,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.stars3', {
        y: -300,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // About section animations
    gsap.from('.info-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 80%'
        }
    });

    gsap.from('.about-text', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%'
        }
    });

    gsap.from('.moodeng-about', {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.moodeng-about',
            start: 'top 90%'
        }
    });

    // Exchange cards animation
    gsap.from('.exchange-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        scrollTrigger: {
            trigger: '.exchanges-grid',
            start: 'top 80%'
        }
    });

    // Tokenomics animations
    gsap.from('.beach-ball', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.beach-balls',
            start: 'top 80%'
        }
    });

    gsap.from('.info-box', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.token-info',
            start: 'top 80%'
        }
    });

    // How to buy animations
    gsap.from('.step-card', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.steps-grid',
            start: 'top 80%'
        }
    });

    // Beach ball floating animation
    gsap.to('.ball1', {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.ball2', {
        y: 20,
        x: -15,
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.ball3', {
        y: -15,
        x: 20,
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });

    // Add hover effect to exchange cards
    document.querySelectorAll('.exchange-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.grass'), {
                scaleY: 1.2,
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.grass'), {
                scaleY: 1,
                duration: 0.3
            });
        });
    });

    // Copy contract address functionality
    window.copyContract = function() {
        const contractAddress = 'ED5NYWEZPPJHPFYVMTSD7TD3LAT3Q3GRTNHZFTBY';
        navigator.clipboard.writeText(contractAddress).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '';
            }, 2000);
        });
    };

    // Add mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        gsap.to('.hero-moon-container', {
            x: mouseX * 20,
            y: mouseY * 20,
            duration: 0.5
        });

        gsap.to('.cloud1', {
            x: mouseX * 30,
            y: mouseY * 15,
            duration: 0.8
        });

        gsap.to('.cloud2', {
            x: mouseX * -25,
            y: mouseY * 10,
            duration: 0.8
        });

        gsap.to('.cloud3', {
            x: mouseX * 35,
            y: mouseY * 20,
            duration: 0.8
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });
});

// Add fade-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);