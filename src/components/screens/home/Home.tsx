import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { toast } from "react-toastify";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { height } from "@mui/system";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Home = () => {
  const check = () => {
    toast.success("welcome to home page");
  };
  check();

  return (
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
      molestiae quidem sed magni aperiam voluptatum autem tenetur quasi,
      deserunt minus reprehenderit? Velit consequuntur reprehenderit magnam
      officiis quo debitis quis deserunt! Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Sint, nisi tenetur, adipisci unde sequi, recusandae
      perferendis excepturi ipsam deserunt soluta accusamus. Veniam itaque ullam
      nam quasi praesentium perferendis accusantium corporis? Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Nam, eos unde mollitia, vero culpa
      esse laborum aperiam, repellat libero aut laudantium hic dolor soluta
      temporibus consequuntur animi repellendus ipsum expedita?
    </div>
  );
};

export default Home;
