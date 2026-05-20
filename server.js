import express from "express";
import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

dotenv.config();

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "zoho-mail",
  version: "1.0.0"
});

server.tool(
  "test_connection",
  "Test whether Zoho Mail MCP server is working",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "Zoho Mail MCP server is connected."
        }
      ]
    };
  }
);

app.get("/", (req, res) => {
  res.send("Zoho Mail MCP Server Running");
});

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  res.status(202).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Zoho Mail MCP server running on port ${PORT}`);
});
