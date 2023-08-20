import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import axios from "axios";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  // useEffect(() => {
  //   fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
  //     setVideos(data.items)
  //   );
  // }, [searchTerm]);

  useEffect(() => {
    // setVideos(null);
    const APIfetchData = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/search",
        params: {
          q: `${searchTerm}`,
          part: "snippet",

          maxResults: "50",
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
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    APIfetchData();
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
