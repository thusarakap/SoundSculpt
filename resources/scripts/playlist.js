// Select the file input, playlist, and audio player
const fileInput = document.getElementById('audioFilesInput');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');

// Create an array to store the audio files
let audioFiles = [];

// Create an audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an audio source
let audioSource = audioContext.createMediaElementSource(audioPlayer);

// Create seven BiquadFilterNode objects for the seven frequencies
const filters = [
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter(),
    audioContext.createBiquadFilter()
];

// Set the type and frequency of each filter
const frequencies = [60, 150, 400, 1000, 3000, 8000, 16000];
filters.forEach((filter, i) => {
    filter.type = 'peaking';
    filter.frequency.value = frequencies[i];
});

// Connect the filters in series
filters.reduce((prev, curr) => prev.connect(curr), audioSource).connect(audioContext.destination);

// Add a 'change' event listener to the file input
fileInput.addEventListener('change', function(event) {
    // Clear the playlist
    playlist.innerHTML = '';

    // Store the selected files in the audioFiles array
    audioFiles = Array.from(event.target.files);

    // Create a list item for each audio file and add it to the playlist
    audioFiles.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.addEventListener('click', function() {
            playAudio(index);
        });
        playlist.appendChild(listItem);
    });

    // Play the first audio file
    playAudio(0);
});

let currentIndex = 0; // Add this line to keep track of the current index

function playAudio(index) {
    // Create a Blob URL from the audio file
    const audioURL = URL.createObjectURL(audioFiles[index]);

    // Set the Blob URL as the source of the audio player
    audioPlayer.src = audioURL;

    // Load and play the audio player
    audioPlayer.load();
    audioPlayer.play();

    currentIndex = index; // Update the current index every time a new song is played
}

// Add an 'ended' event listener to the audio player to play the next audio file when one ends
audioPlayer.addEventListener('ended', function() {
    // If there is a next audio file, play it
    if (currentIndex + 1 < audioFiles.length) {
        playAudio(currentIndex + 1);
    } else {
        // If there is no next audio file, reset the audio player
        audioPlayer.src = '';
    }
});

// Load the equalizer settings from local storage when the page loads
window.addEventListener('load', function() {
    const savedRanges = localStorage.getItem('equalizerSettings');
    let ranges;
    if (savedRanges) {
      ranges = JSON.parse(savedRanges);
      console.log("Imported ranges:", ranges); // Log the imported ranges
    }

    console.log("Filters before update:", filters);
    console.log("Ranges before update:", ranges);

// Update the filters with the loaded settings
for (let i = 0; i < filters.length; i++) {
    let gainValue = ranges ? (ranges[`range${i + 1}`] / 100) * 30 - 15 : 0;
    filters[i].gain.value = gainValue;
    console.log(`Filter ${i+1} Frequency: ${filters[i].frequency.value}, Gain: ${filters[i].gain.value}`); // Log the frequency and gain
}
});