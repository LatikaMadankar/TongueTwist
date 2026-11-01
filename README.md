# 🗣️ TongueTwist

TongueTwist is a multilingual tongue-twister practice web application that helps users improve their speaking accuracy and pronunciation through interactive speech-based challenges.

Users can choose a language and difficulty level, speak the displayed tongue twister using their microphone, and receive an accuracy score based on how closely their spoken text matches the target sentence.

🔗 **Live Demo:** https://tonguetwist-d5cb.onrender.com/

## ✨ Features

- 🌍 English, Hindi & Marathi tongue twisters
- 🎯 Easy, Medium & Hard difficulty levels
- 🎙️ Browser-based speech recognition
- 📊 Speech similarity/accuracy scoring
- 🔎 Word-level comparison
- 🏆 5-attempt challenge with average & best score
- 🔄 Random tongue-twister selection
- 📱 Responsive UI
  
## 🛠️ Tech Stack

**Frontend:** React.js, JavaScript, CSS  
**Backend:** Node.js, Express.js, REST API  
**Database:** MongoDB Atlas, Mongoose  
**Speech:** Web Speech API  
**Deployment:** Render  
**Version Control:** Git & GitHub

## 🔄 How It Works

```text
Choose Language + Difficulty
          ↓
   Get Tongue Twister
          ↓
    Speak into Mic
          ↓
   Speech Recognition
          ↓
   Text Similarity Score
          ↓
  Word-Level Comparison
          ↓
     Track Progress
```

## 🚀 Run Locally

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
node server.js
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## 🎙️ Speech Recognition

TongueTwist uses the browser's built-in **Web Speech API** for speech recognition.

The recognition language is selected according to the user's chosen language:

| Language | Recognition Locale |
|---|---|
| English | `en-US` |
| Hindi | `hi-IN` |
| Marathi | `mr-IN` |

The application does not send recorded audio to a custom speech-processing server. The browser's speech recognition functionality is used to obtain the recognized text.

> **Note:** Speech recognition support and accuracy can vary depending on the browser, microphone permissions, operating system, network connection, and speaking conditions.

---


## 📱 Browser Compatibility

For the best experience, use a modern Chromium-based browser such as:

- Google Chrome
- Microsoft Edge

Microphone permission is required for speech recognition.

---

## ⭐ If You Like This Project

If you found TongueTwist useful or interesting, consider giving the repository a ⭐ on GitHub!

