// =============================================================================
// XRE WIKI - ENHANCED JAVASCRIPT
// =============================================================================
// This file handles all interactive functionality for the XRE Wiki site
// Features: Theme toggle, enhanced TOC, copy buttons, search, navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme system first (before other UI elements)
    initializeThemeToggle();
    
    // Mobile menu toggle
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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Generate enhanced table of contents (improved version)
    generateEnhancedTableOfContents();
    
    // Scroll progress indicator
    createScrollProgress();
    
    // Add copy buttons to code blocks
    addCopyButtonsToCodeBlocks();
    
    // Enhance blockquotes (prep sections)
    enhanceBlockquotes();
});

// =============================================================================
// THEME TOGGLE FUNCTIONALITY (NEW FEATURE)
// =============================================================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // Get saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply initial theme
    setTheme(savedTheme);
    
    // Add click listener for simple light/dark toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add click animation feedback
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    // Remove existing theme classes
    body.classList.remove('theme-light', 'theme-dark');
    
    // Add new theme class
    body.classList.add(`theme-${theme}`);
    body.setAttribute('data-theme', theme);
    
    // Update toggle button appearance
    if (themeToggle) {
        themeToggle.setAttribute('data-theme', theme);
        
        // Update aria-label for accessibility
        const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
        themeToggle.setAttribute('aria-label', label);
    }
}

// =============================================================================
// ENHANCED TABLE OF CONTENTS (IMPROVED VERSION)
// =============================================================================

function generateEnhancedTableOfContents() {
    const tocContent = document.getElementById('toc-content');
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4');
    
    if (!tocContent || headings.length === 0) return;
    
    // Create scrollable wrapper
    const tocWrapper = document.createElement('div');
    tocWrapper.className = 'toc-wrapper';
    
    const ul = document.createElement('ul');
    ul.className = 'toc-list';
    
    let currentSection = null;
    let currentSubList = null;
    let currentH2Section = null;
    let currentH2SubList = null;
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1)); // h1 = 1, h2 = 2, etc.
        
        // Create an ID for the heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        const li = document.createElement('li');
        li.className = `toc-item toc-level-${level}`;
        
        if (level === 1) {
            // H1 headings are top-level sections (collapsible)
            currentSection = li;
            li.className += ' toc-section';
            
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'toc-section-header';
            
            const arrow = document.createElement('span');
            arrow.className = 'toc-arrow';
            arrow.innerHTML = '▼';
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = 'toc-link toc-main-link';
            
            sectionHeader.appendChild(arrow);
            sectionHeader.appendChild(link);
            li.appendChild(sectionHeader);
            
            // Create sub-list for h2, h3, h4 under this h1
            currentSubList = document.createElement('ul');
            currentSubList.className = 'toc-sublist';
            li.appendChild(currentSubList);
            
            // Add click handler for collapsing/expanding
            sectionHeader.addEventListener('click', function(e) {
                if (e.target === link) return; // Don't toggle if clicking the link directly
                
                e.preventDefault();
                
                const isExpanded = li.classList.contains('expanded');
                
                if (isExpanded) {
                    li.classList.remove('expanded');
                    arrow.innerHTML = '▶';
                } else {
                    li.classList.add('expanded');
                    arrow.innerHTML = '▼';
                }
            });
            
            // Start expanded
            li.classList.add('expanded');
            
            ul.appendChild(li);
            currentH2Section = null;
            currentH2SubList = null;
            
        } else if (level === 2 && currentSubList) {
            // H2 are sub-items under H1, but can also be collapsible if they have H3s
            const subLi = document.createElement('li');
            subLi.className = `toc-item toc-level-${level} toc-h2-section`;
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = 'toc-link toc-sub-link';
            
            subLi.appendChild(link);
            currentSubList.appendChild(subLi);
            currentH2Section = subLi;
            
            // Create sub-list for potential H3s
            currentH2SubList = document.createElement('ul');
            currentH2SubList.className = 'toc-h3-list';
            subLi.appendChild(currentH2SubList);
            
        } else if (level === 3 && currentH2SubList) {
            // H3 goes under the current H2
            const h3Li = document.createElement('li');
            h3Li.className = `toc-item toc-level-${level}`;
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = 'toc-link toc-sub-link toc-h3-link';
            
            h3Li.appendChild(link);
            currentH2SubList.appendChild(h3Li);
            
        } else if (level === 4 && currentH2SubList) {
            // H4 also goes under current H2 (treat similar to H3)
            const h4Li = document.createElement('li');
            h4Li.className = `toc-item toc-level-${level}`;
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = 'toc-link toc-sub-link toc-h4-link';
            
            h4Li.appendChild(link);
            currentH2SubList.appendChild(h4Li);
        }
    });
    
    tocWrapper.appendChild(ul);
    tocContent.innerHTML = '';
    tocContent.appendChild(tocWrapper);
    
    // Add scroll listener for active link highlighting
    window.addEventListener('scroll', highlightActiveTOCLink);
    setTimeout(highlightActiveTOCLink, 100);
}

