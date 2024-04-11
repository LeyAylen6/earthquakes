import { useEffect, useState } from "react";
import ActionCard from "../../components/ActionCard";
import { getAllFeatures } from "../../services/earthquakesAPI";
import Pagination from "@mui/material/Pagination";
import * as React from 'react';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { magTypes } from "./constants";
import { EarthquakeResponse } from "./interfaces";
import SelectCheckmarks from "../../components/SelectCheckmarks";
import { Paper, Stack, Typography } from "@mui/material";
import NoResultsFound from "../../components/NoResultsFound";

const Home: React.FC = () => {
    const [features, setFeatures] = useState<EarthquakeResponse | null>(null);
    const [page, setPage] = useState(1);
    const [magTypeFilter, setMagTypeFilter] = useState<string[]>([])

    const PER_PAGE = 20;
    const MAX_PAGES = features != null ? Math.ceil(features?.pagination?.total / PER_PAGE) : 10;

    const handleChangePages = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleChangeFilter = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;

        setMagTypeFilter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        getAllFeatures(page, PER_PAGE, magTypeFilter.toString())
            .then((features) => setFeatures(features))
    }, [page, magTypeFilter])

    return (
        <Stack direction="column">
            <Box display="flex" justifyContent="space-between">
                <Paper elevation={4} sx={{ width: 200, height: 50, display: "flex", justifyContent: "space-evenly", alignItems: "center", mt: 1 }}>
                    <Typography variant="body1" mt={.5}>Total:</Typography>
                    <Typography variant="h6">{features?.pagination?.total}</Typography>
                </Paper>

                <SelectCheckmarks
                    label={"Mag Type"}
                    value={magTypeFilter}
                    onChange={handleChangeFilter}
                    options={magTypes}
                />
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="space-between" height={"90%"}>
                {!features?.data?.length
                    ? <NoResultsFound />
                    : features?.data?.map((feature: any) =>
                        <Box key={feature.id} mt={4}>
                            <ActionCard title={feature.attributes.title} collection={feature.type} id={feature.id} feature={feature} />
                        </Box>
                    )
                }
            </Box>

            <Box mt={5} mb={5}>
                <Pagination count={MAX_PAGES || 10} page={page} onChange={handleChangePages} color="secondary" />
            </Box>
        </Stack>
    )
}

export default Home;