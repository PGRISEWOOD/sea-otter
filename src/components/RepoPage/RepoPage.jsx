import React, { Fragment, useState } from "react";
import { debounce } from "lodash";
import {
  Grid,
  TextField,
  Box,
  Card,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
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

const RepoPage = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    search: "",
    language: "JavaScript",
  });
  const { loading, repos, totalCount, hasMore } = useRepos(searchParams);

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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Search repositories"
            variant="outlined"
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
        {repos && (
          <>
            <Grid item xs={12}>
              <h2>{`Showing ${1}-${
                repos?.length
              } of ${totalCount} repositories`}</h2>
            </Grid>
            {repos?.map(({ id, name, stargazers_count: stars }) => (
              <Fragment key={id}>
                <Grid item xs={12} md={6} lg={3}>
                  <Card variant="outlined">
                    {name}----{stars}
                  </Card>
                </Grid>
              </Fragment>
            ))}
          </>
        )}
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {repos && !loading && hasMore && (
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleLoadMore}>
              Load more
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export { RepoPage };
