pc.script.createLoadingScreen((app) => {
    // Create the main loading screen div with office-themed background
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // Dark gray base
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.fontFamily = "'Arial', sans-serif"; // Clean office font
    document.body.appendChild(div);

    // Add game title with cool animation
    const title = document.createElement('h1');
    title.textContent = "Office Runner";
    title.style.color = "#9F5A5A"; // Your color scheme for title
    title.style.fontSize = "48px";
    title.style.marginBottom = "20px";
    title.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)"; // Shadow for depth
    title.style.animation = "pulse 1.5s infinite"; // Pulsing effect
    div.appendChild(title);

    // Add loading text
    const loadingText = document.createElement('p');
    loadingText.textContent = "Loading...";
    loadingText.style.color = "#ffffff";
    loadingText.style.fontSize = "24px";
    loadingText.style.marginBottom = "10px";
    div.appendChild(loadingText);

    // Create the progress bar container
    const progressBar = document.createElement('div');
    progressBar.style.width = "50%";
    progressBar.style.height = "30px"; // Thicker bar for better visibility
    progressBar.style.backgroundColor = "#d3d3d3"; // Light gray background
    progressBar.style.borderRadius = "15px"; // Rounded corners for modern look
    progressBar.style.overflow = "hidden";
    progressBar.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)"; // Shadow for depth
    div.appendChild(progressBar);

    // Create the progress filler with gradient and animation
    const progressFiller = document.createElement('div');
    progressFiller.style.height = "100%";
    progressFiller.style.background = "linear-gradient(to right, #9F5A5A, #c97b7b)"; // Gradient based on your color scheme
    progressFiller.style.width = "0%";
    progressFiller.style.transition = "width 0.3s ease-in-out"; // Smooth transition
    progressBar.appendChild(progressFiller);

    // Add percentage text inside the bar
    const percentage = document.createElement('div');
    percentage.style.position = "absolute";
    percentage.style.top = "50%";
    percentage.style.left = "50%";
    percentage.style.transform = "translate(-50%, -50%)";
    percentage.style.color = "#ffffff";
    percentage.style.fontSize = "16px";
    percentage.style.fontWeight = "bold";
    div.appendChild(percentage); // Append to div for centering over bar

    // Update progress
    app.on('preload:progress', (value) => {
        const progress = Math.floor(value * 100);
        progressFiller.style.width = progress + '%';
        percentage.textContent = progress + '%';
    });

    // Cleanup on preload end
    app.once('preload:end', () => {
        app.off('preload:progress');
    });

    // Remove loading screen on start with fade out
    app.once('start', () => {
        div.style.transition = "opacity 0.5s";
        div.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 500);
    });

    // Add CSS keyframes for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});
