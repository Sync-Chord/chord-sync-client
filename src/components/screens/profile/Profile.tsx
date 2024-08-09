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

  const toggleEditMode = () => {
    if (editMode) {
      // Here you can dispatch an action to save the changes, e.g.:
      // dispatch(updateUserData(userData));
    }
    setEditMode(!editMode);
  };

  return (
    <Grid
      container
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 5,
        width: "90%",
        marginLeft: "5%",
      }}
    >
      <Grid container spacing={5}>
        <Grid item spacing={5}>
          <Avatar sx={{ width: 150, height: 150 }} src={user.image} />
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
        </Grid>

        <Grid item>
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
            {editMode ? "Save Changes" : "Edit Profile"}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Box>
          {editMode ? (
            <Grid
              spacing={2}
              sx={{ "& .MuiTextField-root": { m: 1, width: "75ch" } }}
            >
              <Grid container>
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
              </Grid>
              <Grid container>
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
              </Grid>
            </Grid>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {user.age ? user.age : "Age"}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {user.gender ? user.gender : "Gender"}
              </Typography>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
