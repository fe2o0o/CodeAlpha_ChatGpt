import express from "express";
import OpenAI from "openai";
import { Server } from "socket.io";

const port = 8000;
const app = express();
const openai = new OpenAI({
  apiKey: "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",
});

const server = app.listen(port, () => {
  console.log("Server Running");
});

const io = new Server(server, {
  cors: "*",
});



io.on("connection", (socket) => {
  console.log("Welcome From Socket", socket.id);
  socket.on("message", async (message) => {
    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100
    });
    console.log(data.choices[0].message);
    socket.emit("answer", data.choices[0].message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});
