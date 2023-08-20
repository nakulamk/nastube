import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import axios from "axios";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  // const googleCloudApi = "AIzaSyAKLuptYiVtgkkDTt_J87FGlIMRyZkAVfQ";

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    // const fetchRelatedVideos = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://www.googleapis.com/youtube/v3/search",
    //       {
    //         params: {
    //           part: "snippet",
    //           type: "video",
    //           relatedToVideoId: id,
    //           key: googleCloudApi,
    //         },
    //       }
    //     );

    //     setVideos(response.data.items);
    //   } catch (error) {
    //     console.error("Error fetching related videos:", error);
    //   }
    // };
    // fetchRelatedVideos();
  }, [id]);

  console.log(videoDetail?.snippet?.description);

  useEffect(() => {
    const APIfetchData = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/search",
        params: {
          q: `${videoDetail.snippet.title}`,
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
        // console.log(response.data.items);
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    APIfetchData();
  });
  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  border="3px solid blue"
                  borderRadius="10px"
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  border="3px solid Red"
                  borderRadius="10px"
                >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
