// Select the button
const playAudioButton = document.getElementById('playAudioButton');

// Create a new Audio object
const audio = new Audio('../resources/audio/Tones.mp3');

// Add a 'click' event listener to the button
playAudioButton.addEventListener('click', function() {
    // Play the audio
    audio.play();
});

