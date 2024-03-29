// Select the file input and audio player
const fileInput = document.getElementById('audioFileInput');
const audioPlayer = document.getElementById('demoAudioPlayer');
const audioFileInputLabel = document.querySelector('label[for="audioFileInput"]'); // Select the label

// Add an 'change' event listener to the file input element
fileInput.addEventListener('change', function(event) {
    // Check if a file was selected
    if (event.target.files.length > 0) {
        // Create a Blob URL from the selected file
        const audioURL = URL.createObjectURL(event.target.files[0]);

        // Set the Blob URL as the source of the audio player
        audioPlayer.src = audioURL;

        // Load the audio player
        audioPlayer.load();

        // Change the color of the label when a file is selected
        audioFileInputLabel.style.backgroundColor = '#694079';
    } else {
        // Reset the color of the label when no file is selected
        audioFileInputLabel.style.backgroundColor = '#333';
    }
});

// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an audio source from the audio player
const audioSource = audioContext.createMediaElementSource(audioPlayer);

// Select the gain controls
const gainControls = [
    document.getElementById('gain80'),
    document.getElementById('gain150'),
    document.getElementById('gain220'),
    document.getElementById('gain440'),
    document.getElementById('gain1000'),
    document.getElementById('gain3000'),
    document.getElementById('gain11000')
];

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
const frequencies = [80, 150, 220, 440, 1000, 3000, 11000];
filters.forEach((filter, i) => {
    filter.type = 'peaking';
    filter.frequency.value = frequencies[i];
});

// Create a GainNode for the volume control
const volumeGainNode = audioContext.createGain();

// Get the volume slider element
const volumeSlider = document.querySelector('#volume');

// Add an 'input' event listener to the slider
volumeSlider.addEventListener('input', function() {
    // Get the value of the slider
    const value = this.value;

    // Convert the value to a volume level (range 0 to 1)
    const volume = value / 100;

    // Set the gain value of the GainNode
    volumeGainNode.gain.value = volume;
});

// Connect the filters in series (source -> filters -> volumeGainNode -> destination)
let previousNode = audioSource;
filters.forEach((filter) => {
    previousNode.connect(filter);
    previousNode = filter;
});
previousNode.connect(volumeGainNode);

// Connect the volumeGainNode to the AudioContext
volumeGainNode.connect(audioContext.destination);

// Add 'input' event listeners to the gain controls
gainControls.forEach((control, i) => {
  control.addEventListener('input', function() {
      // Get the value of the control
      const value = this.value;

      // Map the range of 0 to 100 to the range of -12 to 12
      const gainValue = (value / 100) * 30 - 15;

      // Set the gain value of the filter
      filters[i].gain.value = gainValue;
  });
});

// String formatter
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

