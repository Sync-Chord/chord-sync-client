// FriendsCard.js
import { Card, Avatar, Typography, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import { useSelector } from "react-redux";
import { useState } from "react";
import User from "../../apis/user";
import { toast } from "react-toastify";
import ButtonLoader from "./ButtonLoader";

interface UserProp {
  id: number;
  name: string;
  email: string;
  profile_photo: string;
  created_at: string;
}

interface CardProps {
  request: {
    id: number;
    status: string;
    user: UserProp;
  };
}

const FriendRequestCard = ({ request }: CardProps) => {
  const { user, token } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const [userRequest, setUserRequest] = useState(request);

  const handleAcceptOrReject = (accepted: boolean) => {
    setLoading(true);
    User.accept_request(
      { accept: accepted, request_id: userRequest.id },
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
          setUserRequest((prev) => ({
            ...prev,
            status: accepted ? "accepted" : "rejected",
          }));
          toast.success(accepted ? "Request Accepted" : "Request Rejected");
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
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar src={userRequest.user.profile_photo} alt="Profile" sx={{ width: 30, height: 30 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: "bold" }}>
          {userRequest.user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Joined: {moment(userRequest.user.created_at).format("MMM YYYY")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        {loading ? (
          <ButtonLoader />
        ) : userRequest.status !== "accepted" && userRequest.status !== "rejected" ? (
          <>
            <CheckCircleIcon
              onClick={() => handleAcceptOrReject(true)}
              fontSize="large"
              sx={{ color: "#27AE60", cursor: "pointer" }}
            />
            <CancelIcon
              onClick={() => handleAcceptOrReject(false)}
              fontSize="large"
              sx={{ color: "red", cursor: "pointer" }}
            />
          </>
        ) : (
          <Typography color={userRequest.status === "rejected" ? "red" : "green"}>
            {userRequest.status}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default FriendRequestCard;
