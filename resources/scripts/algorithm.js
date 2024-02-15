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
                negateDBValue = Math.min(negatedValue, 5); // cap frequency 2 at 5dB
            }
        }else if (speakerType === "soundbars"){
            if(i === 4 || i === 5 || i === 6){
                negatedValue = Math.min();
            }
        }
        negatedValues[`frequency${i + 1}`] = negatedValue;
    }
    return negatedValues;
}

// Test1
let inputDBValues1 = [-10, -10, -3, 7, 0, -9, -15];
let speakerType1 = "laptop";

let outputDBValues1 = negateDBValues(inputDBValues1, speakerType1);
console.log("test1:");
printResults(outputDBValues1);

//Test2

let inputDBValues2 = [-5, 2, -7, 12, 0, -6, -11];
let speakerType2 = "bookshelf";

let outputDBValues2 = negateDBValues(inputDBValues2, speakerType2);
console.log("test2:");
printResults(outputDBValues2);

//Test3
let inputDBValues3 = [0, -6, 8, 2, -1, 5, -4];
let speakerType3 = "laptop";

let outputDBValues3 = negateDBValues(inputDBValues3, speakerType3);
console.log("test3");
printResults(outputDBValues3);

// Print
function printResults(output){
    for (let key in output) {
        console.log(`${key}: ${output[key]}`);
    }
}
