import { useEffect, useState } from "react";
import ActionCard from "../components/ActionCard";
import { getAllFeatures } from "../services/earthquakesAPI";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const Home = () => {
    const [features, setFeatures] = useState<any>({});
    const [page, setPage] = useState(1);

    const PER_PAGE = 21
    const MAX_PAGES = Math.ceil(features?.pagination?.total / PER_PAGE)

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        getAllFeatures(page, PER_PAGE)
            .then((features) => setFeatures(features))
    }, [page])

    return (
        <Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {features?.data?.map((feature: any) =>
                    <Box key={feature.id} mt={4}>
                        <ActionCard title={feature.attributes.title} collection={feature.type} />
                    </Box>
                )}
            </Box>
            <Box mt={5}>
                <Pagination count={MAX_PAGES} page={page} onChange={handleChange} color="secondary" />
            </Box>
        </Box>
    )
}

export default Home;