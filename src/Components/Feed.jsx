import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

// import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import axios from "axios";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // setVideos(null);
    const APIfetchData = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/search",
        params: {
          q: "music",
          part: "snippet,id",
          regionCode: "US",
          maxResults: "50",
          order: "date",
        },
        headers: {
          "X-RapidAPI-Key":
            "dfe3ce08eamsh9551c900a1b755ep1dc34cjsna7155636dc66",
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    APIfetchData();
  }, [selectedCategory]);
  return (
    <Stack
      sx={{ flexDirection: { sx: "column", md: "row" }, background: "#000" }}
    >
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          // background: "#000",
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2022 NAS Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