// Highlight active TOC link based on scroll position
function highlightActiveTOCLink() {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    let activeHeading = null;
    const scrollTop = window.pageYOffset + 150; // Account for sticky header
    
    // Find the currently visible heading
    headings.forEach(heading => {
        if (heading.offsetTop <= scrollTop) {
            activeHeading = heading;
        }
    });
    
    // Remove active class from all links
    tocLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current link
    if (activeHeading) {
        const activeLink = document.querySelector(`.toc-link[href="#${activeHeading.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Ensure the active link's section is expanded
            const section = activeLink.closest('.toc-section');
            if (section && !section.classList.contains('expanded')) {
                const arrow = section.querySelector('.toc-arrow');
                section.classList.add('expanded');
                if (arrow) arrow.innerHTML = '▼';
            }
        }
    }
}

// =============================================================================
// SCROLL PROGRESS INDICATOR
// =============================================================================

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

// =============================================================================
// CODE BLOCK COPY FUNCTIONALITY
// =============================================================================

function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.prose pre');
    
    codeBlocks.forEach((block, index) => {
        // Skip if already has copy button
        if (block.parentNode.classList.contains('code-block-wrapper')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-4-4c0-1.1.9-2 2-2h4"></path>
            </svg>
            Copy
        `;
        
        copyButton.addEventListener('click', async () => {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                showCopySuccess(copyButton);
            } catch (err) {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(text, copyButton);
            }
        });
        
        wrapper.appendChild(copyButton);
    });
}

// Show copy success feedback
function showCopySuccess(button) {
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Copied!
    `;
    button.classList.add('copied');
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-4-4c0-1.1.9-2 2-2h4"></path>
            </svg>
            Copy
        `;
        button.classList.remove('copied');
    }, 2000);
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// =============================================================================
// BLOCKQUOTE ENHANCEMENT
// =============================================================================

function enhanceBlockquotes() {
    const blockquotes = document.querySelectorAll('.prose blockquote');
    blockquotes.forEach(blockquote => {
        const firstH1 = blockquote.querySelector('h1');
        if (firstH1 && firstH1.textContent.includes('Pre-Class Prep')) {
            blockquote.classList.add('prep-section');
        }
    });
}

// =============================================================================
// DYNAMIC STYLES INJECTION
// =============================================================================

