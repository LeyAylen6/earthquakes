import Box from "@mui/material/Box";
import inConstruction from "./../../assets/inConstruction.svg"
import { Typography } from "@mui/material";

const About: React.FC = () => {
    return (
        <Box>
            <img src={inConstruction} width="70%" />
            <Typography variant="h4" color="primary">In construction..</Typography>
        </Box>
    )
}

export default About;