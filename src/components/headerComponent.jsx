import React, { useState } from "react";
import logo from "../assets/logoTexto.png"
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const HeaderComponent = () => {
    const [filter, setFilter] = useState('');
    const search = ["Find the perfect photo for your project", "Free stock photos"];
    const myPhotos = ["Manage your favorite photos", "Saved photos"];

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return <>
        <header className="header">
            <nav className="header__nav">
                <img className="header__nav__logo" src={logo} />
                <button className="header__nav__dropdown">≡</button>
            </nav>
            <div className="header__search-container">
                <h2 className="header__search-container__title">{search[0]}</h2>
                <TextField className="header__search-container__textfield" id="filled-basic" label="Search photos" variant="filled" />
                <FormControl className="header__search-container__select" variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Filter by</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={filter}
                    onChange={handleChange}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="width">Width</MenuItem>
                        <MenuItem value="height">Height</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="likes">Likes</MenuItem>
                    </Select>
                </FormControl>
                <h3 className="header__search-container__subtitle">{search[1]}</h3>
            </div>
        </header>
    </>
}