function negateDBValues(dBValues, speakerType) {
    let negatedValues = {};
    for (let i = 0; i < dBValues.length; i++) {
        let negatedValue = -dBValues[i];
        if (speakerType === "laptop") {
            if (i === 0 || i === 1) {
                negatedValue = Math.min(negatedValue, 5); // Cap frequency 1 and frequency 2 to 5 dB
            }
        } else if (speakerType === "bookshelf") {
            if (i === 5) {
                negatedValue = Math.min(negatedValue, 7); // Cap frequency 6 at +7 dB
            } else if (i === 6) {
                negatedValue = Math.min(negatedValue, 8); // Cap frequency 7 at +8 dB
            }
        } else if (speakerType === "portable speaker"){
            if(i === 0){
                negatedValue = Math.min(negatedValue, 4); // cap frequency 1 at 4dB
            } else if (i=== 1){
                negatedValue = Math.min(negatedValue, 5); // cap frequency 2 at 5dB
            }
        }else if (speakerType === "soundbars"){
            if(i === 4 || i === 5 || i === 6){
                negatedValue = Math.min(negatedValue, 6); // cap frequency 5,6 and 7 at 6dB
            }
        }else if(speakerType === "Outdoor speakers"){
            if(i === 5){
                negatedValue = Math.min(negatedValue, 6); // cap frequency 6 at 6dB
            }else if(i === 6){
                negatedValue = Math.min(negatedValue, 7); //cap frequency 7 at 7dB
            }
        }else if (speakerType === "Gaming speakers"){
            if(i=== 4){
                negatedValue = Math.min(negatedValue, 7); // cap frequency 5 at 7dB
            }else if(i === 5){
                negatedValue = Math.min(negatedValue, 8); // cap frequency 6 at 8dB
            }
        }else if (speakerType = "Bluetooth Speakers"){
            if(i === 0 | i === 1){
                negatedValue = Math.min(negatedValue, 5); // cap frequency 1 and 2 at 5dB
            }
        }
        negatedValues[`frequency${i + 1}`] = negatedValue;
    }
    return negatedValues;
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','data','data.json');
const rawData = fs.readFileSync(filePath);
const data = JSON.parse(rawData);

// Test1
let inputDBValues1 = data.dBValues;
let speakerType1 = data.speakerType;

let outputDBValues1 = negateDBValues(inputDBValues1, speakerType1);
console.log("test1:");
printResults(outputDBValues1);

// Print
function printResults(output){
    for (let key in output) {
        console.log(`${key}: ${output[key]}`);
    }
}

// Preset adjustment function


function adjustAudioPreset(calibratedProfile, currentPreset, isButtonOn) {
    if(isButtonOn){

        let adjustedPresets = [];
    
        if (calibratedProfile.length !== currentPreset.length) {
            throw new Error ("calibrated profile and current preset must have same length");
        }

        return currentPreset.map((value,index) => value + calibratedProfile[index]);
    }else{
        return null;
    }
}



//Current presets
let Bass = [10, 10, 0, 0, 0, 0, -2];
let Flat = [9, 10, 0, 0, 2, 0,-3];
let Treble = [6, -4, 7, 0, 0, 12, 3];


// Test

let calibratedProfile = [2, -1, 0, 3, -2, 1, -1]; // Example calibrated profile
let currentPreset = Treble; //CurrentPreset type

let adjustedPresets = adjustAudioPreset(calibratedProfile, currentPreset, true);
console.log("Adjusted Preset:");
console.log(currentPreset=== Bass? "Bass":
            currentPreset=== Flat? "Flat":
            currentPreset=== Treble? "Treble":":");
console.log(adjustedPresets);// Example output for the preset




