// Footer Name Animation - Scroll Progressive Filling with Individual Letter Spacing
document.addEventListener('DOMContentLoaded', function() {
    const footerText = document.getElementById('footer-text');
    const footerChars = footerText.querySelectorAll('.footer-char');
    const footerSection = document.getElementById('footer');
    const sairamChars = document.querySelectorAll('[data-name="sairam"] .footer-char');
    const pavuluriChars = document.querySelectorAll('[data-name="pavuluri"] .footer-char');

    // Initialize all fills as hidden
    footerChars.forEach((char) => {
        const fill = char.querySelector('.footer-char-fill');
        fill.style.clipPath = 'inset(100% 0px 0px)';
    });

    function updateFooterAnimation() {
        const footerRect = footerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;

        // Calculate scroll progress from halfway through footer to near end of document
        let scrollProgress = 0;

        // Start animation when we're halfway through the footer
        if (footerRect.top <= windowHeight && footerRect.bottom > 0) {
            const footerTotalHeight = footerRect.height;
            const halfFooterHeight = footerRect.height / 2;

            // Calculate when we reach halfway into footer
            const halfwayFooterPoint = scrollTop + footerRect.top + halfFooterHeight - windowHeight;
            const endOfDocument = documentHeight - windowHeight;

            // Finish animation 120px before the very end
            const animationEndPoint = endOfDocument - 120;

            // Calculate progress from halfway footer to near end of document
            const totalScrollDistance = animationEndPoint - halfwayFooterPoint;
            const currentScrollDistance = scrollTop - halfwayFooterPoint;

            scrollProgress = Math.max(0, Math.min(1, currentScrollDistance / totalScrollDistance));
        }

        // Update Sairam characters first
        sairamChars.forEach((char, index) => {
            const fill = char.querySelector('.footer-char-fill');

            // Calculate fill percentage for this character with smooth easing
            const charStartOffset = index * 0.08; // Each character starts 8% later
            const charFillProgress = Math.max(0, Math.min(1, (scrollProgress - charStartOffset) / 0.4));

            // Apply smooth easing (ease-out cubic)
            const easedProgress = 1 - Math.pow(1 - charFillProgress, 3);

            // Convert to clip-path percentage (0% = fully filled, 100% = empty)
            const fillPercentage = (1 - easedProgress) * 100;

            // Apply the clip-path with smooth transition
            fill.style.transition = 'clip-path 0.1s ease-out';
            fill.style.clipPath = `inset(${fillPercentage}% 0px 0px)`;
        });

        // Update Pavuluri characters after Sairam
        pavuluriChars.forEach((char, index) => {
            const fill = char.querySelector('.footer-char-fill');

            // Start Pavuluri animation after Sairam is complete
            const sairamDelay = 0.4; // Wait for Sairam to complete
            const charStartOffset = sairamDelay + (index * 0.08); // Each character starts 8% later
            const charFillProgress = Math.max(0, Math.min(1, (scrollProgress - charStartOffset) / 0.4));

            // Apply smooth easing (ease-out cubic)
            const easedProgress = 1 - Math.pow(1 - charFillProgress, 3);

            // Convert to clip-path percentage (0% = fully filled, 100% = empty)
            const fillPercentage = (1 - easedProgress) * 100;

            // Apply the clip-path with smooth transition
            fill.style.transition = 'clip-path 0.1s ease-out';
            fill.style.clipPath = `inset(${fillPercentage}% 0px 0px)`;
        });
    }

    // Update animation on scroll
    window.addEventListener('scroll', updateFooterAnimation);

    // Initial update
    updateFooterAnimation();
});

// Smooth Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for Section Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add active state styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        opacity: 0.7;
        position: relative;
    }

    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #ffffff;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
});

// Typing effect for hero name with blinking cursor
document.addEventListener('DOMContentLoaded', function() {
    const heroFirst = document.querySelector('.hero-first');
    const heroLast = document.querySelector('.hero-last');

    const firstName = 'Sairam';
    const lastName = 'Pavuluri';

    // Hide the text initially
    heroFirst.textContent = '';
    heroLast.textContent = '';

    // Create blinking cursor using image
    const cursor = document.createElement('img');
    cursor.src = 'blinking-cursor2.png';
    cursor.alt = 'cursor';
    cursor.style.cssText = `
        width: 200px;
        height: 200px;
        animation: blink 1s infinite;
        margin-left: -75px;
        margin-top: -30px;
        vertical-align: middle;
    `;

    // Add blinking animation
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(blinkStyle);

    let index = 0;
    const typeSpeed = 150;

    function typeWriter() {
        if (index < firstName.length) {
            // Type first name
            heroFirst.textContent = firstName.substring(0, index + 1);

            // Move cursor to first name
            if (heroLast.contains(cursor)) {
                heroLast.removeChild(cursor);
            }
            heroFirst.appendChild(cursor);

            index++;
            setTimeout(typeWriter, typeSpeed);
        } else if (index < firstName.length + lastName.length + 1) {
            if (index === firstName.length) {
                // Add space between first and last name
                heroFirst.textContent = firstName + ' ';
                index++;
            } else {
                // Type last name
                const lastNameIndex = index - firstName.length - 1;
                heroLast.textContent = lastName.substring(0, lastNameIndex + 1);

                // Move cursor to last name
                if (heroFirst.contains(cursor)) {
                    heroFirst.removeChild(cursor);
                }
                heroLast.appendChild(cursor);

                index++;
            }
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Keep cursor visible after typing is complete
            if (heroFirst.contains(cursor)) {
                // Cursor stays in first name
            } else if (heroLast.contains(cursor)) {
                // Cursor stays in last name
            } else {
                // If cursor somehow got removed, add it to last name
                heroLast.appendChild(cursor);
            }
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 800);
});


// Custom Cursor with Kinetic Motion
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMoving = false;

    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        isMoving = false;
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        isMoving = true;
    });

    // Smooth cursor movement with kinetic effect
    function animateCursor() {
        const ease = 0.15; // Lower value = more lag/smoothing
        const deltaX = mouseX - cursorX;
        const deltaY = mouseY - cursorY;

        cursorX += deltaX * ease;
        cursorY += deltaY * ease;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    // Start animation
    animateCursor();

    // Scale effect on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .service-item, .skill-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

    const loadingText = document.createElement('div');
    loadingText.textContent = 'Sairam Pavuluri';
    loadingText.style.cssText = `
        font-size: 2rem;
        font-weight: 900;
        color: #ffffff;
        opacity: 0;
        animation: fadeIn 1s ease forwards;
    `;

    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);

    // Add fade in animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeInStyle);

    // Remove loading overlay after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
});

// Dynamic Navigation Text Color Based on Scroll Position
document.addEventListener('DOMContentLoaded', function() {
    const navName = document.querySelector('.nav-name');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSection = document.querySelector('.hero');

    function updateNavColors() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= heroBottom) {
            // Past hero section - use white text
            navName.classList.add('dark');
            navLinks.forEach(link => link.classList.add('dark'));
        } else {
            // In hero section - use black text
            navName.classList.remove('dark');
            navLinks.forEach(link => link.classList.remove('dark'));
        }
    }

    // Update colors on scroll
    window.addEventListener('scroll', updateNavColors);

    // Update colors on page load
    updateNavColors();
});
