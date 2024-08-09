import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  SkipNext,
  SkipPrevious,
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
        boxShadow: 3,
        borderRadius: 2,
        width: 700,

        padding: 2,
        backgroundColor: "#27AE60",
      }}
    >
      <AudioPlayer
        style={{ height: 65 }}
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
            <IconButton>
              <PlayArrow />
            </IconButton>
          ),
          pause: (
            <IconButton>
              <Pause />
            </IconButton>
          ),
          rewind: (
            <IconButton>
              <SkipPrevious />
            </IconButton>
          ),
          forward: (
            <IconButton>
              <SkipNext />
            </IconButton>
          ),
          volume: (
            <IconButton>
              <VolumeUp />
            </IconButton>
          ),
          volumeMute: (
            <IconButton>
              <VolumeOff />
            </IconButton>
          ),
        }}
      />
    </Card>
  );
};

export default MusicPlayer;
