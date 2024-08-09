import { useNavigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import FriendsCard from "../../common/FriendsCard";
import MusicPlayer from "../../common/MusicPlayer";

const Home = () => {
  const nav = useNavigate();

  const handleAddFriend = () => {
    nav("/friend");
  };

  return (
    <>
      <div>Home</div>
      <CssBaseline />
      <Container>
        <FriendsCard
          profilePhoto="https://via.placeholder.com/50"
          userName="John Doe"
          joinedSince="January 2020"
          onAddFriend={handleAddFriend}
        />
      </Container>
      <Container maxWidth="sm">
        <MusicPlayer
          title="SoundHelix Song 1"
          artist="SoundHelix"
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          autoPlay={false}
        />
      </Container>
    </>
  );
};

export default Home;
