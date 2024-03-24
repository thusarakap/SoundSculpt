const fs = require('fs');
const path = require('path');

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
    if (elapsedTime >= 0 && elapsedTime <= 10) {
        message = '80Hz';
    } else if (elapsedTime >= 11 && elapsedTime <= 20) {
        message = '150Hz';
    } else if (elapsedTime >= 21 && elapsedTime <= 30) {
        message = '220Hz';
    } else if (elapsedTime >= 31 && elapsedTime <= 40) {
        message = '440Hz';
    } else if (elapsedTime >= 41 && elapsedTime <= 50) {
        message = '1000Hz';
    } else if (elapsedTime >= 51 && elapsedTime <= 60) {
        message = '3000Hz';
    } else if (elapsedTime >= 61 && elapsedTime <= 70) {
        message = '11000Hz';
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



document.getElementById('getCalibratedProfile').addEventListener('click', function() {
    // Get 'userId' from the localStorage
    const userId = localStorage.getItem('userId');

    // Get user data from Realtime Database
    const db = firebase.database();
    db.ref('users/' + userId).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        let userData = snapshot.val();
        console.log("dBValues:", userData.dBValues);
        console.log("Speaker Type:", userData.speakerType);
    
        // Convert dBValues to an array of floats
        if (typeof userData.dBValues === 'string') {
            userData.dBValues = userData.dBValues.split(',').map(value => parseFloat(value));
        }
    
        // Save userData to a JSON file
        fs.writeFile(path.join(__dirname, '..', 'resources', 'data', 'userData.json'), JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            }
        });
    
        // Check if dBValues and speakerType are not empty
        if (userData.dBValues && userData.speakerType) {
            // If they are not empty, redirect to home.html
            location.replace("home.html");
        } else {
            // If they are empty, redirect to calibration.html
            location.replace("calibrator.html");
        }
    } else {
        // If user doesn't exist in the database, redirect to calibration.html
        location.replace("calibrator.html");
    }
    }).catch((error) => {
        console.log("Error getting user data:", error);
        passwordField.insertAdjacentHTML('afterend', `<p class="error-message" style="margin-left: 1px;">${error.message}</p>`);
    });
  })
  .catch((error) => {
    const errorMessage = error.message;
    passwordField.insertAdjacentHTML('afterend', `<p class="error-message" style="margin-left: 1px;">${errorMessage}</p>`);
  });
