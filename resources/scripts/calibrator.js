// Select the canvas
const canvas = document.getElementById('waveformCanvas');
const canvasContext = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 775; 
canvas.height = 325; 

// Create a linear gradient
const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#dd0d5d'); // Color at the start of the gradient
gradient.addColorStop(1, '#484cb6'); // Color at the end of the gradient

// Set the style of the waveform
canvasContext.strokeStyle = gradient; // Color of the waveform
canvasContext.lineWidth = 8; // Width of the waveform

// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an analyser node
const analyser = audioContext.createAnalyser();

// Select the audio element
const audio = document.querySelector('audio');

// Connect the audio element's source to the analyser and the analyser to the destination
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Select the elapsed time element
const elapsedTimeElement = document.getElementById('frequencyValue');

// Add a 'timeupdate' event listener to the audio
audio.addEventListener('timeupdate', function() {
    // Calculate the elapsed time in seconds
    const elapsedTime = Math.floor(audio.currentTime);

    // Determine the message to display based on the elapsed time
    let message;
    if (elapsedTime >= 0 && elapsedTime <= 8) {
        message = '60Hz';
    } else if (elapsedTime >= 12 && elapsedTime <= 18) {
        message = '150Hz';
    } else {
        message = '';
    }

    // Update the elapsed time element
    elapsedTimeElement.textContent = message;
});

// Select the start calibration button
const startButton = document.getElementById('startCalibration');

// Add a 'click' event listener to the start calibration button
startButton.addEventListener('click', function() {
    // Play the audio
    audio.play();

    // Call the draw function
    draw();
});

// Function to draw the waveform
function draw() {
    // Get the time domain data
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the waveform
    canvasContext.beginPath();
    data.forEach((item, index) => {
        const y = item / 255.0 * canvas.height;
        if (index === 0) {
            canvasContext.moveTo(index, y);
        } else {
            canvasContext.lineTo(index, y);
        }
    });
    canvasContext.stroke();

    // Call the draw function again on the next animation frame
    requestAnimationFrame(draw);
}

// Select the cancel calibration button
const cancelButton = document.getElementById('cancelCalibration');

// Add a 'click' event listener to the cancel calibration button
cancelButton.addEventListener('click', function() {
    // Pause the audio
    audio.pause();

    // Reset the current time to 0
    audio.currentTime = 0;
});