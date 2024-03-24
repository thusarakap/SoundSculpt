function negateDBValues(dBValues, speakerType){
    let negatedValues = [];
    for (let i = 0; i < dBValues.length; i++){
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
        }else if (speakerType === "Bluetooth Speakers"){
            if(i === 0 || i === 1){
                negatedValue = Math.min(negatedValue, 5); // cap frequency 1 and 2 at 5dB
            }
        }
        negatedValues.push(negatedValue);
    }
    return negatedValues;
}
   
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','data','userData.json');
const rawData = fs.readFileSync(filePath);
const data = JSON.parse(rawData);

// Test1
let inputDBValues = data.dBValues;
let inputSpeakerType = data.speakerType;

let calibratedProfile = negateDBValues(inputDBValues, inputSpeakerType);
console.log("test1:");
printResults(calibratedProfile);

// Print
function printResults(output){
    console.log(`calibratedProfile = [${output}];`);
}

module.exports = {
    calibratedProfile,
    negateDBValues
};