const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* =================================================================== */
    /* HEADER ACTIONS LAYOUT */
    /* =================================================================== */
    
    .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    /* =================================================================== */
    /* THEME TOGGLE BUTTON */
    /* =================================================================== */
    
    .theme-toggle {
        background: none;
        border: 2px solid var(--border);
        border-radius: 2rem;
        padding: 0.25rem;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 60px;
        height: 32px;
        position: relative;
        outline: none;
        overflow: hidden;
    }
    
    .theme-toggle:hover {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        transform: scale(1.05);
    }
    
    .theme-toggle:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }
    
    .theme-toggle-track {
        width: 100%;
        height: 100%;
        border-radius: 2rem;
        background: var(--bg-secondary);
        position: relative;
        transition: background-color 0.3s ease;
    }
    
    .theme-toggle-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        position: absolute;
        top: 2px;
        left: 2px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-sm);
    }
    
    .theme-icon {
        font-size: 12px;
        position: absolute;
        transition: all 0.3s ease;
        user-select: none;
    }
    
    /* Light Mode State (Default) */
    body.theme-light .theme-toggle-thumb {
        left: 2px;
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        border-color: #f59e0b;
    }
    
    body.theme-light .light-icon {
        opacity: 1;
        transform: scale(1);
    }
    
    body.theme-light .dark-icon {
        opacity: 0;
        transform: scale(0.5);
    }
    
    body.theme-light .theme-toggle-track {
        background: linear-gradient(90deg, #fef3c7, #fde68a);
    }
    
    /* Dark Mode State */
    body.theme-dark .theme-toggle-thumb {
        left: 32px;
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        border-color: #4f46e5;
    }
    
    body.theme-dark .light-icon {
        opacity: 0;
        transform: scale(0.5);
    }
    
    body.theme-dark .dark-icon {
        opacity: 1;
        transform: scale(1);
    }
    
    body.theme-dark .theme-toggle-track {
        background: linear-gradient(90deg, #312e81, #1e1b4b);
    }
    
    /* Force Light Mode Variables */
    body.theme-light {
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-tertiary: #f1f5f9;
        --bg-card: #ffffff;
        --text-primary: #0f172a;
        --text-secondary: #475569;
        --text-muted: #64748b;
        --border: #e2e8f0;
        --border-light: #f1f5f9;
    }
    
    /* Force Dark Mode Variables */
    body.theme-dark {
        --bg-primary: #0f0f0f;
        --bg-secondary: #1f1f1f;
        --bg-tertiary: #2a2a2a;
        --bg-card: #1e1e1e;
        --text-primary: #f5f5f5;
        --text-secondary: #c1c1c1;
        --text-muted: #8f8f8f;
        --border: #2e2e2e;
        --border-light: #3a3a3a;
    }
    
    /* =================================================================== */
    /* ENHANCED TABLE OF CONTENTS */
    /* =================================================================== */
    
    .toc-wrapper {
        max-height: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 0.5rem;
        margin-right: -0.5rem;
    }
    
    .toc-wrapper::-webkit-scrollbar {
        width: 6px;
    }
    
    .toc-wrapper::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 3px;
    }
    
    .toc-wrapper::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 3px;
    }
    
    .toc-wrapper::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
    }
    
    .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .toc-section {
        margin-bottom: 0.75rem;
        border-radius: var(--radius);
        overflow: hidden;
        transition: all 0.2s ease;
    }
    
    .toc-section:hover {
        transform: translateX(3px);
    }
    
    .toc-section-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border-radius: var(--radius);
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
        border: 1px solid transparent;
    }
    
    .toc-section-header:hover {
        background: var(--bg-tertiary);
        border-color: var(--border);
        box-shadow: var(--shadow-sm);
    }
    
    .toc-arrow {
        font-size: 0.9rem;
        color: var(--text-muted);
        transition: all 0.3s ease;
        min-width: 14px;
        text-align: center;
        font-weight: bold;
    }
    
    .toc-section.expanded .toc-arrow {
        transform: rotate(0deg);
        color: var(--primary);
    }
    
    .toc-section:not(.expanded) .toc-arrow {
        transform: rotate(-90deg);
    }
    
    .toc-main-link {
        flex: 1;
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.2s ease;
    }
    
    .toc-main-link:hover {
        color: var(--primary);
    }
    
    .toc-main-link.active {
        color: var(--primary);
    }
    
    .toc-sublist {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 0.5rem;
        padding-left: 1.5rem;
        border-left: 2px solid var(--border);
        transition: all 0.3s ease;
        overflow: hidden;
    }
    
    .toc-section:not(.expanded) .toc-sublist {
        max-height: 0;
        margin-top: 0;
        opacity: 0;
    }
    
    .toc-section.expanded .toc-sublist {
        max-height: 600px;
        opacity: 1;
        padding-bottom: 0.5rem;
    }
    
    .toc-h3-list {
        list-style: none;
        padding: 0;
        margin: 0;
        padding-left: 1rem;
        margin-top: 0.25rem;
    }
    
    .toc-sub-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.85rem;
        display: block;
        padding: 0.3rem 0.75rem;
        border-radius: var(--radius);
        transition: all 0.2s ease;
        line-height: 1.4;
    }
    
    .toc-sub-link:hover {
        color: var(--primary);
        background: var(--bg-secondary);
        padding-left: 1rem;
    }
    
    .toc-sub-link.active {
        background: var(--primary);
        color: white;
        font-weight: 500;
    }
    
    .toc-h3-link {
        font-size: 0.8rem;
        padding-left: 1rem;
    }
    
    .toc-h4-link {
        font-size: 0.75rem;
        padding-left: 1.25rem;
        opacity: 0.9;
    }
    
    /* =================================================================== */
    /* SCROLL PROGRESS BAR */
    /* =================================================================== */
    
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
    
    /* =================================================================== */
    /* PREP SECTION ENHANCEMENT */
    /* =================================================================== */
    
    .prep-section {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
        border-left-color: var(--accent) !important;
    }
    
    body.theme-dark .prep-section {
        background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%) !important;
    }
    
    /* =================================================================== */
    /* MOBILE RESPONSIVE */
    /* =================================================================== */
    
    @media (max-width: 768px) {
        .header-actions {
            gap: 0.75rem;
        }
        
        .theme-toggle {
            width: 50px;
            height: 28px;
        }
        
        .theme-toggle-thumb {
            width: 20px;
            height: 20px;
        }
        
        .theme-icon {
            font-size: 10px;
        }
        
        body.theme-dark .theme-toggle-thumb {
            left: 26px;
        }
        
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
            box-shadow: var(--shadow-lg);
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
        
        .copy-button {
            top: 0.5rem;
            right: 0.5rem;
            font-size: 0.7rem;
            padding: 0.4rem;
        }
        
        .toc-wrapper {
            max-height: 300px;
        }
    }
    
    /* =================================================================== */
    /* MOBILE MENU TOGGLE */
    /* =================================================================== */
    
    .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: flex;
        }
    }
    
    .mobile-menu-toggle span {
        width: 20px;
        height: 2px;
        background: var(--text-primary);
        transition: all 0.2s ease;
    }
    
    /* =================================================================== */
    /* ACCESSIBILITY & REDUCED MOTION */
    /* =================================================================== */
    
    @media (prefers-reduced-motion: reduce) {
        .theme-toggle,
        .theme-toggle-thumb,
        .theme-icon,
        .toc-arrow,
        .toc-sublist {
            transition: none;
        }
        
        .floating-card {
            animation: none;
        }
    }
`;

document.head.appendChild(enhancedStyles);