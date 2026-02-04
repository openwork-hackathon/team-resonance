'use client';

import { useState, useRef, useEffect } from 'react';
import { Track } from '@/lib/types';

interface MusicPlayerProps {
  track: Track;
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-900/80 rounded-xl p-6 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={`https://gateway.pinata.cloud/ipfs/${track.audioIpfsHash}`}
        preload="metadata"
      />
      
      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={`https://gateway.pinata.cloud/ipfs/${track.coverArtIpfsHash}`}
          alt={track.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-bold text-white">{track.title}</h4>
          <p className="text-gray-400 text-sm">{track.artistName}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={togglePlay}
          className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition transform hover:scale-105"
        >
          {isPlaying ? (
            <span className="text-2xl">⏸</span>
          ) : (
            <span className="text-2xl ml-1">▶</span>
          )}
        </button>
      </div>

      {/* Blockchain Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Live on Base L2 • Track #{track.id}</span>
      </div>
    </div>
  );
}