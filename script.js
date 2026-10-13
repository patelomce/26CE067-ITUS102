
function calculateFineBill() {
    const lateDays = Number(document.getElementById("lateDays").value);
    const bookCount = Number(document.getElementById("bookCount").value);
    const memberType = document.getElementById("memberType").value;

    // Validate the entered values.
    if (
        !Number.isInteger(lateDays) ||
        lateDays < 0 ||
        lateDays > 10 ||
        !Number.isInteger(bookCount) ||
        bookCount < 1 ||
        bookCount > 5
    ) {
        document.getElementById("result").textContent =
            "Please enter late days from 0 to 10 and books from 1 to 5 using whole numbers.";

        document.getElementById("breakdown").textContent =
            "Correct the input values and calculate again.";

        return;
    }

    const rate = chooseRate(memberType);
    const basicFine = calculateFine(lateDays, bookCount, rate);
    const processingCharge = 10;
    const total = calculateTotal(basicFine, processingCharge);

    document.getElementById("result").textContent =
        "Rate: ₹" + rate +
        " per day per book | Basic fine: ₹" + basicFine +
        " | Processing charge: ₹" + (basicFine > 0 ? processingCharge : 0) +
        " | Total including applicable processing charge: ₹" + total;

    document.getElementById("breakdown").textContent =
        buildBreakdown(lateDays, bookCount, rate);
}

// M6: Calculate the basic fine.
function calculateFine(days, books, rate) {
    return days * books * rate;
}

// D1: Choose the fine rate using if-else.
function chooseRate(type) {
    if (type === "Student") {
        return 5;
    } else if (type === "Staff") {
        return 3;
    } else if (type === "Visitor") {
        return 10;
    } else {
        return 0;
    }
}

// D2: Add the processing charge only when a fine exists.
function calculateTotal(fine, processingCharge) {
    if (fine <= 0) {
        return 0;
    } else {
        return fine + processingCharge;
    }
}

// D3: Display the cumulative fine for each late day.
function buildBreakdown(days, books, rate) {
    let breakdown = "";

    if (days === 0) {
        return "No late days. No fine or processing charge is applicable.";
    }

    for (let day = 1; day <= days; day++) {
        const cumulativeFine = calculateFine(day, books, rate);

        breakdown +=
            "Day " + day + ": ₹" + cumulativeFine + "\n";
    }

    return breakdown;
}
