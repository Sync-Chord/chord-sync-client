import { useNavigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import FriendsCard from "../../common/FriendsCard";

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
    </>
  );
};

export default Home;
