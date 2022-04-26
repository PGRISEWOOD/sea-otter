import { Card, Typography, Badge, CardActions, Link } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import StarOutline from "@mui/icons-material/StarOutline";

const RepoCard = ({ repo: { name, url, homepage, stars } }) => (
  <Card variant="outlined" sx={{ backgroundColor: "primary.light" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "primary.contrastText" }}
        component="span"
      >
        {name}
      </Typography>
      <Badge
        color="secondary"
        badgeContent={stars}
        max={99999}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <StarOutline />
      </Badge>
    </div>
    <CardActions>
      {url && <Link href={url}>Github</Link>}
      {homepage && <Link href={homepage}>Homepage</Link>}
    </CardActions>
  </Card>
);

RepoCard.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    stars: PropTypes.number.isRequired,
  }).isRequired,
};

export { RepoCard };
