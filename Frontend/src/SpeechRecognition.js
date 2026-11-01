import { useState, useRef } from "react";

function useSpeechRecognition(language) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      language === "Hindi"
        ? "hi-IN"
        : language === "Marathi"
          ? "mr-IN"
          : "en-US";

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
      setTranscript("");
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;

      setTranscript(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError("Could not understand your speech.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const resetSpeech = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    setIsListening(false);
    setTranscript("");
    setError("");
  };
  
  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetSpeech
  };
}

export default useSpeechRecognition;
