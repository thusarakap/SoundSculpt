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
                negatedValue = Math.min(negatedValue, 8);
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
let inputDBValues3 = [-4, -5, 8, 3, -7, 6, 5 ]
let speakerType3 = "portable speaker";

let outputDBValues3 = negateDBValues(inputDBValues3, speakerType3);
console.log("test3:");
printResults(outputDBValues3);

//Test4
let inputDBValues4 = [-5, -6, 0, 5, 6, -5, -4];
let speakerType4 = "soundbars";

let outputDBValues4 = negateDBValues(inputDBValues4, speakerType4);
console.log("test4:");
printResults(outputDBValues4);

//Test5
let inputDBValues5 = [-3, 4, 6, -4, 6, -5, 4];
let speakerType5 = "outdoor speakers";

let outputDBValues5 = negateDBValues(inputDBValues5, speakerType5);
console.log("test5:");
printResults(outputDBValues5);

// Print
function printResults(output){
    for (let key in output) {
        console.log(`${key}: ${output[key]}`);
    }
}
