import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircle from "@mui/icons-material/AccountCircle"
import PeopleIcon from "@mui/icons-material/People"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "../../assests/images/symbol.jpg"
import { Avatar } from "@mui/material"

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#c0eaca",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "70ch", // Adjust the width as needed
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  bottom: 0,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}))

const TopBar = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.auth.user)
  console.log(user)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{
            color: "black",
            "&:hover": {
              backgroundColor: "#27AE60",
              color: "white",
            },
          }}
        >
          <Badge badgeContent={17} color="error">
            <PeopleIcon />
          </Badge>
        </IconButton>
        <p style={{ color: "black" }}>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          sx={{
            color: "black",
            "&:hover": {
              backgroundColor: "#27AE60",
              color: "white",
            },
          }}
        >
          <AccountCircle />
        </IconButton>
        <p style={{ color: "black" }}>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", border: "none" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon
                  sx={{ color: "black", "&:hover": { color: "#27AE60" } }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Music…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex", gap: 4, alignItems: "center" },
            }}
          >
            <IconButton
              onClick={() => {
                navigate("/friend")
              }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{
                color: "black",
              }}
            >
              <Badge badgeContent={17} color="error">
                <PeopleIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              onClick={() => {
                navigate("/profile")
              }}
              edge="end"
              aria-label="account of current user"
              color="inherit"
              sx={{
                color: "black",
              }}
            >
              <Avatar sx={{ bgcolor: "#27AE60" }}>{user.name[0]}</Avatar>
            </IconButton>
            <Typography sx={{ color: "black", alignItems: "center" }}>
              {user.name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  )
}

export default TopBar
