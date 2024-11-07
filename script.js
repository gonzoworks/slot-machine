// Import game functions from slots.js
import { deposit, getNumberOfLines, getBet, spin, transpose, getWinnings } from './slots.js';

// Elements from the HTML
const balanceDisplay = document.getElementById("balance");
const winningsDisplay = document.getElementById("winnings");
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const depositButton = document.getElementById("deposit");
const spinButton = document.getElementById("spin");
const depositInput = document.getElementById("deposit-amount");
const linesInput = document.getElementById("lines");
const betInput = document.getElementById("bet");

// Game variables
let balance = 0;

// Update balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: $${balance}`;
}

// Deposit money into the game
depositButton.addEventListener("click", () => {
    console.log("Deposit button clicked.")
    const depositAmount = parseFloat(depositInput.value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }
    balance += depositAmount;
    updateBalanceDisplay();
    depositInput.value = ""; // Clear input
});

// Spin the slot machine
spinButton.addEventListener("click", () => {
    console.log("Spin button clicked.")
    const numberOfLines = parseInt(linesInput.value);
    const betAmount = parseFloat(betInput.value);

    // Input validation
    if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
        alert("Enter valid lines (1-3)");
        return;
    }
    if (isNaN(betAmount) || betAmount <= 0 || betAmount * numberOfLines > balance) {
        alert("Enter a valid bet within your balance");
        return;
    }

    // Deduct total bet from balance
    const totalBet = betAmount * numberOfLines;
    balance -= totalBet;
    updateBalanceDisplay();

    // Spin the reels and update display
    const reels = spin();
    const rows = transpose(reels);

    // Display all symbols on each reel
    reel1.innerHTML = rows[0].map(symbol => `<div class="symbol">${symbol}</div>`).join("");
    reel2.innerHTML = rows[1].map(symbol => `<div class="symbol">${symbol}</div>`).join("");
    reel3.innerHTML = rows[2].map(symbol => `<div class="symbol">${symbol}</div>`).join("");

    // Calculate and display winnings
    const winnings = getWinnings(rows, betAmount, numberOfLines);
    balance += winnings;
    winningsDisplay.textContent = `Winnings: $${winnings}`;
    updateBalanceDisplay();

    // Clear line and bet inputs after spin
    linesInput.value = "";
    betInput.value = "";
});