let app = (() => {

  const $svgLine = document.querySelector('svg .line');
  const sliderThumbSize = 20;
  const sliderHeight = 300;
  const svgViewBoxHeight = 100;
  const svgViewBoxThumbLimit = (sliderThumbSize / 2) * (svgViewBoxHeight / sliderHeight);
  const svgViewBoxGraphMax = svgViewBoxHeight - svgViewBoxThumbLimit;
  const svgViewBoxGraphMin = svgViewBoxThumbLimit;

  let ranges = {
    range1: null,
    range2: null,
    range3: null,
    range4: null,
    range5: null,
    range6: null,
    range7: null
  };
  // Only the y values changes
  let points = {
    begin: {
      x: 10,
      y: 0
    },
    point1: {
      x: 10,
      y: 0
    },
    control1: {
      x: 20,
      y: 10
    },
    control2: {
      x: 20,
      y: 0
    },
    point2: {
      x: 30,
      y: 0
    },
    control3: {
      x: 40,
      y: 0
    },
    point3: {
      x: 50,
      y: 0
    },
    control4: {
      x: 60,
      y: 0
    },
    point4: {
      x: 70,
      y: 0
    },
    control5: {
      x: 80,
      y: 0
    },
    point5: {
      x: 90,
      y: 0
    },
    control6: {
      x: 100,
      y: 0
    },
    point6: {
      x: 110,
      y: 0
    },
    control7: {
      x: 120,
      y: 0
    },
    point7: {
      x: 130,
      y: 0
    },
  };

  function mapDataRange(value) {
    // stackoverflow.com/a/929107/5707008
    // return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
    return (((value - 0) * (svgViewBoxGraphMax - svgViewBoxGraphMin)) / (svgViewBoxHeight - 0)) + svgViewBoxGraphMin;
  }

  function updateSlider($element) {
    if ($element) {

      let rangeIndex = $element.getAttribute('data-slider-index'),
        range = ranges[rangeIndex],
        value = $element.value;

      if (range === value) {
        return; // No value change, no need to update then
      }
      // Update state
      ranges[rangeIndex] = value;

       // Save ranges to local storage
       localStorage.setItem('equalizerSettings', JSON.stringify(ranges));

      let parent = $element.parentElement,
        $thumb = parent.querySelector('.range-slider__thumb'),
        $bar = parent.querySelector('.range-slider__bar'),
        pct = value * ((sliderHeight - sliderThumbSize) / sliderHeight)

      $thumb.style.bottom = `${pct}%`;
      $bar.style.height = `calc(${pct}% + ${sliderThumbSize/2}px)`;
      //$thumb.textContent = `${value}%`;

      renderSliderGraph();
    }
  }

  function updatePoints() {
    // Convert from percentage to coordinate values    
    // Calculate and floor the values
    points.point1.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range1) / 100) | 0;
    points.point2.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range2) / 100) | 0;
    points.point3.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range3) / 100) | 0;
    points.point4.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range4) / 100) | 0;
    points.point5.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range5) / 100) | 0;
    points.point6.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range6) / 100) | 0;
    points.point7.y = svgViewBoxHeight - (svgViewBoxHeight * (ranges.range7) / 100) | 0;

    const max = svgViewBoxGraphMax;
    const min = svgViewBoxGraphMin;

    points.point1.y = mapDataRange(points.point1.y);
    points.point2.y = mapDataRange(points.point2.y);
    points.point3.y = mapDataRange(points.point3.y);
    points.point4.y = mapDataRange(points.point4.y);
    points.point5.y = mapDataRange(points.point5.y);
    points.point6.y = mapDataRange(points.point6.y);
    points.point7.y = mapDataRange(points.point7.y);

    // Update Y for the other points
    points.begin.y = points.point1.y;
    points.control1.y = points.point1.y;
    points.control2.y = points.point2.y;
    points.control3.y = points.point3.y;
    points.control4.y = points.point4.y;
    points.control5.y = points.point5.y;
    points.control6.y = points.point6.y;
    points.control7.y = points.point7.y;
  }

  function getInterpolatedLine(type) {
    let shadowOffset = 0;
    return `M ${points.begin.x},${points.begin.y} L ${points.point1.x},${points.point1.y} C ${points.control1.x},${points.control1.y} ${points.control2.x},${points.control2.y + shadowOffset} ${points.point2.x},${points.point2.y + shadowOffset} S ${points.control3.x} ${points.control3.y} ${points.point3.x},${points.point3.y} S ${points.control4.x},${points.control4.y + shadowOffset} ${points.point4.x},${points.point4.y + shadowOffset} S ${points.control5.x},${points.control5.y} ${points.point5.x},${points.point5.y} S ${points.control6.x},${points.control6.y + shadowOffset} ${points.point6.x},${points.point6.y + shadowOffset} S ${points.control7.x},${points.control7.y} ${points.point7.x},${points.point7.y}`;
  }

  function reset() {
    const inputs = app.inputs;
    inputs.forEach(input => input.value = 50);
    inputs.forEach(input => app.updateSlider(input));
  }

  function renderSliderGraph() {
    updatePoints();
    $svgLine.setAttribute('d', getInterpolatedLine());

  }

let { calibratedProfile } = require('../resources/scripts/algorithm.js');

