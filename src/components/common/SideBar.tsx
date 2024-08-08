import { Chat, Logout } from "@mui/icons-material"
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import symbol from "../../assests/images/symbol.jpg"
import styled from "@emotion/styled"
import PeopleIcon from "@mui/icons-material/People"
import HomeIcon from "@mui/icons-material/Home"
import { useState } from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"

const SideBar = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState<string>("")

  const handleListItemClick = (path: string) => {
    setSelectedIndex(path)
    navigate(path)
  }

  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }))

  const navigations = [
    {
      name: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <Chat />,
    },
    {
      name: "Friends",
      path: "/friend",
      icon: <PeopleIcon />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <Chat />,
    },
  ]

  const lognav = [
    {
      name: "Settings",
      path: "/settings",
      icon: <SettingsIcon />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <Logout />,
    },
  ]

  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <DrawerHeader>
          <img
            src={symbol}
            alt="Logo"
            style={{ maxHeight: "2rem", padding: "3px" }}
          />
        </DrawerHeader>
        <List>
          {navigations.map((el) => (
            <ListItem
              button
              key={el.path}
              onClick={() => handleListItemClick(el.path)}
              sx={{
                backgroundColor:
                  selectedIndex === el.path ? "#27AE60" : "inherit",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              >
                {el.icon}
              </ListItemIcon>
              <ListItemText
                primary={el.name}
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ top: "90%" }}>
        <List>
          {lognav.map((el) => (
            <ListItem
              button
              key={el.path}
              onClick={() => handleListItemClick(el.path)}
              sx={{
                backgroundColor:
                  selectedIndex === el.path ? "#27AE60" : "inherit",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              >
                {el.icon}
              </ListItemIcon>
              <ListItemText
                primary={el.name}
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default SideBar
