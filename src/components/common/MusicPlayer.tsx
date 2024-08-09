import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Card, IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  SkipNextOutlined,
  SkipPreviousOutlined,
} from "@mui/icons-material";
import "../styles/MusicPlayer.css";

interface MusicPlayerProps {
  title: string;
  artist: string;
  src: string;
  autoPlay?: boolean;
}

const MusicPlayer = (props: MusicPlayerProps) => {
  const { title, artist, src, autoPlay = false } = props;

  return (
    <Card
      sx={{
        boxShadow: 4,
        borderRadius: 2,
        width: 750,
        padding: 2,
        backgroundColor: "#27AE60",
      }}
    >
      <AudioPlayer
        style={{ height: 50, padding: "10px" }}
        autoPlay={autoPlay}
        src={src}
        onPlay={() => console.log("Playing")}
        onPause={() => console.log("Paused")}
        onEnded={() => console.log("Ended")}
        customAdditionalControls={[]}
        showJumpControls={true}
        layout="horizontal-reverse"
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
        customIcons={{
          play: (
            <IconButton sx={{ color: "#fff" }}>
              <PlayArrow />
            </IconButton>
          ),
          pause: (
            <IconButton sx={{ color: "#fff" }}>
              <Pause />
            </IconButton>
          ),
          previous: (
            <IconButton sx={{ color: "#fff" }}>
              <SkipPreviousOutlined />
            </IconButton>
          ),
          next: (
            <IconButton sx={{ color: "#fff" }}>
              <SkipNextOutlined />
            </IconButton>
          ),
          volume: (
            <IconButton sx={{ color: "#fff" }}>
              <VolumeUp />
            </IconButton>
          ),
          volumeMute: (
            <IconButton sx={{ color: "#fff" }}>
              <VolumeOff />
            </IconButton>
          ),
        }}
      />
    </Card>
  );
};

export default MusicPlayer;
