import app from "./app.js";

const port = Number(process.argv[2]) || Number(process.env.PORT) || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
