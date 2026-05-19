import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zoho Mail MCP Server Running");
});

app.get("/mcp", (req, res) => {
  res.json({
    name: "zoho-mail-mcp",
    status: "running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
