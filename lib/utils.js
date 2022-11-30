export const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const getMarketPrices = () => ({
    yarn: randomIntFromInterval(5, 12),
    parts: randomIntFromInterval(50, 150),
    gems: randomIntFromInterval(320, 1480),
    coils: randomIntFromInterval(1500, 7500),
    tomes: randomIntFromInterval(8000, 48000),
});

export const getUpgradePrices = () => ({
    bag: (getState().cash + 20000) / 5,
    spirit: (getState().cash + 30000) / 4,
    robot: (getState().cash + 40000) / 3,
    vehicle: (getState().cash + 50000) / 2,
});

export const getNextSeason = (currentSeason) => {
    switch (currentSeason) {
        case "spring":
            return "summer";
        case "summer":
            return "autumn";
        case "autumn":
            return "winter";
        case "winter":
            return "spring";
        default:
            throw new Error(`no next season for ${currentSeason}`);
    }
};
