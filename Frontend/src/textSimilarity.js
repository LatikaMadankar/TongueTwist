// Convert text into a clean format
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"'’“”()।॥]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Calculate Levenshtein distance
const levenshteinDistance = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// Return similarity percentage
export const calculateSimilarity = (target, spoken) => {
  const normalizedTarget = normalizeText(target);
  const normalizedSpoken = normalizeText(spoken);

  if (!normalizedTarget || !normalizedSpoken) {
    return 0;
  }

  const distance = levenshteinDistance(normalizedTarget, normalizedSpoken);

  const maxLength = Math.max(normalizedTarget.length, normalizedSpoken.length);

  const similarity = ((maxLength - distance) / maxLength) * 100;

  return Math.round(similarity);

};

// Word-level comparison
export const compareWords = (
    target,
    spoken
) => {

    const targetWords =
        normalizeText(target).split(" ");

    const spokenWords =
        normalizeText(spoken).split(" ");


    const result = [];


    targetWords.forEach(
        (targetWord, index) => {

            const spokenWord =
                spokenWords[index];


            if (!spokenWord) {

                result.push({
                    target: targetWord,
                    spoken: null,
                    correct: false
                });

                return;
            }


            const wordSimilarity =
                calculateSimilarity(
                    targetWord,
                    spokenWord
                );


            result.push({
                target: targetWord,
                spoken: spokenWord,
                correct: wordSimilarity >= 75
            });

        }
    );


    // Extra words spoken by the user
    if (
        spokenWords.length >
        targetWords.length
    ) {

        for (
            let i = targetWords.length;
            i < spokenWords.length;
            i++
        ) {

            result.push({
                target: null,
                spoken: spokenWords[i],
                correct: false
            });

        }
    }


    return result;
};    
