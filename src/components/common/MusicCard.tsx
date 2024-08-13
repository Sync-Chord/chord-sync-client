import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface MusicCardProps {
  musicImage: string;
  title: string;
  artist: string;
  duration: string;
  handleClick: () => void;
}

const MusicCard = (props: MusicCardProps) => {
  const { musicImage, title, artist, duration, handleClick } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick} sx={{ cursor: "cursor" }}>
        <CardMedia
          component="img"
          height="180"
          image={musicImage}
          alt={title}
        />
        <CardContent sx={{ backgroundColor: "#f1f1f1" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Artist Name: {artist}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {duration}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MusicCard;
