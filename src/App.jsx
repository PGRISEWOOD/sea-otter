import React from "react";
import "./App.css";
import { Typography } from "@mui/material";
import { RepoPage } from "./components/RepoPage/RepoPage";
import { RepoList } from "./components/RepoList/RepoList";
import { RepoCard } from "./components/RepoCard/RepoCard";

const App = () => (
  <div className="App">
    <Typography variant="h4">Github repository Search</Typography>
    <RepoPage>
      {({ repos, totalCount }) => (
        <RepoList repos={repos} totalCount={totalCount}>
          {RepoCard}
        </RepoList>
      )}
    </RepoPage>
  </div>
);

export default App;
