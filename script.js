// ============ Navigation and Scroll Functionality ============

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

function closeMenu() {
    if (navLinks) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Active nav link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Show scroll to top button
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton?.classList.add('show');
    } else {
        scrollButton?.classList.remove('show');
    }
});

// ============ Module Accordion Toggle ============

function toggleModule(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.fa-chevron-down');
    
    // Close other open modules
    document.querySelectorAll('.module-content.active').forEach(openContent => {
        if (openContent !== content) {
            openContent.classList.remove('active');
            openContent.previousElementSibling.classList.remove('active');
            const otherIcon = openContent.previousElementSibling.querySelector('.fa-chevron-down');
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Toggle current module
    content.classList.toggle('active');
    header.classList.toggle('active');
    
    if (icon) {
        icon.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// ============ Example Code Toggle ============

function toggleExample(button) {
    const exampleCard = button.closest('.example-card');
    const exampleContent = exampleCard.querySelector('.example-content');
    
    if (exampleContent.style.display === 'none' || exampleContent.style.display === '') {
        exampleContent.style.display = 'block';
        button.textContent = 'Hide Code';
        button.style.backgroundColor = '#e74c3c';
    } else {
        exampleContent.style.display = 'none';
        button.textContent = 'Show Code';
        button.style.backgroundColor = '#f39c12';
    }
}

// ============ Contact Form Handling ============

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
}

// ============ Scroll to Top Button ============

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    document.body.appendChild(button);
}

// ============ Code Syntax Highlighting (Simple) ============

function highlightCode() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Add line numbers
        const lines = block.textContent.split('\n');
        block.innerHTML = lines.map((line, index) => {
            if (line.trim()) {
                return `<span class="line-number">${index + 1}</span>${escapeHtml(line)}`;
            }
            return '';
        }).join('\n');
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============ Table of Contents Generation ============

function generateTableOfContents() {
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    
    const sections = document.querySelectorAll('section[id]');
    const list = document.createElement('ul');
    
    sections.forEach(section => {
        if (section.id && section.id !== 'contact') {
            const title = section.querySelector('h2')?.textContent || section.id;
            const link = document.createElement('a');
            link.href = '#' + section.id;
            link.textContent = title;
            link.onclick = (e) => {
                e.preventDefault();
                scrollToSection(section.id);
            };
            
            const li = document.createElement('li');
            li.appendChild(link);
            list.appendChild(li);
        }
    });
    
    return toc;
}

// ============ Copy Code to Clipboard ============

function addCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #68a063;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.3s ease;
            z-index: 1;
        `;
        
        copyButton.onmouseover = () => {
            copyButton.style.backgroundColor = '#5a8f52';
            copyButton.style.transform = 'scale(1.05)';
        };
        
        copyButton.onmouseout = () => {
            copyButton.style.backgroundColor = '#68a063';
            copyButton.style.transform = 'scale(1)';
        };
        
        copyButton.onclick = () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy code');
            });
        };
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
}

// ============ Search Functionality ============

function implementSearch() {
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    searchBox.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
        display: none;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.style.cssText = `
        width: 200px;
        padding: 8px;
        border: 1px solid #68a063;
        border-radius: 3px;
        font-family: 'Poppins', sans-serif;
    `;
    
    searchBox.appendChild(searchInput);
    document.body.appendChild(searchBox);
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (searchTerm && text.includes(searchTerm)) {
                section.style.opacity = '1';
            } else if (searchTerm) {
                section.style.opacity = '0.3';
            } else {
                section.style.opacity = '1';
            }
        });
    });
}

// ============ Smooth Animations on Scroll ============

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe cards and sections
    document.querySelectorAll('.overview-card, .module-section, .example-card, .resource-card, .practice-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============ Initialization ============

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully');
    
    // Initialize all features
    createScrollToTopButton();
    highlightCode();
    addCopyCodeButtons();
    observeElements();
    
    // Log module count
    const moduleCount = document.querySelectorAll('.module-section').length;
    console.log(`Loaded ${moduleCount} modules`);
    
    // Add keyboard shortcut for search (Ctrl + /)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const searchBox = document.querySelector('.search-box');
            if (searchBox) {
                searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
                searchBox.querySelector('input').focus();
            }
        }
    });
    
    // Log when each section is in view
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(`Viewing section: ${section.id}`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(section);
    });
});

// ============ Performance Monitoring ============

window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime, 'ms');
});

// ============ Error Handling ============

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send this to a logging service
});

// ============ Theme Switcher (Optional) ============

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#f0f0f0';
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#2c3e50';
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// ============ Analytics Helper ============

function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // You can send this to Google Analytics or other tracking service
}

// Track module access
document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
        const moduleName = header.querySelector('h3').textContent;
        trackEvent('module_viewed', { module: moduleName });
    });
});

// Track example access
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const exampleName = btn.closest('.example-card').querySelector('h3').textContent;
        trackEvent('example_viewed', { example: exampleName });
    });
});

// ============ Accessibility Enhancements ============

// Add ARIA labels
document.querySelectorAll('.module-header').forEach(header => {
    const isOpen = header.nextElementSibling.classList.contains('active');
    header.setAttribute('aria-expanded', isOpen);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('module-header')) {
        toggleModule(e.target);
    }
});

// ============ Social Share Functionality ============

function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Backend Development with Node.js & Express.js Course';
    const text = 'Check out this comprehensive backend development course!';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text} ${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ============ Print Functionality ============

function printPage() {
    window.print();
}

// ============ Export to PDF (Browser Print) ============

function exportToPDF() {
    alert('Use your browser\'s Print function (Ctrl+P) and select "Save as PDF"');
    window.print();
}

// ============ Utility Functions ============

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get current scroll percentage
function getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
}

// ============ Breadcrumb Navigation ============

function generateBreadcrumbs() {
    const breadcrumbContainer = document.createElement('nav');
    breadcrumbContainer.className = 'breadcrumbs';
    breadcrumbContainer.setAttribute('aria-label', 'breadcrumbs');
    
    const home = document.createElement('a');
    home.href = '#home';
    home.textContent = 'Home';
    home.onclick = () => scrollToSection('home');
    
    breadcrumbContainer.appendChild(home);
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    navbar.parentNode.insertBefore(breadcrumbContainer, navbar.nextSibling);
}

// ============ Console Welcome Message ============

console.log('%c 🚀 Backend Development with Node.js & Express.js', 'font-size: 20px; color: #68a063; font-weight: bold;');
console.log('%c Welcome to the comprehensive backend development course!', 'font-size: 14px; color: #2c3e50;');
console.log('%c Happy Learning! 📚', 'font-size: 14px; color: #f39c12;');

// ============ Service Worker Registration (PWA Support) ============

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('./sw.js').then(registration => {
        //     console.log('Service Worker registered:', registration);
        // }).catch(error => {
        //     console.log('Service Worker registration failed:', error);
        // });
    });
}

// Export functions for external use
window.appFunctions = {
    scrollToSection,
    toggleModule,
    toggleExample,
    handleSubmit,
    shareOnSocial,
    exportToPDF,
    printPage,
    trackEvent,
    getScrollPercentage,
    isInViewport
};
