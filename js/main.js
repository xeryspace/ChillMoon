// Simple initialization
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after a short delay
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 800);

    // Moon clicking minigame
    const moon = document.querySelector('.big-moon');
    const moonContainer = document.querySelector('.hero-moon-container');
    let clickCount = 0;
    const maxClicks = 50;

    moonContainer.addEventListener('click', (e) => {
        clickCount++;
        
        // Hide hint bubble after first click
        if (clickCount === 1) {
            const hintBubble = document.querySelector('.click-hint-bubble');
            if (hintBubble) {
                hintBubble.style.opacity = '0';
                setTimeout(() => hintBubble.remove(), 300);
            }
        }
        
        // Calculate redness - moon is yellowish, so we need to shift differently
        const hueShift = Math.min((clickCount / maxClicks) * 60, 60); // Shift 60 degrees towards red
        const saturation = 1 + (clickCount / maxClicks) * 0.5; // Increase saturation
        const brightness = 1 - (clickCount / maxClicks) * 0.2; // Darken slightly
        const glow = 50 + (clickCount / maxClicks) * 30; // Increase glow
        
        // Calculate spin speed - exponentially faster as clicks increase
        const spinDuration = Math.max(30 - (clickCount / maxClicks) * 28, 2); // From 30s to 2s
        
        // Apply visual effects - using sepia + hue-rotate for better red effect
        moon.style.filter = `
            drop-shadow(0 0 ${glow}px rgba(255, ${255 - clickCount * 5}, ${255 - clickCount * 5}, 0.5))
            sepia(${clickCount / maxClicks})
            hue-rotate(${hueShift}deg)
            saturate(${saturation})
            brightness(${brightness})
        `;
        
        // Update rotation speed
        moon.style.animationDuration = `${spinDuration}s`;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'moon-ripple';
        const rect = moonContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        moonContainer.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
        
        
        // Victory condition
        if (clickCount >= maxClicks) {
            moon.style.filter += ' saturate(2)';
            createConfetti();
            clickCount = 0; // Reset for next round
            
            // Reset after celebration
            setTimeout(() => {
                moon.style.filter = 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.5))';
                moon.style.animationDuration = '30s'; // Reset spin speed
            }, 3000);
        }
    });

    // Create sparkle stars effect
    function createConfetti() {
        const sparkleTypes = ['✦', '✧', '✨', '⋆', '✵', '✶', '✷', '✸', '✹'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-star';
                sparkle.style.left = (Math.random() * 100) + '%';
                sparkle.style.animationDelay = Math.random() * 0.3 + 's';
                sparkle.style.animationDuration = (2.5 + Math.random() * 2) + 's';
                sparkle.style.fontSize = (16 + Math.random() * 20) + 'px';
                
                // Random sparkle type
                sparkle.innerHTML = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
                
                // Random color tint
                const hue = Math.random() * 60 - 30; // -30 to +30 degrees from white
                sparkle.style.filter = `hue-rotate(${hue}deg) blur(0.5px)`;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 4500);
            }, i * 25);
        }
        
        // Also create a burst of smaller sparkles from the moon
        const moonRect = moonContainer.getBoundingClientRect();
        const centerX = moonRect.left + moonRect.width / 2;
        const centerY = moonRect.top + moonRect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-burst';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.innerHTML = '✦';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 200 + Math.random() * 300;
            sparkle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            sparkle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }


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
});