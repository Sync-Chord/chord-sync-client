import React, { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";
import { useSelector } from "react-redux";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songBuffer, setSongBuffer] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { room_id } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (songBuffer) {
      const blob = new Blob(
        [
          new Uint8Array(
            atob(songBuffer)
              .split("")
              .map((c) => c.charCodeAt(0))
          ),
        ],
        {
          type: "audio/mpeg",
        }
      );
      const url = URL.createObjectURL(blob);
      audio.src = url;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Playback error:", error));
    }
  }, [songBuffer]);

  useEffect(() => {
    const onReceiveSongBuffer = (data: any) => {
      const { fullSongBuffer } = data;
      setSongBuffer(fullSongBuffer);
    };

    const onMusicPlayed = () => {
      const audio = audioRef.current;
      if (audio) {
        setIsPlaying(true);
        audio.play().catch((error) => console.error("Playback error:", error));
      }
    };

    const onMusicPaused = () => {
      const audio = audioRef.current;
      if (audio) {
        setIsPlaying(false);
        audio.pause();
      }
    };

    socket.on("receive_full_song", onReceiveSongBuffer);
    socket.on("music_played", onMusicPlayed);
    socket.on("music_paused", onMusicPaused);

    return () => {
      socket.off("receive_full_song", onReceiveSongBuffer);
      socket.off("music_played", onMusicPlayed);
      socket.off("music_paused", onMusicPaused);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (room_id) {
        socket.emit("play_music", { roomId: room_id });
      }
      setIsPlaying(true);
      audio.play().catch((error) => console.error("Playback error:", error));
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (room_id) {
        socket.emit("pause_music", { roomId: room_id });
      }
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} controls onPlay={handlePlay} onPause={handlePause} />
    </div>
  );
};

export default MusicPlayer;
