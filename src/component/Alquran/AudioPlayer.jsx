import { FaPauseCircle, FaPlayCircle, FaDownload } from 'react-icons/fa';
import { MenuHandler, Spinner, Tooltip } from '@material-tailwind/react';
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
import { Link } from 'react-router-dom';
import { document } from 'postcss';

// ================================================
const AudioPlayer = ({ audioUrl, num, id }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef(null);

  const [loop, setLoop] = useState(false);
  const repeat = () => {
    setLoop(!loop);
  }

  useEffect(() => {
    const audio = audioRef.current;
    const initialLoopValue = loop;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentTime(0);
      audio.currentTime = 0;
      localStorage.setItem(`${id}`, currentTime)
      if (initialLoopValue) {
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [loop]);





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





  useEffect(() => {
    localStorage.setItem("storedNumber", id)
  }, [id])



  useEffect(() => {
    const times = localStorage.getItem(`${id}`)
    console.log(times);
    if (times) {
      setCurrentTime(times);
    }
  }, [id])



  const Puse = () => {
    localStorage.setItem(`${id}`, currentTime)
  }





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
              <Tooltip content={`${loop}`} >
                <div className='cursor-pointer' onClick={() => repeat()} >

                  <IoIosRepeat />
                </div>
              </Tooltip>
              {
                id == 1 ?
                  <Tooltip content={"Previous"}>
                    <Link to={`/alquran/114`}>
                      <div className='cursor-pointer'>
                        <TbPlayerTrackPrevFilled />
                      </div>
                    </Link>
                  </Tooltip>
                  :
                  <Tooltip content={"Previous"}>
                    <Link to={`/alquran/${parseInt(id) - 1}`}>
                      <div className='cursor-pointer'>
                        <TbPlayerTrackPrevFilled />
                      </div>
                    </Link>
                  </Tooltip>




              }
              <button className='' onClick={handlePlayPause}>
                {isPlaying ?
                  currentTime ?
                    <Tooltip content={"Puse"}>
                      <div className='cursor-pointer' onClick={() => Puse()}>
                        <FaPauseCircle />
                      </div>
                    </Tooltip>

                    : <Spinner className='h-10 w-10' color="blue" />
                  :
                  <Tooltip content={"Play"}>
                    <div className='cursor-pointer'>
                      <FaPlayCircle />
                    </div>
                  </Tooltip>


                }
              </button>
              {id == 114 ?
                <Tooltip Tooltip content={"Next"}>
                  <Link to={`/alquran/1`}>
                    <div className='cursor-pointer'>

                      <TbPlayerTrackNextFilled />
                    </div>
                  </Link>
                </Tooltip>

                :
                <Tooltip Tooltip content={"Next"}>
                  <Link to={`/alquran/${parseInt(id) + 1}`}>
                    <div className='cursor-pointer'>

                      <TbPlayerTrackNextFilled />
                    </div>
                  </Link>
                </Tooltip>
              }

              <Menu dismiss={{
                itemPress: false,
              }}>
                <Tooltip content={"Menu"}>
                  <MenuHandler>
                    <IconButton variant="text">
                      <HiDotsVertical className='text-2xl text-white ' />
                    </IconButton>
                  </MenuHandler>
                </Tooltip>

                <MenuList className="flex flex-col gap-2">

                  <MenuItem onClick={handleDownload} className='flex justify-between'>

                    <h1>Download</h1>
                    <FaDownload />

                  </MenuItem>

                  <Menu
                    placement="top-start"
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
                    <MenuList >
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
                </MenuList>
              </Menu>
            </div>
            {num === 2 ? <div></div> : <span> {formatTime(duration)}</span>}
          </div>

        </div>
      </div>
    </div >
  );
};

export default AudioPlayer;














