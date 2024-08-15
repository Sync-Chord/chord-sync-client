import React, { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";
import gif from "../../assests/images/musix.gif"
import { useSelector } from "react-redux"
import { Box } from "@mui/system"

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [songBuffer, setSongBuffer] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const { room_id } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

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
      )
      const url = URL.createObjectURL(blob)
      audio.src = url

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Playback error:", error))
    }
  }, [songBuffer])

  useEffect(() => {
    const onReceiveSongBuffer = (data: any) => {
      const { fullSongBuffer } = data
      setSongBuffer(fullSongBuffer)
    }

    const onMusicPlayed = () => {
      const audio = audioRef.current
      if (audio) {
        setIsPlaying(true)
        audio.play().catch((error) => console.error("Playback error:", error))
      }
    }

    const onMusicPaused = () => {
      const audio = audioRef.current
      if (audio) {
        setIsPlaying(false)
        audio.pause()
      }
    }

    socket.on("receive_full_song", onReceiveSongBuffer)
    socket.on("music_played", onMusicPlayed)
    socket.on("music_paused", onMusicPaused)

    return () => {
      socket.off("receive_full_song", onReceiveSongBuffer)
      socket.off("music_played", onMusicPlayed)
      socket.off("music_paused", onMusicPaused)
    }
  }, [])

  const handlePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (room_id) {
        socket.emit("play_music", { roomId: room_id })
      }
      setIsPlaying(true)
      audio.play().catch((error) => console.error("Playback error:", error))
    }
  }

  const handlePause = () => {
    const audio = audioRef.current
    if (audio) {
      if (room_id) {
        socket.emit("pause_music", { roomId: room_id })
      }
      setIsPlaying(false)
      audio.pause()
    }
  }

  return (
    <Box
      sx={{
        height: "100vh", // Full height of the viewport
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Light background for contrast
        padding: 2,
        gap: 3,
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          height: "40vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src={gif}
          alt="Music Gif"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Audio Player */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px", // Set max width for large screens
          backgroundColor: "#27AE60",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        <audio
          ref={audioRef}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          style={{ width: "100%" }}
        />
      </Box>
    </Box>
  )
}

export default MusicPlayer;
