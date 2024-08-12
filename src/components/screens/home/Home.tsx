import { Box } from "@mui/system"
import Discover from "./Discover"
import TrackList from "./TrackList"

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        label: "main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "50%",
          backgroundColor: "lightgreen",
          label: "left",
        }}
      >
        <Discover />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          backgroundColor: "lightblue",
          label: "Right",
        }}
      >
        <TrackList />
      </Box>
    </Box>
  )
}

export default Home
