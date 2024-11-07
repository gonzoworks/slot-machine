// global variables for the slot machine
export const ROWS = 3;
export const COLS = 3;

export const SYMBOLS_COUNT = {
    A: 1,
    B: 3,
    C: 6,
    D: 10,
};

export const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

// Deposit function (placeholder)
export const deposit = (amount) => {
    if (isNaN(amount) || amount <= 0) {
        return "Invalid deposit amount";
    }
    return amount;
};

// Get number of lines (placeholder)
export const getNumberOfLines = (lines) => {
    const numberOfLines = parseInt(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        return "Invalid number of lines";
    }
    return numberOfLines;
};

// Get bet (placeholder)
export const getBet = (balance, lines, betAmount) => {
    const numberBet = parseFloat(betAmount);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
        return "Invalid bet amount";
    }
    return numberBet;
};

// Spin function
export const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

// Transpose function
export const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

// Get winnings function
export const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        if (symbols.every(symbol => symbol === symbols[0])) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};
