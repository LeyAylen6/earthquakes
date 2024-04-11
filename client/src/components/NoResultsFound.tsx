import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import noResultsFound from "./../assets/noResultsFound.svg"

const NoResultsFound = () => {
    return (
        <Box mt={7}>
            <img src={noResultsFound} width="70%" />
            <Typography variant="h5">No results found</Typography>
        </Box>
    )
}

export default NoResultsFound;

