export const calculateScore = (
    passedCount: number,
    testResultsCount: number
) => {
    if (!testResultsCount || testResultsCount <= 0) {
        return 0;
    }

    return Math.round(
        (passedCount / testResultsCount) * 100
    );
};
