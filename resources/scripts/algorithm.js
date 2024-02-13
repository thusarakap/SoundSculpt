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
        }
        negatedValues[`frequency${i + 1}`] = negatedValue;
    }
    return negatedValues;
}

// Test
let inputDBValues = [-10, -10, -3, 7, 0, -9, -15];
let speakerType = "laptop";

let outputDBValues = negateDBValues(inputDBValues, speakerType);

// Print
for (let key in outputDBValues) {
    console.log(`${key}: ${outputDBValues[key]}`);
}
