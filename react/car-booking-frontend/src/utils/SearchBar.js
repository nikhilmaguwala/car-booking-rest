import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

const SearchBar = ({value, onChange, title}) => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={title}
                value={value}
                onChange={onChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <i className='bx bx-search-alt-2 search-icon'></i>
            </IconButton>
        </Paper>
    )
}

export default SearchBar