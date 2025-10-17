// Enhanced Neural Network System for Pai Labs Website

class NeuralNetwork {
    constructor() {
        this.nodes = [];
        this.connections = [];
        this.networkContainer = null;
        this.svgLayer = null;
    }

    // Initialize the neural network with explosion effect
    initialize() {
        console.log('Initializing Neural Network...');

        this.networkContainer = document.querySelector('.hero-neural-network');
        this.svgLayer = document.querySelector('.synapse-layer');

        if (!this.networkContainer || !this.svgLayer) {
            console.error('Neural network elements not found');
            return;
        }

        // Setup nodes with final positions for explosion
        this.setupNodes();

        // Create SVG gradient for synapses
        this.createSVGGradient();

        // Wait for explosion animation to complete, then create synapses
        setTimeout(() => {
            this.createSynapses();
        }, 2500);
    }

    // Setup nodes with their final explosion positions
    setupNodes() {
        const nodes = this.networkContainer.querySelectorAll('.node');
        const containerRect = this.networkContainer.getBoundingClientRect();

        // Define final positions for each node (distributed around the container)
        const finalPositions = [
            { x: 15, y: 20 },   // Top-left area
            { x: 85, y: 15 },   // Top-right area  
            { x: 10, y: 45 },   // Left-middle
            { x: 90, y: 40 },   // Right-middle
            { x: 25, y: 70 },   // Bottom-left
            { x: 75, y: 75 },   // Bottom-right
            { x: 50, y: 25 },   // Top-center
            { x: 50, y: 85 },   // Bottom-center
            { x: 20, y: 60 },   // Left-lower
            { x: 80, y: 65 }    // Right-lower
        ];

        nodes.forEach((node, index) => {
            if (index < finalPositions.length) {
                const pos = finalPositions[index];

                // Convert percentage to pixels relative to container
                const finalX = (pos.x / 100) * containerRect.width - 16; // 16px = half node width
                const finalY = (pos.y / 100) * containerRect.height - 16;

                // Set CSS custom properties for animation
                node.style.setProperty('--final-x', `${finalX - containerRect.width / 2 + 16}px`);
                node.style.setProperty('--final-y', `${finalY - containerRect.height / 2 + 16}px`);

                // Store node data
                this.nodes.push({
                    element: node,
                    finalX: finalX,
                    finalY: finalY,
                    color: node.dataset.color
                });
            }
        });

        console.log(`Setup ${this.nodes.length} nodes for explosion`);
    }

    // Create SVG gradient for synapse styling
    createSVGGradient() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');

        gradient.setAttribute('id', 'synapseGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#FF4444');
        stop1.setAttribute('stop-opacity', '0.8');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#4444FF');
        stop2.setAttribute('stop-opacity', '0.8');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        this.svgLayer.appendChild(defs);
    }

    // Create synapse connections between nodes
    createSynapses() {
        console.log('Creating synapses...');

        // Create connections between nearby nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = this.calculateDistance(this.nodes[i], this.nodes[j]);

                // Connect nodes that are reasonably close (adjust threshold as needed)
                if (distance < 300 && Math.random() > 0.4) {
                    this.createSynapseLine(this.nodes[i], this.nodes[j]);
                }
            }
        }

        // Add some random long-distance connections for visual interest
        for (let i = 0; i < 3; i++) {
            const node1 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            const node2 = this.nodes[Math.floor(Math.random() * this.nodes.length)];

            if (node1 !== node2) {
                this.createSynapseLine(node1, node2);
            }
        }

        console.log(`Created ${this.connections.length} synapses`);
    }

    // Calculate distance between two nodes
    calculateDistance(node1, node2) {
        const dx = node1.finalX - node2.finalX;
        const dy = node1.finalY - node2.finalY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Create individual synapse line
    createSynapseLine(node1, node2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.setAttribute('x1', node1.finalX + 16); // +16 for node center
        line.setAttribute('y1', node1.finalY + 16);
        line.setAttribute('x2', node2.finalX + 16);
        line.setAttribute('y2', node2.finalY + 16);
        line.setAttribute('class', 'synapse-line');

        // Add pulsing animation with random delay
        const delay = Math.random() * 3;
        line.style.animationDelay = `${delay}s`;
        line.style.animation += `, synapsePulse 4s infinite ${delay}s`;

        this.svgLayer.appendChild(line);
        this.connections.push(line);
    }
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            let current;
            if (target.includes('M+')) {
                // Handle millions
                const numValue = parseFloat(target);
                current = Math.floor(progress * numValue);
                counter.textContent = current.toFixed(1) + 'M+';
            } else if (target.includes('+')) {
                // Handle regular numbers with +
                const numValue = parseInt(target);
                current = Math.floor(progress * numValue);
                counter.textContent = current + '+';
            } else {
                // Handle regular numbers
                const numValue = parseInt(target);
                current = Math.floor(progress * numValue);
                counter.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;

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
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
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

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Fade-in animations
function initializeFadeAnimations() {
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

    const animateElements = document.querySelectorAll('.value-card, .service-card, .stat-item, .about-content, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing website components...');

    // Initialize navbar
    initializeNavbar();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize contact form
    initializeContactForm();

    // Initialize fade animations
    initializeFadeAnimations();

    // Initialize neural network
    const neuralNet = new NeuralNetwork();
    neuralNet.initialize();

    // Initialize stats counter when scrolled into view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(statsSection);
    }

    console.log('Website initialization complete');
});