// protect-content.js
(function() {
    'use strict';

    // Configuration - Easily adjust protection levels
    const config = {
        blockRightClick: true,      // Block right-click context menu
        blockKeyboardShortcuts: true, // Block dev tools shortcuts
        blockTextSelection: true,    // Prevent text selection
        blockCopyPaste: true,        // Prevent copy/cut actions  
        blockImageDrag: true,        // Prevent image dragging
        blockPrinting: true,          // Disable printing
        allowConsoleDuringDev: false, // Keep console disabled even in dev
        showWarning: false           // Don't show alerts, just block silently
    };

    // Custom message for console (only shows if console is used)
    const consoleMessage = 'This website is protected. If you\'re interested in the code, please visit: https://github.com/thesiddique-0625';

    // Block right-click silently
    if (config.blockRightClick) {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    }

    // Block keyboard shortcuts silently
    if (config.blockKeyboardShortcuts) {
        document.addEventListener('keydown', function(e) {
            // Block F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl+Shift+I (DevTools)
            if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) || 
                (e.metaKey && e.altKey && e.keyCode === 73)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl+U (View Source)
            if (e.ctrlKey && (e.key === 'u' || e.keyCode === 85)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl+S (Save)
            if (e.ctrlKey && (e.key === 's' || e.keyCode === 83)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Print Screen
            if (e.key === 'PrintScreen' || e.keyCode === 44) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
    }

    // Block copy/cut if enabled
    if (config.blockCopyPaste) {
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        document.addEventListener('cut', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    }

    // Block text selection if enabled
    if (config.blockTextSelection) {
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        }, false);
    }

    // Block drag and drop for images
    if (config.blockImageDrag) {
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
    }

    // Apply protections on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Make images non-draggable
        if (config.blockImageDrag) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.setAttribute('draggable', 'false');
            });
        }
        
        // Add CSS protection styles
        const style = document.createElement('style');
        
        // Build CSS based on configuration
        let cssContent = '/* Portfolio Protection Styles */\n';
        
        if (config.blockTextSelection) {
            cssContent += `
                /* Prevent text selection on non-interactive elements */
                body, div, p, h1, h2, h3, h4, h5, h6, span, li, td, th, section, article {
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                }
                
                /* Allow text selection in code blocks (for developer portfolio) */
                pre, code, .code-block {
                    -webkit-user-select: text !important;
                    -moz-user-select: text !important;
                    -ms-user-select: text !important;
                    user-select: text !important;
                }
                
                /* Allow selection in form elements */
                input, textarea {
                    -webkit-user-select: text !important;
                    -moz-user-select: text !important;
                    -ms-user-select: text !important;
                    user-select: text !important;
                }
            `;
        }
        
        if (config.blockImageDrag) {
            cssContent += `
                img {
                    -webkit-user-drag: none !important;
                    -moz-user-drag: none !important;
                    -ms-user-drag: none !important;
                    user-drag: none !important;
                    pointer-events: none !important;
                }
            `;
        }
        
        // Preserve all interactive hover effects for your portfolio
        cssContent += `
            /* Keep all your existing hover effects - These are important for UX */
            *:hover {
                cursor: default !important;
            }
            
            /* Allow button and link interactions */
            .btn:hover, a:hover, button:hover, 
            .nav-link:hover, .social-link:hover,
            .project-card:hover, .skill-tag:hover {
                cursor: pointer !important;
            }
            
            /* Preserve your button animations */
            .btn-primary:hover {
                background-color: var(--primary-dark) !important;
                transform: translateY(-3px) !important;
                box-shadow: var(--shadow) !important;
                cursor: pointer !important;
            }
            
            .btn-outline:hover {
                background-color: var(--primary) !important;
                color: var(--light) !important;
                cursor: pointer !important;
            }
            
            /* Keep your card animations */
            .project-card:hover, .team-member:hover,
            .value-card:hover, .approach-item:hover {
                transform: translateY(-10px) !important;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
            }
            
            /* Mission/vision boxes */
            .mission-box:hover, .vision-box:hover {
                transform: translateY(-10px) !important;
                cursor: pointer !important;
            }
            
            /* Navigation and links */
            nav ul li a:hover,
            .footer-links ul li a:hover {
                color: var(--primary) !important;
                cursor: pointer !important;
            }
            
            /* Social links */
            .social-links a:hover,
            .member-social a:hover {
                background-color: var(--primary) !important;
                transform: translateY(-5px) !important;
                cursor: pointer !important;
            }
        `;
        
        // Add print protection if enabled
        if (config.blockPrinting) {
            cssContent += `
                @media print {
                    body * {
                        visibility: hidden !important;
                        display: none !important;
                    }
                    
                    body::after {
                        content: "© ${new Date().getFullYear()} Your Name - All Rights Reserved";
                        display: block;
                        visibility: visible !important;
                        text-align: center;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                }
            `;
        }
        
        // Add selection color override
        cssContent += `
            /* Custom selection color - makes it look intentional */
            ::selection {
                background: rgba(var(--primary-rgb), 0.2) !important;
                color: inherit !important;
            }
            
            ::-moz-selection {
                background: rgba(var(--primary-rgb), 0.2) !important;
                color: inherit !important;
            }
        `;
        
        style.textContent = cssContent;
        document.head.appendChild(style);
    });

    // Disable console functions with custom message
    (function() {
        if (!config.allowConsoleDuringDev) {
            const noop = function(){};
            const methods = [
                'log', 'debug', 'info', 'warn', 'error', 'assert', 
                'clear', 'dir', 'dirxml', 'trace', 'group', 'groupCollapsed', 
                'groupEnd', 'time', 'timeEnd', 'timeStamp', 'profile', 
                'profileEnd', 'count', 'exception', 'table'
            ];
            
            // Override console methods
            methods.forEach(function(method) {
                window.console[method] = noop;
            });
            
            // Add a friendly message if someone tries to use console
            Object.defineProperty(window.console, 'log', {
                get: function() {
                    console.log(consoleMessage);
                    return function() {};
                }
            });
        }
    })();

    // Detect iframe embedding
    if (window.top !== window.self) {
        // Redirect to main page or show blank
        window.top.location.href = window.self.location.href;
    }

    // Add your GitHub/profile link for interested developers
    const footerNote = document.createElement('div');
    footerNote.style.display = 'none';
    footerNote.setAttribute('data-developer-note', 'Interested in this code? Visit: https://github.com/thesiddique-0625');
    document.body.appendChild(footerNote);

})();