// FriendsCard.js
import { Card, Avatar, Typography, Grid } from "@mui/material";
import { Chat } from "@mui/icons-material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import moment from "moment";
import { useState } from "react";
import User from "../../apis/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "./ButtonLoader";

interface UserProp {
  id: number;
  name: string;
  email: string;
  profile_photo: string;
  created_at: string;
  status: string | null;
}

interface CardProps {
  user_details: UserProp;
  type: string;
}

const FriendsCard = ({ user_details, type }: CardProps) => {
  const [userData, setUserData] = useState(user_details);

  const { user, token } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onAddFriend = () => {
    setLoading(true);
    User.send_friend_request(
      { following: userData.id },
      {
        token,
        user: user.id,
      }
    )
      .then((res: any) => {
        setLoading(false);
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          setUserData((prev) => ({
            ...prev,
            status: "added",
          }));
          toast.success("Request deleted successfully");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar
        src={userData?.profile_photo}
        alt="Profile"
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />
      <Grid container direction="column" sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: "bold" }}>
          {userData?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Joined: {moment(userData?.created_at).format("MMM YYYY")}
        </Typography>
      </Grid>

      {type === "suggestions" ? (
        loading ? (
          <ButtonLoader />
        ) : userData.status === "added" ? (
          <Typography>Added</Typography>
        ) : (
          <PersonAddAlt1Icon onClick={onAddFriend} sx={{ color: "#27AE60", cursor: "pointer" }} />
        )
      ) : (
        <Chat
          onClick={() => {
            navigate("/chat");
          }}
        />
      )}
    </Card>
  );
};

export default FriendsCard;
