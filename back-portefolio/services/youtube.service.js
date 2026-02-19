import { env } from "../config/env.js";

export async function searchYoutube(query, maxResults = 5) {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("q", query);
  url.searchParams.set("maxResults", String(Math.min(maxResults, 10)));
  url.searchParams.set("key", env.ytApiKey);

  const r = await fetch(url);
  const data = await r.json();

  if (!r.ok) {
    // on remonte l'erreur Google telle quelle (utile en debug)
    throw new Error(data?.error?.message || "YouTube API error");
  }

  return (data.items || [])
    .map((it) => ({
      videoId: it.id?.videoId,
      title: it.snippet?.title,
      channelTitle: it.snippet?.channelTitle,
      thumbnail: it.snippet?.thumbnails?.default?.url,
    }))
    .filter((x) => x.videoId);
}
