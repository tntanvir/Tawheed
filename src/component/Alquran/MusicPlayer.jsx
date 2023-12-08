// MusicPlayer.js
import React, { useState, useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

const MusicPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Do something with the current time and duration if needed
  };

  const songEndHandler = () => {
    // Logic for what to do when the song ends
    // For example, play the next song
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  return (
    <div className="music-player">
      {/* <h2>{songs[currentSongIndex].title}</h2> */}
      <audio
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={songs}
      ></audio>
      <div className="flex justify-center items-center">
        {/* {
          console.log(songs)
        } */}
        <button onClick={playPauseHandler}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
