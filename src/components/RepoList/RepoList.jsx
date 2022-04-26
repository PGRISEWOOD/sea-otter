import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const RepoList = ({ children, repos, totalCount }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h6">
        {`Showing ${1}-${repos.length} of ${totalCount} repositories`}
      </Typography>
    </Grid>
    {repos.map(
      ({ id, name, homepage, html_url: url, stargazers_count: stars }) => (
        <Fragment key={id}>
          <Grid item xs={12} md={6} lg={3}>
            {children({ repo: { name, stars, homepage, url } })}
          </Grid>
        </Fragment>
      )
    )}
  </>
);

RepoList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
      stargazers_count: PropTypes.number,
    })
  ).isRequired,
  totalCount: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

export { RepoList };
