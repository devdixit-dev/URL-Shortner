import { nanoid } from "nanoid";
import URL from "../models/url.js";

export const handleGenerateNewShortURL = async (req, res) => {

  const { url } = req.body;

  if(!url) {
    return res.status(400).json({
      success: false,
      message: "Url is required"
    })
  }

  const shortId = nanoid(6);
  await URL.create({
    shortId, 
    redirectUrl: url,
    visitHistory: []
  });

  return res.json({
    "Original URL": `${url}`,
    "Short URL": `http://localhost:3000/${shortId}`
  })

}

export const handleGetAnalytics = async (req, res) => {

  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  })

}