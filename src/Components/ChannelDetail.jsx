import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import axios from "axios";
const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [banner, setBanner] = useState("");

  // useEffect(()=>{
  //   const fetchChannelDetail=async()=>{

  //   }
  // })

  const apiUrl = "https://www.googleapis.com/youtube/v3/channels";
  const channelId = `${id}`;
  const apiKey = "AIzaSyAKLuptYiVtgkkDTt_J87FGlIMRyZkAVfQ";

  const params = {
    part: "brandingSettings",
    id: channelId,
    key: apiKey,
  };

  axios
    .get(apiUrl, { params })
    .then((response) => {
      // Handle the response data here

      // console.log("Response:", response.data);

      setBanner(
        response.data.items[0].brandingSettings.image.bannerExternalUrl
      );
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  // console.log(channelDetail, videos);

  return (
    <Box minHeight="95vh" style={{ background: "#000" }}>
      <Box>
        <div
          style={{
            height: "300px",
            backgroundImage: `url(${banner})`,
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
