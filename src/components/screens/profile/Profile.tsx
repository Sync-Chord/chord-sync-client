import { Avatar, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import User from "../../../apis/user";
import { update_user_details_reducer } from "../../../redux/authReducer";
import ButtonLoader from "../../common/ButtonLoader";

const Profile = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({ ...user });
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      setUserData((prevData: any) => ({
        ...prevData,
        profile_photo: URL.createObjectURL(file),
        profile_photo_file: file,
      }));
    } else {
      setUserData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const filterUnchangedFields = (updatedData: any, originalData: any) => {
    const changedFields: any = {};

    for (const key in updatedData) {
      if (updatedData[key] !== originalData[key]) {
        changedFields[key] = updatedData[key];
      }
    }

    return changedFields;
  };

  const handleSave = () => {
    const changedData = filterUnchangedFields(userData, user);

    if (Object.keys(changedData).length > 0) {
      const formData = new FormData();

      if (
        changedData.profile_photo &&
        changedData.profile_photo.startsWith("blob:")
      ) {
        formData.append("file", userData.profile_photo_file);
      }

      delete changedData.profile_photo;

      formData.append("update_data", JSON.stringify(changedData));

      setLoading(true);
      User.edit_user_profile(formData, { token: token, id: user.id })
        .then((res: any) => {
          setLoading(false);
          if (res.status !== 200) {
            throw new Error(res.data.message);
          } else {
            toast.success("profile updated successfully")
            dispatch(update_user_details_reducer(res.data.data))
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
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
        <Avatar
          sx={{ width: "70%", height: "50%" }}
          src={userData.profile_photo}
        />
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
          <input
            onChange={handleInputChange}
            hidden
            accept="image/*"
            type="file"
          />
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
          {loading ? (
            <ButtonLoader />
          ) : (
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
              onClick={handleSave}
            >
              Save Changes
            </Button>
          )}
        </Box>
        <Box sx={{ padding: "0.5rem" }}>
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            sx={{ mb: 2, width: "100%" }}
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
            name="phone_number"
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
  );
};

export default Profile;
