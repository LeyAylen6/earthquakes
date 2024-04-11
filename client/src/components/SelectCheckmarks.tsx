import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

interface SelectCheckmarksProps {
    label: string
    value: string[]
    onChange: (event: SelectChangeEvent<string[]>) => void
    options: string[]
}

const ITEM_HEIGHT: number = 48;
const ITEM_PADDING_TOP: number = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SelectCheckmarks: React.FC<SelectCheckmarksProps> = ({ label, value, onChange, options }) => {
    return (
        <Box>
            <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    labelId={label}
                    id={label}
                    multiple
                    value={value}
                    onChange={onChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={value.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectCheckmarks;