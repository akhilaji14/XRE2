document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Simple Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Set initial theme text
        updateThemeToggleText();
        
        themeToggle.addEventListener('click', function() {
            // Toggle between light and dark mode
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeToggleText();
        });
    }

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggleText();
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

    // Generate table of contents
    generateTableOfContents();
    // Scroll progress indicator
    createScrollProgress();
    // Add copy buttons to code blocks
    addCopyButtonsToCodeBlocks();
    // Enhance blockquotes (prep sections)
    enhanceBlockquotes();
});

function updateThemeToggleText() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? 'Light' : 'Dark';
}

// Improved table of contents with inline toggles
function generateTableOfContents() {
    const tocContent = document.getElementById('toc-content');
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
    if (!tocContent || headings.length === 0) return;

    const ul = document.createElement('ul');
    ul.className = 'toc-root';
    let lastH1Li = null;
    let lastH2Li = null;

    headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `heading-${index}`;
        const level = heading.tagName.toLowerCase();
        const li = document.createElement('li');
        li.className = `toc-item toc-${level}`;
        
        if (level === 'h1') {
            // Create the link with inline toggle
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.className = 'toc-link';
            
            // Create toggle button
            const toggle = document.createElement('button');
            toggle.className = 'toc-toggle';
            toggle.innerHTML = '▼';
            toggle.setAttribute('aria-label', 'Toggle subsection');
            
            // Create text span
            const textSpan = document.createElement('span');
            textSpan.textContent = heading.textContent;
            
            // Append toggle and text to link
            a.appendChild(toggle);
            a.appendChild(textSpan);
            
            // Create sublist
            const subUl = document.createElement('ul');
            subUl.className = 'toc-sublist';
            subUl.style.display = 'block';
            
            // Toggle functionality
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isHidden = subUl.style.display === 'none';
                subUl.style.display = isHidden ? 'block' : 'none';
                toggle.innerHTML = isHidden ? '▼' : '▶';
                toggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
            });
            
            li.appendChild(a);
            li.appendChild(subUl);
            ul.appendChild(li);
            lastH1Li = li;
            lastH2Li = null;
            
        } else if (level === 'h2' && lastH1Li) {
            const parentSub = lastH1Li.querySelector('ul.toc-sublist');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.className = 'toc-link';
            a.textContent = heading.textContent;
            
            li.appendChild(a);
            
            // Create sub-sublist for h3s
            const subSubUl = document.createElement('ul');
            subSubUl.className = 'toc-sublist toc-sublist-2';
            subSubUl.style.display = 'block';
            li.appendChild(subSubUl);
            
            parentSub.appendChild(li);
            lastH2Li = li;
            
        } else if (level === 'h3' && lastH2Li) {
            const subSub = lastH2Li.querySelector('ul.toc-sublist-2');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.className = 'toc-link';
            a.textContent = heading.textContent;
            
            li.appendChild(a);
            subSub.appendChild(li);
        }
    });

    tocContent.innerHTML = '';
    tocContent.appendChild(ul);
    
    // Add active link highlighting based on scroll position
    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);
}

// Highlight the active section based on scroll position
function highlightActiveSection() {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (!headings.length || !tocLinks.length) return;
    
    let current = '';
    const scrollPosition = window.scrollY + 120; // Offset for header
    
    headings.forEach(heading => {
        if (heading.offsetTop <= scrollPosition) {
            current = heading.id;
        }
    });
    
    // Remove active class from all links
    tocLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current link
    if (current) {
        const activeLink = document.querySelector(`.toc-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Scroll the active link into view within the TOC
            const tocContainer = document.querySelector('.toc');
            if (tocContainer) {
                const linkRect = activeLink.getBoundingClientRect();
                const tocRect = tocContainer.getBoundingClientRect();
                
                if (linkRect.top < tocRect.top || linkRect.bottom > tocRect.bottom) {
                    activeLink.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }
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

// Add copy buttons to all code blocks
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.prose pre');
    codeBlocks.forEach((block, index) => {
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
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Copied!
                `;
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="m5 15-4-4c0-1.1.9-2 2-2h4"></path>
                        </svg>
                        Copy
                    `;
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Copied!
                `;
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="m5 15-4-4c0-1.1.9-2 2-2h4"></path>
                        </svg>
                        Copy
                    `;
                    copyButton.classList.remove('copied');
                }, 2000);
            }
        });
        wrapper.appendChild(copyButton);
    });
}

// Enhance blockquotes (your prep sections)
function enhanceBlockquotes() {
    const blockquotes = document.querySelectorAll('.prose blockquote');
    blockquotes.forEach(blockquote => {
        const firstH1 = blockquote.querySelector('h1');
        if (firstH1 && firstH1.textContent.includes('Pre-Class Prep')) {
            blockquote.classList.add('prep-section');
        }
    });
}