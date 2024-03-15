// Select the canvas
const canvas = document.getElementById('waveformCanvas');
const canvasContext = canvas.getContext('2d');

// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an analyser node
const analyser = audioContext.createAnalyser();

// Create a buffer source
const source = audioContext.createBufferSource();

// Connect the source to the analyser and the analyser to the destination
source.connect(analyser);
analyser.connect(audioContext.destination);

// Load the audio file
fetch('../resources/audio/Tones.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        source.buffer = audioBuffer;

        // Add a 'click' event listener to the button
        playAudioButton.addEventListener('click', function() {
            // Play the audio
            source.start(0);

            // Call the draw function
            draw();
        });
    });

// Set the size of the canvas
canvas.width = 800; // Width in pixels
canvas.height = 400; // Height in pixels

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

