// Shivaay Balloon Decoration Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }

    // Fix Navigation Links - Smooth Scrolling
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    // Portfolio data for different categories
    const portfolioData = {
        recent: [
            { icon: '🎈🎂', title: 'Birthday Special' },
            { icon: '💒🎈', title: 'Wedding Decoration' },
            { icon: '🎭🎈', title: 'Theme Party' },
            { icon: '👶🎈', title: 'Baby Shower' },
            { icon: '🏢🎈', title: 'Corporate Event' },
            { icon: '💕🎈', title: 'Anniversary' }
        ],
        birthday: [
            { icon: '🎂🎈', title: 'Kids Birthday' },
            { icon: '🎉🎈', title: 'Adult Birthday' },
            { icon: '🦄🎈', title: 'Unicorn Theme' },
            { icon: '🚗🎈', title: 'Car Theme' },
            { icon: '👑🎈', title: 'Princess Theme' },
            { icon: '🦸🎈', title: 'Superhero Theme' }
        ],
        wedding: [
            { icon: '💒🎈', title: 'Wedding Mandap' },
            { icon: '💐🎈', title: 'Flower Decoration' },
            { icon: '💍🎈', title: 'Ring Ceremony' },
            { icon: '🎊🎈', title: 'Reception Decor' },
            { icon: '❤️🎈', title: 'Romantic Setup' },
            { icon: '🌹🎈', title: 'Rose Garden Theme' }
        ],
        corporate: [
            { icon: '🏢🎈', title: 'Office Party' },
            { icon: '🎯🎈', title: 'Product Launch' },
            { icon: '🏆🎈', title: 'Award Ceremony' },
            { icon: '📈🎈', title: 'Business Event' },
            { icon: '🎪🎈', title: 'Team Building' },
            { icon: '🌟🎈', title: 'Grand Opening' }
        ]
    };

    if (tabButtons.length > 0 && portfolioGrid) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the selected tab
                const selectedTab = this.getAttribute('data-tab');
                
                // Update portfolio grid
                updatePortfolioGrid(selectedTab);
            });
        });
    }

    function updatePortfolioGrid(category) {
        if (!portfolioGrid || !portfolioData[category]) return;
        
        // Add fade out effect
        portfolioGrid.style.opacity = '0';
        
        setTimeout(() => {
            // Clear existing content
            portfolioGrid.innerHTML = '';
            
            // Add new content
            portfolioData[category].forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item card';
                portfolioItem.innerHTML = `
                    <div class="portfolio-placeholder">${item.icon}</div>
                    <h4>${item.title}</h4>
                `;
                portfolioGrid.appendChild(portfolioItem);
            });
            
            // Add fade in effect
            portfolioGrid.style.opacity = '1';
        }, 150);
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const phone = contactForm.querySelector('input[type="tel"]').value.trim();
            const eventType = contactForm.querySelector('select').value;
            const eventDate = contactForm.querySelector('input[type="date"]').value;
            const message = contactForm.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !phone || !eventType || !eventDate) {
                showNotification('कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields', 'error');
                return;
            }
            
            // Phone validation (Indian phone number)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('कृपया वैध फोन नंबर दर्ज करें / Please enter a valid phone number', 'error');
                return;
            }
            
            // Date validation (not in past)
            const selectedDate = new Date(eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showNotification('कृपया भविष्य की तारीख चुनें / Please select a future date', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `नमस्ते! मुझे Shivaay Balloon Decoration के लिए बुकिंग करनी है:
            
नाम: ${name}
फोन: ${phone}
इवेंट प्रकार: ${getEventTypeInHindi(eventType)}
तारीख: ${eventDate}
संदेश: ${message || 'कोई अतिरिक्त जानकारी नहीं'}

कृपया मुझसे संपर्क करें। धन्यवाद!`;
            
            const whatsappUrl = `https://wa.me/919664385241?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show success message
            showNotification('आपका संदेश तैयार है! WhatsApp पर भेजने के लिए OK करें / Message ready! Click OK to send via WhatsApp', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Open WhatsApp after a short delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);
        });
    }

    // Helper function to convert event type to Hindi
    function getEventTypeInHindi(eventType) {
        const eventTypes = {
            'birthday': 'जन्मदिन',
            'wedding': 'शादी',
            'anniversary': 'वर्षगांठ',
            'baby-shower': 'बेबी शावर',
            'corporate': 'कॉर्पोरेट इवेंट',
            'theme-party': 'थीम पार्टी'
        };
        return eventTypes[eventType] || eventType;
    }

    // Service Cards Click to WhatsApp - Fixed Implementation
    function initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = this.querySelector('h3').textContent;
                const priceRange = this.querySelector('.price-tag').textContent;
                const whatsappMessage = `नमस्ते! मुझे ${serviceName} (${priceRange}) के बारे में जानकारी चाहिए। कृपया मुझसे संपर्क करें। धन्यवाद!`;
                const whatsappUrl = `https://wa.me/919664385241?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            });
            
            // Add visual feedback
            card.style.cursor = 'pointer';
            card.setAttribute('title', 'Click to inquire about this service');
        });
    }

    // Pricing Cards Click to WhatsApp - Fixed Implementation  
    function initializePricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const packageName = this.querySelector('h3').textContent;
                const price = this.querySelector('.price').textContent;
                const whatsappMessage = `नमस्ते! मुझे ${packageName} (${price}) के बारे में जानकारी चाहिए। कृपया मुझसे संपर्क करें। धन्यवाद!`;
                const whatsappUrl = `https://wa.me/919664385241?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            });
            
            // Add visual feedback
            card.style.cursor = 'pointer';
            card.setAttribute('title', 'Click to inquire about this package');
        });
    }

    // Initialize interactive cards
    initializeServiceCards();
    initializePricingCards();

    // Fix Call-to-Action Buttons
    function initializeCTAButtons() {
        // Book Now buttons
        const bookNowButtons = document.querySelectorAll('a[href="#contact"], .btn[href="#contact"]');
        bookNowButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // View Portfolio buttons
        const viewPortfolioButtons = document.querySelectorAll('a[href="#portfolio"], .btn[href="#portfolio"]');
        viewPortfolioButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    const offsetTop = portfolioSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Get Custom Quote button
        const customQuoteButtons = document.querySelectorAll('.pricing-cta .btn');
        customQuoteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const whatsappMessage = `नमस्ते! मुझे Shivaay Balloon Decoration के लिए custom quote चाहिए। कृपया मुझसे संपर्क करें। धन्यवाद!`;
                const whatsappUrl = `https://wa.me/919664385241?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            });
        });
    }

    // Initialize CTA buttons
    initializeCTAButtons();

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
            notification.style.border = '1px solid var(--color-success)';
            notification.style.color = 'var(--color-success)';
        } else if (type === 'error') {
            notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
            notification.style.border = '1px solid var(--color-error)';
            notification.style.color = 'var(--color-error)';
        } else {
            notification.style.backgroundColor = 'var(--color-surface)';
            notification.style.border = '1px solid var(--color-border)';
            notification.style.color = 'var(--color-text)';
        }
        
        // Add close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            margin-left: 12px;
            color: inherit;
            opacity: 0.7;
            padding: 0;
            line-height: 1;
        `;
        
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Scroll-based Animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .pricing-card');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    // Throttled scroll event listener
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initial check for animations
    handleScrollAnimations();

    // WhatsApp Float Button Animation
    const whatsappFloat = document.getElementById('whatsapp-float');
    
    if (whatsappFloat) {
        // Add pulse animation
        setInterval(() => {
            whatsappFloat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Add CSS for notification animations
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .notification-close:hover {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(notificationStyles);

    console.log('Shivaay Balloon Decoration website loaded successfully! 🎈');
});