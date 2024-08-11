// FriendsCard.js
import { Card, Avatar, Typography, Grid } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"

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
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar
        src={profilePhoto}
        alt="Profile"
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />
      <Grid container direction="column" sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Joined since: {joinedSince}
        </Typography>
      </Grid>

      <PersonAddAlt1Icon
        onClick={() => {
          onAddFriend()
        }}
        sx={{ color: "blue", cursor: "pointer" }}
      />
      <CancelIcon
        onClick={() => {
          onRemoveFriend()
        }}
        sx={{ color: "red", cursor: "pointer" }}
      />
    </Card>
  )
}

export default FriendRequestCard
