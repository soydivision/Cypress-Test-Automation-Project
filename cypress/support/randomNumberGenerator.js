class RandomNumberGenerator {
    static generateRandom7DigitNumber() {
        const min = 1000000;
        const max = 9999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomNumberInRange1to99() {
        return Math.floor(Math.random() * 99) + 1;
    }

    static generateRandomNumberUnderUpperBound(maxValue) {
        return Math.floor(Math.random() * maxValue); // Generates a random integer from 0 to (maxValue - 1)
    }

    static generateRandomNumberInRange(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
}

export default RandomNumberGenerator;
