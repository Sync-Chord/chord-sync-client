import { Grid, Paper, styled } from "@mui/material"
import { Box } from "@mui/system"
import sada from "../../../assests/images/sada.jpg"
import MusicCard from "../../common/MusicCard"

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

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
  ]

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
              handleClick={() => console.log(`Clicked on ${musicCard.title}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
