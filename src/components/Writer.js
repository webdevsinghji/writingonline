// src/components/Writer.js
"use client"; // Add this directive at the top

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { FaSun, FaMoon, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Writer = () => {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const savedText = localStorage.getItem('writerText');
    if (savedText) {
      setText(savedText);
      setWordCount(savedText.split(/\s+/).filter(word => word).length);
    }
    const savedTheme = localStorage.getItem('writerTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    const savedSound = localStorage.getItem('writerSound');
    if (savedSound) {
      setIsSoundOn(savedSound === 'true');
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('writerText', text);
    setWordCount(text.split(/\s+/).filter(word => word).length);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('writerTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('writerSound', isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('writerText', text);
    }, 5000); // Auto-save every 5 seconds
    return () => clearInterval(interval);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (isSoundOn) playTypewriterSound();
  };

  const playTypewriterSound = () => {
    try {
      const audio = new Audio('/typewriter-key.wav');
      audio.volume = 0.5; // Set volume to 50%
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  
    const handleExport = () => {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}-${minutes}-${ampm}`;
      const fileName = `WritingOnline-${formattedDate}-${formattedTime}.txt`;
    
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, fileName);
    };
    
  

  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <header className="flex justify-between items-center px-12">
        <img src="/logo.png" alt="Logo" className="h-20" /> 
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-2xl">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setIsSoundOn(!isSoundOn)} className="text-2xl">
            {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <span className="text-lg">{`${wordCount}`}</span>
          <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded">
            Export
          </button>
        </div>
      </header>
      <div className="flex-grow p-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing..."
          className="w-full h-full border-none outline-none resize-none bg-transparent text-2xl p-4 px-12"
        />
      </div>
    </div>
  );
};

export default Writer;
