import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';


type PropsType = {
    name: string
}

export const SelectVariants: React.FC<PropsType> = ({name}) => {
    const [sortBy, setSortBy] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    return (
        <div>
            <FormControl style={{position: 'relative'}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel style={{width: '100%', textAlign: 'center'}} id="demo-simple-select-standard-label"><span style={{position: 'absolute' , top: '-2px', left: '0px'}}><ElectricBoltIcon style={{color: '#33cf4d'}}/></span> {name}  </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sortBy}
                    onChange={handleChange}
                    label="Sort by"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>white</MenuItem>
                    <MenuItem value={20}>black</MenuItem>
                    <MenuItem value={30}>gray</MenuItem>
                    <MenuItem value={40}>pink</MenuItem>
                    <MenuItem value={50}>beige</MenuItem>
                    <MenuItem value={60}>green</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}