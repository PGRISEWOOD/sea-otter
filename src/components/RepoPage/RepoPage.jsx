import React, { useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import {
  Grid,
  TextField,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRepos } from "../../hooks/useRepos/useRepos";

const LANGUAGES = [
  "C",
  "C++",
  "C#",
  "Go",
  "Java",
  "JavaScript",
  "PHP",
  "Python",
  "Ruby",
  "Scala",
  "TypeScript",
];

const RepoPage = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    search: "",
    language: "JavaScript",
  });
  const { loading, repos, totalCount, hasMore, error } = useRepos(searchParams);

  const handleSearch = debounce(({ target: { value } }) => {
    setSearchParams((params) => ({ ...params, page: 1, search: value }));
  }, 1000);

  const handleLanguageChange = ({ target: { value } }) => {
    setSearchParams((params) => ({ ...params, page: 1, language: value }));
  };

  const handleLoadMore = () => {
    setSearchParams((params) => ({ ...params, page: params.page + 1 }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {error && (
          <Grid item xs={12}>
            <Alert data-testid="error-alert" severity="error">
              {error}
            </Alert>
          </Grid>
        )}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="search-input"
              data-testid="search-input"
              label="Search repositories"
              variant="outlined"
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                data-testid="language-select"
                id="language-select"
                value={searchParams.language}
                label="Language"
                onChange={handleLanguageChange}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem value={lang} key={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {repos &&
          children({
            repos,
            totalCount,
          })}
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {repos && !loading && hasMore && (
          <Grid item xs={12}>
            <Button
              data-testid="load-more-button"
              variant="contained"
              onClick={handleLoadMore}
            >
              Load more
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
RepoPage.propTypes = {
  children: PropTypes.func.isRequired,
};

export { RepoPage };
