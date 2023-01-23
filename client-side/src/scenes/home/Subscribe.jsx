import React, { useState } from "react";
import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  return (
    <Box width="80%" margin="80px 0" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSixe="large" />
      </IconButton>
      <Typography variant="h3">Subscribe here to the newsletter</Typography>
      <Typography variant="h4">
        Bonus of Ksh. 1000 available to the first order
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#f2f2f2"
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
          }}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Typography sx={{ p: "10px", hover: { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;
