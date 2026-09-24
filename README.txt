I Ching modern redesign

Open index.html in a browser.

This build keeps the redesigned interface local, but loads the original I Ching
logic and text directly from the public gultar/iching GitHub repository via
jsDelivr. This avoids missing-file errors when testing the redesign locally.

Files included:
- index.html
- css/styles.css

Internet access is required when opening index.html locally because the original
JavaScript files and jQuery are loaded over HTTPS. Once deployed back to the
GitHub repository, you can switch the two jsDelivr script URLs at the bottom of
index.html back to ./js/yijing.js and ./js/eventHandler.js if desired.
