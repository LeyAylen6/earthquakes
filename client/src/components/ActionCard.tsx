import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Divider } from '@mui/material';
import genericImage from "./../assets/seismometer.svg"
import { ActionCardProps } from './interfaces';

const ActionCard = ({ title, collection }: ActionCardProps) => {
  return (
    <Card sx={{ width: 350 }}>
      <CardActionArea>
        <CardMedia component="img" height="160" width="100%" image={genericImage} alt="earthquake" style={{ background: "rgba(209, 209, 209, 0.87)" }} />
        <CardContent style={{ height: 180 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" mt="5%">
            Collection: <Chip label={collection} size="small" color="secondary" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionCard;