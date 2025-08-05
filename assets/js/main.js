// =============================================================================
// ENHANCED TABLE OF CONTENTS (IMPROVED VERSION WITH BETTER ARROW POSITIONING)
// =============================================================================
// Replace the existing generateEnhancedTableOfContents function in main.js

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
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = 'toc-link toc-main-link';
            
            const arrow = document.createElement('span');
            arrow.className = 'toc-arrow';
            arrow.innerHTML = '▼';
            
            // Create container for link and arrow
            const linkContainer = document.createElement('div');
            linkContainer.className = 'toc-section-header';
            linkContainer.appendChild(link);
            linkContainer.appendChild(arrow);
            
            li.appendChild(linkContainer);
            
            // Create sub-list for h2, h3, h4 under this h1
            currentSubList = document.createElement('ul');
            currentSubList.className = 'toc-sublist';
            li.appendChild(currentSubList);
            
            // Add click handler for collapsing/expanding (only on arrow)
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
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
            // H2 are sub-items under H1
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