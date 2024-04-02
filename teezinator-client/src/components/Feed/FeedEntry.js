import React from "react";
import { Image } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Popover,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

const FeedEntry = ({ entry, handleOpenImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatDate = (date) =>
    `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  function calcTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.round((now - date) / 1000);
    const diffInMinutes = Math.round(diffInSeconds / 60);
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays <= 3) {
      return `${diffInDays} days ago`;
    } else {
      return formatDate(date);
    }
  }

  const stringToColour = (str) => {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  return (
    <>
      <Card className="liveFeedEntry" elevation={2}>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: stringToColour(entry.user) }} src="">
              {entry.user.charAt(0)}
            </Avatar>
          }
          title={entry.user}
          subheader={
            <Tooltip
              title={formatDateTime(entry.time)}
              enterTouchDelay={50}
              leaveTouchDelay={3000}
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -10],
                      },
                    },
                  ],
                },
              }}
            >
              <span>{calcTime(entry.time)}</span>
            </Tooltip>
          }
        />
        <CardContent>Drank {entry.tea.name}</CardContent>
        <CardActions>
          {entry.image && (
            <Button
              startIcon={<Image />}
              onClick={() => handleOpenImage(entry.image)}
            >
              Show image
            </Button>
          )}
        </CardActions>
      </Card>

      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        The content of the Popover.
      </Popover>
    </>
  );
};

export default FeedEntry;
