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
    </>
  );
};

export default Home;
