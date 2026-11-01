

export const getTTByLanguage = async (language, difficulty) => {
  try {
    let url = `https://tonguetwist-backend.onrender.com/api/language/${language}`;

    if (difficulty) {
      url += `?difficulty=${difficulty}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching tongue twisters:", error);
    throw error;
  }
};
