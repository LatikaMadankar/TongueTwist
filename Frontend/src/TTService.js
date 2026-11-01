// export const getTTByLanguage = async (language,difficulty) => {
//   try {
//     if (difficulty) {
//       response += `?difficulty=${difficulty}`;
//     }

//     const response = await fetch(`http://localhost:8080/api/language/${language}`);  
    
//     const data = await response.json();
//     return data;
//   }
//   catch (err) {
//     console.log(err);
//   }}

export const getTTByLanguage = async (language, difficulty) => {
  try {
    let url = `http://localhost:8080/api/language/${language}`;

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