function selectPreset(selectElement) {
    // Get the selected preset
    const type = selectElement.value;

    // Define preset values
    const presets = {
        flat: [50, 50, 50, 50, 50, 50, 50],
        bass: [100, 90, 70, 60, 50, 50, 50],
        trebel: [40, 50, 50, 60, 70, 80, 90],
        game: [80, 70, 60, 40, 60, 70, 80],
        vocalBoost: [60, 50, 50, 50, 60, 70, 60],
        acousticEnhance: [50, 65, 80, 80, 65, 60, 50],
        dynamicBalance: [50, 60, 60, 60, 60, 60, 50],
        enhancedClarity: [40, 50, 60, 70, 70, 60, 40]
    };

    // Get the values for the selected preset
    let values = presets[type];

    // Check if the "Calibrated Presets" checkbox is checked
    const isCalibrated = document.getElementById('toggleCalibratedPresets').checked;
    if (isCalibrated) {
        // Add the calibration profile to the preset values
        values = values.map((value, index) => {
            // Convert the calibrated profile value from the range of 0 to 15 to the range of 0 to 100
            const calibratedValue = Math.round(Math.abs(calibratedProfile[index]) * (100 / 30));
            console.log(`Calibrated Value for index ${index}:`, calibratedValue);


            // Add or subtract the calibrated value from the preset value according to its sign
            const newValue = calibratedProfile[index] < 0 ? value - calibratedValue : value + calibratedValue;
            console.log(`New Value for index ${index}:`, newValue);

            return newValue;
          });

    console.log("Preset", values);
}


    // Set the input values to the preset values
    const inputs = app.inputs;
    inputs.forEach((input, index) => {
        input.value = values[index];
        app.updateSlider(input);
    });

    // Update the gain value of each filter
    filters.forEach((filter, index) => {
        // Map the range of 0 to 100 to the range of -15 to 15
        const gainValue = (values[index] / 100) * 30 - 15;
        filter.gain.value = gainValue;
    });
}

  return {
    inputs: [].slice.call(document.querySelectorAll('.sliders input')),
    updateSlider,
    reset,
    selectPreset,
  };
})();

(function initAndSetupTheSliders() {
  const inputs = app.inputs;
  let index = 1;
  inputs.forEach(input => input.setAttribute('data-slider-index', 'range' + index++));
  inputs.forEach(input => input.value = 50);
  inputs.forEach(input => app.updateSlider(input));
  // Cross-browser support where value changes instantly as you drag the handle, therefore two event types.
  inputs.forEach(input => input.addEventListener('input', element => app.updateSlider(input)));
  inputs.forEach(input => input.addEventListener('change', element => app.updateSlider(input)));
  app.selectPreset('custom');
})();


// Get slider output
let inputs = document.querySelectorAll("input[type=range]");

inputs.forEach((range) => {
  range.addEventListener("input", () => {
    app.updateSlider(range);

    // For debugging purposes, clear the console and print the current value
    console.clear();
    console.log(range.value);
  });
});

module.exports = {
  updateSliders: function(values) {
    filters.forEach((filter, index) => {
      // Map the range of 0 to 100 to the range of -40 to 40
      const gainValue = (values[index] / 100) * 30 - 15;
      filter.gain.value = gainValue;
    });
  },
  getSliderValues: function() {
    return app.inputs.map(input => input.value);
  }
};

// Select the player button
const playerButton = document.getElementById('playButton'); // Replace 'playerButton' with the actual ID of your player button

// Add a 'click' event listener to the player button
playerButton.addEventListener('click', function() {
    // Create an object to store the gain control values
    const gainValues = {};

    // Iterate over the gain controls
    for (let i = 0; i < gainControls.length; i++) {
        // Get the current value of the control
        const value = gainControls[i].value;

        // Store the value in the object
        gainValues[gainControls[i].id] = value;
    }

    // Convert the object to a JSON string
    const gainValuesJSON = JSON.stringify(gainValues);

    // Store the JSON string in localStorage
    localStorage.setItem('gainValues', gainValuesJSON);
});