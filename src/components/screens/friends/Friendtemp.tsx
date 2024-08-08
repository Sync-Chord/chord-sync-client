import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
} from "@mui/material";

interface User {
  name: string;
  joined: string;
}

const friendsList: User[] = [
  { name: "David Williams", joined: "December 2022" },
  { name: "Bob Smith", joined: "June 2020" },
  { name: "Charlie Brown", joined: "August 2021" },
];

const suggestions: User[] = [
  { name: "Frank Miller", joined: "February 2018" },
  { name: "Bob Smith", joined: "June 2020" },
  { name: "Charlie Brown", joined: "August 2021" },
  { name: "David Williams", joined: "December 2022" },
];

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <Card
    variant="outlined"
    sx={{ display: "flex", alignItems: "center", padding: 2, marginBottom: 2 }}
  >
    <Avatar sx={{ width: 50, height: 50, marginRight: 2 }}>U</Avatar>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        Joined since: {user.joined}
      </Typography>
    </CardContent>
    <Button variant="contained" color="primary">
      Add Friend
    </Button>
  </Card>
);

const FriendsSuggestionsPage: React.FC = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Friends List
          </Typography>
          {friendsList.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Suggestions
          </Typography>
          {suggestions.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendsSuggestionsPage;
