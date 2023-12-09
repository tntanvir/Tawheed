import { Spinner } from '@material-tailwind/react';
import React, { useState, useRef, useEffect } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const AudioPlayer = ({ audioUrl, num }) => {
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentTime(0);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='flex justify-center items-center flex-col'>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className=''>
        {/* <label htmlFor="seek">Seek:</label> */}
        <input
          type="range"
          id="seek"
          name="seek"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={handleSeek}
          className='w-[80vw]'
        />
        <div className='flex justify-between items-center'>
          {/* {
            console.log(currentTime)
          } */}
          <span>{formatTime(currentTime)} </span>
          <button className='text-4xl' onClick={handlePlayPause}>
            {
              isPlaying ? currentTime ? <FaPauseCircle /> : <Spinner className='h-10 w-10' color="blue" /> : <FaPlayCircle />
            }
          </button>
          {
            num == 2 ? <div></div> : <span> {formatTime(duration)}</span>
          }

        </div>
      </div>
      {/* <button className='text-4xl' onClick={handlePlayPause}>{isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}</button> */}
      <div>
        <label htmlFor="volume">Volume:</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{(volume * 100).toFixed(0)}%</span>
      </div>

    </div>
  );
};

export default AudioPlayer;
