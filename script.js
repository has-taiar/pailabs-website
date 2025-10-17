// Custom JavaScript for Pai Labs Website

document.addEventListener('DOMContentLoaded', function () {

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.re// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Neural Network Animation
function initializeNeuralNetwork() {
    console.log('Initializing neural network...');
    const neuralNetwork = document.getElementById('neuralNetwork');
    if (!neuralNetwork) {
        console.log('Neural network element not found');
        return;
    }
    console.log('Neural network element found:', neuralNetwork);

    const nodes = neuralNetwork.querySelectorAll('.node');
    const connectionsContainer = neuralNetwork.querySelector('.connections-container');
    const particlesContainer = neuralNetwork.querySelector('.data-particles');

    // Create connections between layers (simplified)
    function createConnections() {
        console.log('Creating connections...');
        const layer1Nodes = neuralNetwork.querySelectorAll('.layer-1 .node');
        const layer2Nodes = neuralNetwork.querySelectorAll('.layer-2 .node');
        const layer3Nodes = neuralNetwork.querySelectorAll('.layer-3 .node');

        console.log('Found nodes:', {
            layer1: layer1Nodes.length,
            layer2: layer2Nodes.length,
            layer3: layer3Nodes.length
        });

        // Clear existing connections
        connectionsContainer.innerHTML = '';

        // Create a few sample connections instead of all connections
        if (layer1Nodes.length > 0 && layer2Nodes.length > 0) {
            createConnection(layer1Nodes[0], layer2Nodes[1]);
            createConnection(layer1Nodes[1], layer2Nodes[2]);
            createConnection(layer1Nodes[2], layer2Nodes[0]);
            createConnection(layer1Nodes[3], layer2Nodes[3]);
        }

        if (layer2Nodes.length > 0 && layer3Nodes.length > 0) {
            createConnection(layer2Nodes[1], layer3Nodes[0]);
            createConnection(layer2Nodes[2], layer3Nodes[1]);
            createConnection(layer2Nodes[3], layer3Nodes[2]);
        }
    }

    function createConnection(startNode, endNode) {
        if (!startNode || !endNode) return;
        
        // Use position relative to parent instead of getBoundingClientRect
        const connection = document.createElement('div');
        connection.className = 'connection';
        
        // Simple positioning - we'll use CSS to handle the visual connections
        connection.style.cssText = `
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-red), var(--primary-blue));
            opacity: 0.7;
            animation: dataFlow 3s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            left: 20%;
            top: 50%;
            width: 60%;
            transform: translateY(-1px);
        `;

        connectionsContainer.appendChild(connection);
    }

    // Add interactive hover effects
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            // Highlight connected paths
            const connections = connectionsContainer.querySelectorAll('.connection');
            connections.forEach(conn => {
                if (Math.random() > 0.7) { // Randomly highlight some connections
                    conn.classList.add('active');
                }
            });

            // Create particle effect
            createParticleEffect(this);
        });

        node.addEventListener('mouseleave', function() {
            // Remove highlights
            const connections = connectionsContainer.querySelectorAll('.connection');
            connections.forEach(conn => {
                conn.classList.remove('active');
            });
        });

        node.addEventListener('click', function() {
            // Create burst effect
            createBurstEffect(this);
        });
    });

    function createParticleEffect(node) {
        const nodeRect = node.getBoundingClientRect();
        const containerRect = neuralNetwork.getBoundingClientRect();
        const centerX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const centerY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = (360 / 5) * i;
            const distance = 30 + Math.random() * 20;
            const endX = centerX + Math.cos(angle * Math.PI / 180) * distance;
            const endY = centerY + Math.sin(angle * Math.PI / 180) * distance;

            particle.style.cssText = `
                left: ${centerX}px;
                top: ${centerY}px;
                animation: particleExpand 0.8s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;

            particle.style.setProperty('--endX', `${endX}px`);
            particle.style.setProperty('--endY', `${endY}px`);

            particlesContainer.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }

    function createBurstEffect(node) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 68, 68, 0.6) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out;
            z-index: 10;
        `;

        node.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);

        // Trigger network-wide activation
        nodes.forEach((n, i) => {
            setTimeout(() => {
                n.style.animation = 'nodeGlow 0.5s ease-in-out';
                setTimeout(() => {
                    n.style.animation = 'nodeGlow 3s infinite ease-in-out';
                }, 500);
            }, i * 50);
        });
    }

    // Add particle expansion animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleExpand {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(calc(var(--endX) - 50%), calc(var(--endY) - 50%)) scale(0);
            }
        }
        
        @keyframes rippleExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize connections
    setTimeout(createConnections, 100);

    // Auto-trigger network activity
    setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        createParticleEffect(randomNode);
    }, 3000);

    // Recreate connections on window resize
    window.addEventListener('resize', debounce(createConnections, 250));
};
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section nav link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .service-card, .stat-item, .about-content, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animated counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        
        counters.forEach(counter => {
            const originalText = counter.innerText;
            let target, suffix;
            
            // Handle different formats: "20+", "4", "1M+"
            if (originalText.includes('M+')) {
                target = parseInt(originalText.replace('M+', ''));
                suffix = 'M+';
                target = target * 1000000; // Convert to actual number
            } else if (originalText.includes('+')) {
                target = parseInt(originalText.replace('+', ''));
                suffix = '+';
            } else {
                target = parseInt(originalText);
                suffix = '';
            }
            
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    // Display final value
                    if (suffix === 'M+') {
                        counter.innerText = Math.floor(target / 1000000) + 'M+';
                    } else {
                        counter.innerText = target + suffix;
                    }
                    clearInterval(timer);
                } else {
                    // Display current value
                    if (suffix === 'M+') {
                        const millions = current / 1000000;
                        if (millions < 1) {
                            counter.innerText = Math.floor(current / 1000) + 'K+';
                        } else {
                            counter.innerText = millions.toFixed(1) + 'M+';
                        }
                    } else {
                        counter.innerText = Math.floor(current) + suffix;
                    }
                }
            }, 16);
        });
    }    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');

            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttled scroll handler for better performance
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to value cards
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 68, 68, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });

    // Form validation enhancements
    const formInputs = document.querySelectorAll('.form-control');

    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');

            // Basic validation
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }

            // Email validation
            if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            }
        });

        // Real-time validation
        input.addEventListener('input', function () {
            if (this.classList.contains('is-invalid') && this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Add loading screen (optional)
    function addLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000 0%, #212529 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: #FF4444; margin-bottom: 1rem;">PAI</div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; color: white;">Loading...</div>
                <div style="width: 50px; height: 50px; border: 3px solid rgba(255, 68, 68, 0.3); border-top: 3px solid #FF4444; border-radius: 50%; animation: spin 1s linear infinite; margin: 2rem auto 0;"></div>
            </div>
        `;

        document.body.appendChild(loader);

        // Hide loader when page is fully loaded
        window.addEventListener('load', function () {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }, 1000);
        });
    }

    // Uncomment to enable loading screen
    // addLoadingScreen();

    // Simple neural network animation is handled by CSS
    
    // Initialize everything
    console.log('Pai Labs website initialized successfully!');
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}