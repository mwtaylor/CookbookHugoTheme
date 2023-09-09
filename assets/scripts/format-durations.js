const dateDurations = {
    "Y": "year",
    "M": "month",
    "W": "week",
    "D": "day"
}
const timeDurations = {
    "H": "hour",
    "M": "minute",
    "S": "second"
}
const checkOrder = ["P", "Y", "M", "W", "D", "T", "H", "M", "S"];

$("[data-format-duration='true']").each(function () {
    const isoDuration = $(this).text().trim();
    let outputText = "";
    let durations = {};
    const dateTimeSplit = isoDuration.split("T");
    let remainingText = dateTimeSplit[0];
    checkOrder.forEach(letter => {
        if (letter === "P") {
            if (/^P[^P]*$/.test(remainingText)) {
                remainingText = remainingText.slice(1);
                durations = dateDurations;
            } else {
                throw "Duration did not properly start with a P or contained more than one P";
            }
        } else if (letter === "T") {
            if (remainingText.length > 0) {
                throw "Invalid text " + remainingText + " found before T";
            }
            if (dateTimeSplit.length > 2) {
                throw "Duration contained T more than once";
            }
            if (dateTimeSplit.length === 1) {
                remainingText = "";
            } else {
                remainingText = dateTimeSplit[1];
            }
            durations = timeDurations;
        } else {
            const parts = remainingText.split(letter);
            const durationPartLabel = durations[letter];
            if (!durationPartLabel) {
                throw "Duration letter " + letter + " searched in the wrong part of the duration string";
            }
            if (parts.length === 1) {
                remainingText = parts[0];
            } else if (parts.length === 2) {
                const numberString = parts[0];
                if (/^\d+$/.test(numberString)) {
                    if (outputText.length !== 0) {
                        outputText += ", "
                    }
                    outputText += numberString + " " + durationPartLabel;
                    if (parseInt(numberString) !== 1) {
                        outputText += "s";
                    }
                } else {
                    throw "Invalid value found for " + durationPartLabel + " " + numberString;
                }
                remainingText = parts[1];
            } else {
                throw "Duration letter " + letter + " was found multiple times";
            }
        }
    }, this);
    $(this).text(outputText);
});
