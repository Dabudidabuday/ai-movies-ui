import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
} from "@mui/material";
import { api } from "../api/api";

export const MainPage = () => {
  const [value, set$value] = useState("");
  const [films, set$films] = useState([]);

  const generateLink = (title: string) => {
    const replaceSpaces = title.replace(" ", "+");

    return `https://megogo.net/ua/search-extended?q=${replaceSpaces}`;
  };

  const fetchFilms = async () => {
    const response = await api.post("/message", { message: value });

    set$films(response.data);
    // set$value("");
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "40px auto",
        maxWidth: "1700px",
      }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          value={value}
          sx={{ width: "1000px" }}
          onChange={({ target: { value } }) => set$value(value)}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={fetchFilms}
          sx={{ height: 56, marginLeft: 3 }}
        >
          Search
        </Button>
      </Box>

      <List sx={{ display: "flex" }}>
        {films?.map(({ title, genre, director, plot, poster, year }) => (
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "1040px",
              width: "100%",
              gap: 2,
            }}
            key={title}
          >
            <Card
              sx={{
                padding: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: 20, marginBottom: 2 }}
              >
                {title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Typography>
                    <b>Director:</b> <br /> {director}
                  </Typography>
                  <Typography>
                    <b>Year:</b> <br /> {year}
                  </Typography>
                  <Typography sx={{ minHeight: "96px" }}>
                    <b>Genre:</b> <br /> {genre}
                  </Typography>

                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    href={generateLink(title)}
                    target="_blank"
                  >
                    Watch
                  </Button>
                </Box>
                <CardMedia
                  sx={{
                    maxHeight: "auto",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    width: "50%",
                  }}
                  component="img"
                  image={poster}
                />
              </Box>
              <Typography sx={{ marginTop: 2 }}>
                <b>Plot:</b> {plot}
              </Typography>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
