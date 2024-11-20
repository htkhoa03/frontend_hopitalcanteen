import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "20px",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          borderRadius: "30px",
          width: "100%",
          maxWidth: "600px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
