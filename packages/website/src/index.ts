import express from "express";

import React from "react";
import { renderToString } from "react-dom/server";

import { Hello } from "reactx";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.get("*", (_req, res) => {
  const html = renderToString(React.createElement(Hello));
  res.send(html);
});

app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
