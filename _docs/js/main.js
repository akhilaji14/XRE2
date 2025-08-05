// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchBox = document.getElementById('searchBox');
    const sectionCards = document.querySelectorAll('.section-card');
    
    if (searchBox && sectionCards.length > 0) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            sectionCards.forEach(card => {
                const title = card.querySelector('.section-title').textContent.toLowerCase();
                const links = Array.from(card.querySelectorAll('.section-links a'))
                    .map(link => link.textContent.toLowerCase()).join(' ');
                
                const isMatch = title.includes(searchTerm) || links.includes(searchTerm);
                card.style.display = isMatch ? 'block' : 'none';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Generate table of contents
    generateTableOfContents();
    
    // Scroll progress indicator
    createScrollProgress();
});

// Generate table of contents
function generateTableOfContents() {
    const tocContent = document.getElementById('toc-content');
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
    
    if (!tocContent || headings.length === 0) return;
    
    const ul = document.createElement('ul');
    
    headings.forEach((heading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Create an ID for the heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.className = 'toc-link';
        
        // Add level class for styling
        const level = heading.tagName.toLowerCase();
        li.className = 'toc-item toc-' + level;
        
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    tocContent.appendChild(ul);
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBarFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Add styles for scroll progress and TOC
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 1000;
        pointer-events: none;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .toc-item {
        margin-bottom: 0.25rem;
    }
    
    .toc-h2 {
        padding-left: 0.5rem;
    }
    
    .toc-h3 {
        padding-left: 1rem;
    }
    
    .toc-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.875rem;
        display: block;
        padding: 0.25rem 0;
        transition: color 0.2s ease;
        border-radius: var(--radius);
    }
    
    .toc-link:hover {
        color: var(--primary);
    }
    
    @media (max-width: 768px) {
        .nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-card);
            border-top: 1px solid var(--border);
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);