import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import sada from "../../../assests/images/sada.jpg";
import MusicCard from "../../common/MusicCard";
import { useSelector } from "react-redux";
import socket from "../../../utils/socket";

const Home = () => {
  const { room_id } = useSelector((state: any) => state.auth);
  const musicCardsData = [
    {
      musicImage: sada,
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
    },
    {
      musicImage: sada,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:05",
    },
    {
      musicImage: sada,
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
    },
    {
      musicImage: sada,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:05",
    },
    {
      musicImage: sada,
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
    },
    {
      musicImage: sada,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:05",
    },
    {
      musicImage: sada,
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
    },
    {
      musicImage: sada,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:05",
    },
    {
      musicImage: sada,
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
    },
    {
      musicImage: sada,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:05",
    },
  ];

  const handleSongClick = () => {
    socket.emit("request_song", { roomId: room_id, songId: "1" });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "99%",
        height: "90vh",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={3}>
        {musicCardsData.map((musicCard, index) => (
          <Grid item xs={1} key={index}>
            <MusicCard
              musicImage={musicCard.musicImage}
              title={musicCard.title}
              artist={musicCard.artist}
              duration={musicCard.duration}
              handleClick={handleSongClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
