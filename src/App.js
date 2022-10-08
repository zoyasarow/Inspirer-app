import * as React from "react";
import Main from "./components/main";
import Colors from "./components/colorGenerator/generatorTab";
import Colors2 from "./components/colorGenerator/generatorTab2";
import Colors3 from "./components/colorGenerator/generatorTab3";
import Colors4 from "./components/colorGenerator/generatorTab4";
import Colors5 from "./components/colorGenerator/generatorTab5";
import Navbar from "./components/navbar";
// import logo from "./logo.svg";
import "./App.css";

import { search } from "./routes/chiArtApi";
import Search from "./routes/search-art";
import SearchResults from "./routes/searchresults-art";
import { useState, useEffect } from "react";

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function App() {
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear the results if the user gets rid of the search query
    if (!(query || query.length)) {
      setResults(null);
      return;
    }

    // Don't search for anything less than 3 characters
    if (query.length < 3) {
      return;
    }

    // Start a search
    setLoading(true);
    search(query, "id", "title", "image_id", "thumbnail")
      .then((searchResults) => {
        if (searchResults && searchResults.data) {
          setResults(searchResults.data);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <div>
        <Navbar />
        <Main />
      </div>

      <div>
        <Colors />
        <Colors2 />
        <Colors3 />
        <Colors4 />
        <Colors5 />
      </div>

      <div>
        <Search query={query} onChange={(e) => setQuery(e.target.value)} />
        <SearchResults results={results} loading={loading} />
      </div>
    </div>
  );
}

export default App;
