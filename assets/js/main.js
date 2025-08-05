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

// Generate table of contents with expand/collapse
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
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.className = 'toc-link';

        if (level === 'h1') {
            const toggle = document.createElement('button');
            toggle.className = 'toc-toggle';
            toggle.textContent = '▼';
            const subUl = document.createElement('ul');
            subUl.className = 'toc-sublist';
            subUl.style.display = 'block';
            toggle.addEventListener('click', () => {
                const isHidden = subUl.style.display === 'none';
                subUl.style.display = isHidden ? 'block' : 'none';
                toggle.textContent = isHidden ? '▼' : '▶';
            });
            li.appendChild(toggle);
            li.appendChild(a);
            li.appendChild(subUl);
            ul.appendChild(li);
            lastH1Li = li;
            lastH2Li = null;
        } else if (level === 'h2' && lastH1Li) {
            const parentSub = lastH1Li.querySelector('ul.toc-sublist');
            parentSub.appendChild(li);
            li.appendChild(a);
            const subSubUl = document.createElement('ul');
            subSubUl.className = 'toc-sublist toc-sublist-2';
            subSubUl.style.display = 'block';
            li.appendChild(subSubUl);
            lastH2Li = li;
        } else if (level === 'h3' && lastH2Li) {
            const subSub = lastH2Li.querySelector('ul.toc-sublist-2');
            subSub.appendChild(li);
            li.appendChild(a);
        }
    });

    tocContent.innerHTML = '';
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

// Add styles for enhanced functionality
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
    /* Contrast & toggle styling */
    .toc-toggle {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        margin-right: 0.25rem;
    }
    .toc-item.toc-h1 > .toc-link {
        font-weight: bold;
        color: var(--text-primary);
    }
    .toc-item.toc-h2 > .toc-link {
        font-weight: 500;
        color: var(--text-secondary);
        padding-left: 0.5rem;
    }
    .toc-item.toc-h3 > .toc-link {
        font-weight: 500;
        color: var(--text-tertiary);
        padding-left: 1rem;
    }
    ul.toc-root,
    ul.toc-sublist,
    ul.toc-sublist-2 {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .prep-section {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
        border-left-color: var(--accent) !important;
    }
    .prep-section::before {
        content: '📚' !important;
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
        .copy-button {
            top: 0.5rem;
            right: 0.5rem;
            font-size: 0.7rem;
        }
    }
`;
document.head.appendChild(style);