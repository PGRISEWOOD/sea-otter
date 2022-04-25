import React, { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const { loading, repos } = useRepos({ search, language });
  const { items, total_count: totalCount } = repos || {};

  const handleSearch = debounce(({ target: { value } }) => {
    setSearch(value);
  }, 1000);

  const handleLanguageChange = ({ target: { value } }) => {
    setLanguage(value);
  };

  const handleLoadMore = () => {};

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
              value={language}
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
        {items && (
          <>
            <Grid item xs={12}>
              <h2>{`Showing ${1}-${
                items?.length
              } of ${totalCount} repositories`}</h2>
            </Grid>
            {items?.map(({ id, name, stargazers_count: stars }) => (
              <Grid item key={id} xs={12} md={6} lg={3}>
                <Card variant="outlined">
                  {name}----{stars}
                </Card>
              </Grid>
            ))}
          </>
        )}
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {items && !loading && (
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
