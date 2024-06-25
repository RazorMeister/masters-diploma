const express = require("express");
const cors = require("cors");
const { axiosInstance } = require("./axiosSetup.js");
const { getComments, insertComment } = require("./db.js");

const initExpress = async () => {
  const app = express();
  const port = process.env.APP_PORT || 7999;

  app.use(express.json());
  app.use(cors());

  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const post = await getPostById(req.params.postId);

      const comments = await getComments(post.data.id);

      return res.json({
        success: true,
        data: comments.map((comment) => ({
          id: comment.id,
          postId: comment.postId,
          content: comment.content,
          createdAt: comment.created_at,
        })),
      });
    } catch (e) {
      console.log(e);

      return res.status(e.response?.status ?? 500).json({
        success: false,
        data: e.response?.data?.data ?? e.message ?? "Undefined",
      });
    }
  });

  app.post("/api/posts/:postId/comments", async (req, res) => {
    try {
      const post = await getPostById(req.params.postId);

      await insertComment(post.data.id, req.body.content);

      return res.json({ success: true, data: null });
    } catch (e) {
      console.log(e);

      return res.status(e.response?.status ?? 500).json({
        success: false,
        data: e.response?.data?.data ?? e.message ?? "Undefined",
      });
    }
  });

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
};

const getPostById = async (postId) => {
  const result = await axiosInstance.get(`api/posts/${postId}`);
  return result.data;
};

module.exports = {
  initExpress,
};
