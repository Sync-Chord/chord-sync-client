// MusicPlayer.tsx
import React, { useEffect, useRef } from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useMusicPlayer } from "./MusicPlayerProvider";
import logo from "../../assests/images/hey.jpeg"

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    setCurrentTime,
    setDuration,
  } = useMusicPlayer()

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   let controller: AbortController;
  //   let reader: ReadableStreamDefaultReader<Uint8Array>;

  //   if (audio) {
  //     controller = new AbortController();
  //     const { signal } = controller;

  //     fetch("/stream", { signal })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.body?.getReader();
  //         }
  //         throw new Error("Failed to fetch audio");
  //       })
  //       .then((r) => {
  //         if (!r) throw new Error("ReadableStream not supported");
  //         reader = r;
  //         return new ReadableStream({
  //           start(controller) {
  //             function push() {
  //               reader
  //                 .read()
  //                 .then(({ done, value }) => {
  //                   if (done) {
  //                     controller.close();
  //                     return;
  //                   }
  //                   controller.enqueue(value);
  //                   push();
  //                 })
  //                 .catch((err) => {
  //                   console.error("Stream error:", err);
  //                   controller.error(err);
  //                 });
  //             }
  //             push();
  //           },
  //         });
  //       })
  //       .then((stream) => {
  //         const source = new window.MediaSource();
  //         const url = URL.createObjectURL(source);
  //         audio.src = url;

  //         source.addEventListener("sourceopen", () => {
  //           const sourceBuffer = source.addSourceBuffer("audio/mpeg");
  //           const reader = stream.getReader();

  //           function appendNextChunk() {
  //             reader.read().then(({ done, value }) => {
  //               if (done) {
  //                 source.endOfStream(); // Call endOfStream on the MediaSource
  //                 return;
  //               }
  //               if (sourceBuffer && value) {
  //                 sourceBuffer.appendBuffer(value);
  //                 appendNextChunk();
  //               }
  //             });
  //           }

  //           appendNextChunk();
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("Error setting up audio stream:", err);
  //       });

  //     return () => {
  //       if (reader) {
  //         reader.cancel();
  //       }
  //       if (controller) {
  //         controller.abort();
  //       }
  //     };
  //   }
  // }, []);

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime)
      }

      audio.addEventListener("timeupdate", updateTime)

      return () => {
        audio.removeEventListener("timeupdate", updateTime)
      }
    }
  }, [setCurrentTime])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener("loadedmetadata", setAudioData)

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioData)
      }
    }
  }, [setDuration])

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newValue as number
    }
  }

  const handleNextTrack = () => {
    console.log("Next track")
  }

  const handlePrevTrack = () => {
    console.log("Previous track")
  }

  return (
    <Box
      sx={{
        height: "84vh",
        width: "97%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#c0eaca",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s",
      }}
    >
      <Typography
        sx={{ padding: "5px", fontFamily: "cursive", fontWeight: "900" }}
      >
        Now Playing
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          height: "40%",

          marginBottom: "6rem",
        }}
      >
        <img
          src={logo}
          alt="Album Art"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s",
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body1"
          sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}
        >
          Song Title
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
          song author
        </Typography>
        <Slider
          value={currentTime}
          onChange={handleSliderChange}
          min={0}
          max={duration}
          sx={{ color: "#3f51b5" }}
        />
        <Typography
          variant="caption"
          sx={{ marginTop: "0.5rem", color: "gray" }}
        >
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}{" "}
          / {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handlePrevTrack} sx={{ marginRight: "0.5rem" }}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            onClick={togglePlay}
            sx={{
              marginRight: "0.5rem",
              transform: isPlaying ? "scale(1.1)" : "scale(1)",
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={handleNextTrack}>
            <SkipNextIcon />
          </IconButton>
        </Box>
      </Box>

      <audio ref={audioRef} />
    </Box>
  )
}

export default MusicPlayer;
