# Checklist Buddy

Checklist Buddy is a web-based tool designed for pilots to create and use interactive checklists for flight procedures. It features realistic toggle switches with a brushed steel/carbon fiber backdrop, making it both functional and visually appealing for cockpit use.

## Features

- **Interactive Toggle Switches**: Realistic toggle switches that can be flipped up or down
- **Horizontal Layout**: All switches are arranged in a single horizontal line for easy scanning
- **Auto-scaling**: Switches automatically scale to fit all items on screen at once
- **Markdown-Based Configuration**: Create and customize checklists using simple markdown syntax
- **Bulk Controls**: Toggle all switches up or down with a single click
- **Responsive Design**: Works on various devices including tablets commonly used in cockpits
- **Green Indicator Lights**: Both indicator lights are green for better visibility in cockpit environments
- **Optimized Spacing**: Reduced space between LEDs and labels for a more compact display
- **Enhanced Typography**: Larger label text for better readability in cockpit conditions

## How to Use

1. Open `index.html` in your web browser
2. The default checklist (Cessna 172 Takeoff) will be loaded automatically
3. Use the toggle switches to mark items as completed
4. To create your own checklist, edit the markdown in the text area and click "Generate Checklist"

## Markdown Format

The application uses a simple markdown format to define checklists:

```markdown
# Checklist Title
- Item Name | Item State
- Another Item | REQUIRED STATE
```

For example:

```markdown
# Cessna 172 Takeoff Checklist
- Fuel Selector | BOTH
- Mixture | RICH
- Carburetor Heat | OFF
```

Each line starting with a dash (-) creates a new toggle switch. The text before the pipe symbol (|) becomes the top label, and the text after becomes the bottom label.

## Browser Compatibility

Checklist Buddy works best in modern browsers such as:
- Chrome
- Firefox
- Safari
- Edge

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).

[![CC BY-NC 4.0](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)

This means you are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- NonCommercial — You may not use the material for commercial purposes.

## Credits

- Toggle switch design from [Uiverse.io by csemszepp](https://uiverse.io)
- Developed for pilots by pilots 