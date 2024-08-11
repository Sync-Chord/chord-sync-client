// FriendsCard.js
import { Card, Avatar, Typography, Grid } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Box, display } from "@mui/system"

interface CardProps {
  profilePhoto: string
  userName: string
  joinedSince: string
  onAddFriend: () => void
  onRemoveFriend: () => void
  type: string
}

const FriendRequestCard = (props: CardProps) => {
  const {
    profilePhoto,
    userName,
    joinedSince,
    onAddFriend,
    type,
    onRemoveFriend,
  } = props
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        gap: "0.8rem",
      }}
    >
      <Avatar src={profilePhoto} alt="Profile" sx={{ width: 30, height: 30 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{}}>{userName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Since:{joinedSince}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <CheckCircleIcon
          onClick={() => {
            onAddFriend()
          }}
          fontSize="large"
          sx={{ color: "#27AE60", cursor: "pointer" }}
        />
        <CancelIcon
          onClick={() => {
            onRemoveFriend()
          }}
          fontSize="large"
          sx={{ color: "red", cursor: "pointer" }}
        />
      </Box>
    </Card>
  )
}

export default FriendRequestCard
