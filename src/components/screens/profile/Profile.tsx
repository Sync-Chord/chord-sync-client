import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {}

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        padding: 4,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Avatar sx={{ width: 250, height: 250 }} src={user.image} />
        <Button
          variant="contained"
          component="label"
          sx={{
            mt: 2,
            borderRadius: 2,
            bgcolor: "#27AE60",
            "&:hover": {
              backgroundColor: "#10632a",
            },
          }}
        >
          Change Photo
          <input hidden accept="image/*" type="file" />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          width: "60%",
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              mt: 2,
              borderRadius: 2,
              backgroundColor: "#27AE60",
              color: "white",
              "&:hover": {
                backgroundColor: "#10632a",
              },
            }}
            onClick={toggleEditMode}
          >
            Save Changes
          </Button>
        </Box>
        <Box sx={{ padding: "0.5rem" }}>
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Mobile"
            name="phone"
            value={userData.phone_number}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Gender"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  )
};

export default Profile;
