import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import pal from "../../../assests/images/paldopal.jpg"
import barish from "../../../assests/images/Baarishein.jpg"
import diltu from "../../../assests/images/Dil-Tu-Jaan-Tu.jpg"
import gulabi from "../../../assests/images/Gulabi-Sadi-.jpg"
import hanu from "../../../assests/images/Sankat-Mochan-Hanuman.jpg"
import sun from "../../../assests/images/Suniyan-Suniyan.jpg"
import dekha from "../../../assests/images/dekha ek khwab.jpg"
import nad from "../../../assests/images/nadaaniyan.jpg"
import sunflower from "../../../assests/images/sunflower.jpg"
import zinda from "../../../assests/images/zinda.jpg"
import MusicCard from "../../common/MusicCard"
import { useSelector } from "react-redux"
import socket from "../../../utils/socket"

const Home = () => {
  const { room_id } = useSelector((state: any) => state.auth)
  const musicCardsData = [
    {
      id: "8",
      musicImage: sunflower,
      title: "Sunflower",
      artist: "Post Malone",
      duration: "2:42",
    },
    {
      id: "2",
      musicImage: barish,
      title: "Baarishein",
      artist: "Anuv Jain",
      duration: "3:27",
    },
    {
      id: "3",
      musicImage: diltu,
      title: "Dil Tu Jaan Tu",
      artist: "Gurnazar",
      duration: "3:57",
    },
    {
      id: "4",
      musicImage: gulabi,
      title: "Gulabi Sadi",
      artist: "Artist 2",
      duration: "4:05",
    },
    {
      id: "5",
      musicImage: zinda,
      title: "Zinda",
      artist: "Amit Trivedi",
      duration: "5:02",
    },
    {
      id: "6",
      musicImage: hanu,
      title: "Sankat Mochan",
      artist: "Gulshan Kumar",
      duration: "4:05",
    },
    {
      id: "7",
      musicImage: nad,
      title: "Nadaaniyan",
      artist: "Akshath Acharya",
      duration: "2:50",
    },
    {
      id: "1",
      musicImage: pal,
      title: "Pal Do Pal......",
      artist: "Mukesh",
      duration: "3:24",
    },
    {
      id: "9",
      musicImage: sun,
      title: "Suniyan Suniyan",
      artist: "MixSingh",
      duration: "3:31",
    },
    {
      id: "10",
      musicImage: dekha,
      title: "Dekha Ek Khwab",
      artist: "Kishore Kumar",
      duration: "4:27",
    },
  ]

  const handleSongClick = (id: any) => {
    socket.emit("request_song", { roomId: room_id, songId: id })
  }

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
              handleClick={() => handleSongClick(musicCard.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home;
