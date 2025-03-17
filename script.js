document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const markdownInput = document.getElementById('markdownInput');
    const generateButton = document.getElementById('generateChecklist');
    const switchesContainer = document.getElementById('switchesContainer');
    const toggleAllUpButton = document.getElementById('toggleAllUp');
    const toggleAllDownButton = document.getElementById('toggleAllDown');

    // Sample markdown for initial load
    const sampleMarkdown = `# Cessna 172 Takeoff Checklist
- Fuel Selector | BOTH
- Mixture | RICH
- Carburetor Heat | OFF
- Throttle | 1700 RPM
- Flight Instruments | CHECK
- Flight Controls | FREE & CORRECT
- Elevator Trim | TAKEOFF
- Doors & Windows | CLOSED & LOCKED
- Transponder | ALT`;

    markdownInput.value = sampleMarkdown;

    // Generate checklist on page load with sample data
    generateChecklistFromMarkdown(sampleMarkdown);

    // Event Listeners
    generateButton.addEventListener('click', function() {
        const markdown = markdownInput.value;
        generateChecklistFromMarkdown(markdown);
    });

    toggleAllUpButton.addEventListener('click', function() {
        toggleAllSwitches(true);
    });

    toggleAllDownButton.addEventListener('click', function() {
        toggleAllSwitches(false);
    });

    /**
     * Parse markdown and generate checklist switches
     * @param {string} markdown - The markdown text to parse
     */
    function generateChecklistFromMarkdown(markdown) {
        // Clear existing switches
        switchesContainer.innerHTML = '';
        
        // Find title element outside the container
        const titleContainer = document.getElementById('checklistTitleContainer');
        if (titleContainer) {
            titleContainer.innerHTML = '';
        }

        // Parse markdown
        const lines = markdown.split('\n');
        let title = '';
        const items = [];

        lines.forEach(line => {
            // Check if it's a title (starts with #)
            if (line.startsWith('#')) {
                title = line.substring(1).trim();
            } 
            // Check if it's a list item (starts with -)
            else if (line.startsWith('-')) {
                const itemContent = line.substring(1).trim();
                
                // Split by pipe symbol to get top and bottom labels
                if (itemContent.includes('|')) {
                    const [topLabel, bottomLabel] = itemContent.split('|').map(part => part.trim());
                    items.push({ topLabel, bottomLabel });
                }
            }
        });

        // Create title element outside the switches container
        if (title) {
            // Check if title container exists, if not create it
            let titleContainer = document.getElementById('checklistTitleContainer');
            if (!titleContainer) {
                titleContainer = document.createElement('div');
                titleContainer.id = 'checklistTitleContainer';
                titleContainer.style.textAlign = 'center';
                titleContainer.style.marginBottom = '10px';
                
                // Insert before the checklist container
                const checklistContainer = document.querySelector('.checklist-container');
                checklistContainer.parentNode.insertBefore(titleContainer, checklistContainer);
            }
            
            const titleElement = document.createElement('h2');
            titleElement.textContent = title;
            titleElement.className = 'checklist-title';
            titleElement.style.color = '#2c3e50';
            titleElement.style.fontSize = '2rem';
            titleElement.style.fontWeight = 'bold';
            titleElement.style.margin = '0';
            titleContainer.appendChild(titleElement);
        }

        // Create a container for the switches to ensure horizontal layout
        const switchesRow = document.createElement('div');
        switchesRow.className = 'switches-row';
        switchesRow.style.display = 'flex';
        switchesRow.style.flexWrap = 'nowrap';
        switchesRow.style.justifyContent = 'center';
        switchesRow.style.gap = '10px';
        switchesRow.style.width = '100%';
        switchesRow.style.overflowX = 'auto';
        switchesContainer.appendChild(switchesRow);

        // Create switches for each item
        items.forEach((item, index) => {
            const switchWrapper = document.createElement('div');
            switchWrapper.className = 'switch-wrapper';
            switchWrapper.style.margin = '5px';
            switchWrapper.style.width = '120px';
            switchWrapper.style.flexShrink = '0';

            // Top label
            const topLabelElement = document.createElement('div');
            topLabelElement.className = 'switch-label-top';
            topLabelElement.textContent = item.topLabel;
            topLabelElement.style.fontSize = '1.2rem';
            topLabelElement.style.margin = '5px 0';
            topLabelElement.style.height = '40px';
            switchWrapper.appendChild(topLabelElement);

            // Switch
            const switchElement = document.createElement('span');
            switchElement.className = 'switch';
            switchElement.style.margin = '3em 1em';
            switchElement.style.transform = 'scale(0.65)';
            switchElement.innerHTML = `
                <span class="switch-border1">
                    <span class="switch-border2">
                        <input type="checkbox" id="switch${index}">
                        <label for="switch${index}"></label>
                        <span class="switch-top"></span>
                        <span class="switch-shadow"></span>
                        <span class="switch-handle"></span>
                        <span class="switch-handle-left"></span>
                        <span class="switch-handle-right"></span>
                        <span class="switch-handle-top"></span>
                        <span class="switch-handle-bottom"></span>
                        <span class="switch-handle-base"></span>
                        <span class="switch-led switch-led-green" style="top: -3.5em;">
                            <span class="switch-led-border">
                                <span class="switch-led-light">
                                    <span class="switch-led-glow"></span>
                                </span>
                            </span>
                        </span>
                        <span class="switch-led switch-led-red" style="bottom: -3.5em;">
                            <span class="switch-led-border">
                                <span class="switch-led-light">
                                    <span class="switch-led-glow"></span>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
            `;
            switchWrapper.appendChild(switchElement);

            // Bottom label
            const bottomLabelElement = document.createElement('div');
            bottomLabelElement.className = 'switch-label-bottom';
            bottomLabelElement.textContent = item.bottomLabel;
            bottomLabelElement.style.fontSize = '1.2rem';
            bottomLabelElement.style.margin = '5px 0';
            bottomLabelElement.style.height = '40px';
            switchWrapper.appendChild(bottomLabelElement);

            // Add to container
            switchesRow.appendChild(switchWrapper);
        });

        // Auto-scale switches based on number of items
        autoScaleSwitches(items.length);
    }

    /**
     * Toggle all switches to a specific state
     * @param {boolean} checked - Whether to check or uncheck all switches
     */
    function toggleAllSwitches(checked) {
        const switches = document.querySelectorAll('.switch input[type="checkbox"]');
        switches.forEach(switchInput => {
            switchInput.checked = checked;
        });
    }

    /**
     * Auto-scale switches based on the number of items
     * @param {number} itemCount - Number of checklist items
     */
    function autoScaleSwitches(itemCount) {
        const switchesRow = document.querySelector('.switches-row');
        if (!switchesRow) return;

        // Remove any existing auto-scale classes
        for (let i = 1; i <= 15; i++) {
            switchesRow.classList.remove(`auto-scale-${i}`);
        }

        // Calculate container width and available width per switch
        const containerWidth = switchesRow.offsetWidth;
        const screenWidth = window.innerWidth;
        const minSwitchWidth = 100; // Minimum width for a switch including margins
        
        // Determine scale factor based on number of items and container width
        let scaleFactor = 0.65; // Default scale
        
        if (itemCount > 0) {
            const availableWidthPerSwitch = Math.min(containerWidth / itemCount, screenWidth / itemCount);
            
            if (availableWidthPerSwitch < minSwitchWidth) {
                // Need to scale down
                scaleFactor = Math.max(0.3, availableWidthPerSwitch / minSwitchWidth * 0.65);
            } else if (itemCount <= 5) {
                // Can scale up for few items
                scaleFactor = Math.min(0.8, 0.65 + (5 - itemCount) * 0.05);
            }
        }
        
        // Apply scale to all switches
        const switches = document.querySelectorAll('.switch');
        switches.forEach(switchElem => {
            switchElem.style.transform = `scale(${scaleFactor})`;
        });
        
        // Add appropriate auto-scale class
        if (itemCount > 0 && itemCount <= 15) {
            switchesRow.classList.add(`auto-scale-${itemCount}`);
        }
    }

    // Handle window resize to adjust scaling
    window.addEventListener('resize', function() {
        const items = document.querySelectorAll('.switch-wrapper');
        autoScaleSwitches(items.length);
    });
}); 