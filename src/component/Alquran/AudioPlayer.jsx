import { FaPauseCircle, FaPlayCircle, FaDownload } from 'react-icons/fa';
import { MenuHandler, Spinner } from '@material-tailwind/react';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { IoIosRepeat } from 'react-icons/io';
import { HiDotsVertical } from "react-icons/hi";

// ---------------------------------------------------------
import {
  Menu,
  MenuList,
  MenuItem,
  IconButton,



} from "@material-tailwind/react";
import { IoChevronUpCircleOutline } from 'react-icons/io5';

// ================================================
const AudioPlayer = ({ audioUrl, num }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // New state for playback speed
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

  const handleDownload = async () => {
    try {
      const response = await axios.get(audioUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'audio_file.mp3');
      document.body.appendChild(link);
      link.click();

      // Clean up the DOM after download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading audio file:', error);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    audioRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  return (
    <div className='flex  justify-center items-center flex-col bg ring-deep-purple-400 w-full'>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className='w-full flex items-center justify-center'>
        <div>
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
            <span>{formatTime(currentTime)} </span>
            <div className='flex justify-between items-center text-4xl gap-4 '>
              <IoIosRepeat />
              <TbPlayerTrackPrevFilled />
              <button className='' onClick={handlePlayPause}>
                {isPlaying ? currentTime ? <FaPauseCircle /> : <Spinner className='h-10 w-10' color="blue" /> : <FaPlayCircle />}
              </button>
              <TbPlayerTrackNextFilled />

              <Menu>
                <MenuHandler>
                  <IconButton variant="text">

                    <HiDotsVertical className='text-2xl text-white ' />
                  </IconButton>
                </MenuHandler>
                <MenuList className="flex flex-col gap-2">

                  <MenuItem onClick={handleDownload} className='flex justify-between'>
                    {/* <button  className='text-4xl ml-2'> */}
                    <h1>Download</h1>
                    <FaDownload />
                    {/* </button> */}
                  </MenuItem>
                  <MenuItem>
                    <div className='cursor-pointer'>
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
                        className='cursor-pointer'
                      />
                      <span>{(volume * 100).toFixed(0)}%</span>
                    </div>
                  </MenuItem>
                  <Menu
                    placement="right-start"
                    open={openMenu}
                    handler={setOpenMenu}
                    allowHover
                    offset={15}
                  >
                    <MenuHandler className="flex items-center justify-between">
                      <MenuItem>
                        <span>Speed: {playbackSpeed}x</span>
                        <IoChevronUpCircleOutline
                          // strokeWidth={2.5}
                          className={` text-2xl transition-transform ${openMenu ? "rotate-90" : ""
                            }`}
                        />
                      </MenuItem>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => handleSpeedChange(0.5)}><button className='text-1xl mx-1'>
                        0.5x
                      </button></MenuItem>
                      <MenuItem onClick={() => handleSpeedChange(1)} ><button className='text-1xl mx-1'>
                        1x
                      </button></MenuItem>
                      <MenuItem onClick={() => handleSpeedChange(1.5)}> <button className='text-1xl mx-1'>
                        1.5x
                      </button></MenuItem>
                      <MenuItem onClick={() => handleSpeedChange(2)} > <button className='text-1xl mx-1'>
                        2x
                      </button></MenuItem>
                    </MenuList>
                  </Menu>
                </MenuList>
              </Menu>
            </div>
            {num === 2 ? <div></div> : <span> {formatTime(duration)}</span>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;


