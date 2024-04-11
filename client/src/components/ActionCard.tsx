import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Chip, Divider, Paper } from '@mui/material';
import genericImage from "./../assets/seismometer.svg"
import { ActionCardProps } from './interfaces';
import { useNavigate } from 'react-router';

const ActionCard: React.FC<ActionCardProps> = ({ title, collection, id, feature }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={4} sx={{ width: 350 }}>
      <CardActionArea onClick={() => navigate(`features/${id}`, { state: { feature: feature } })}>
        <CardMedia component="img" height="160" width="100%" image={genericImage} alt="earthquake" style={{ background: "rgba(209, 209, 209, 0.87)" }} />
        <CardContent style={{ height: 180 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Divider />
          <Box display="flex" mt="2rem" alignItems="center" justifyContent="center">
            <Typography variant="body2" color="text.secondary">Collection:</Typography>
            <Chip label={collection} size="small" color="secondary" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default ActionCard;