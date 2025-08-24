// src/data/projects.js
// src/data/projects.js

// Grab all image files in thumbnails folder
const thumbs = import.meta.glob("../assets/thumbnails/*.{png,jpg,jpeg}", {
  eager: true, // load immediately, not async
  import: "default", // get the URL, not module object
});

// Helper: get thumbnail by basename
function getThumb(name) {
  for (const path in thumbs) {
    if (path.includes(name)) return thumbs[path];
  }
  return null;
}

export const projects = [
  {
    id: "bob1",
    title: "With Bob",
    period: "2022",
    summary:
      "A series of poorly drawn shorts about the unfortunate exploits of a man named Bob.",
    youtubeId: "RvULjHbf3l4",
    software: ["FlipaClip"],
    hardware: ["Iphone"],
    images: [getThumb("bob1")],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=RvULjHbf3l4" },
    ],
  },
  {
    id: "bob2",
    title: "With Bob: 2",
    period: "2022",
    summary: "Sequel to With Bob",
    youtubeId: "nISOc41eaLM",
    software: ["FlipaClip"],
    hardware: ["Iphone"],
    images: [getThumb("bob2")],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=nISOc41eaLM" },
    ],
  },
  {
    id: "bob3",
    title: "With Bob: 3",
    period: "2023",
    summary: "The sequel to the sequel of the hit movie With Bob",
    youtubeId: "tIB3oaQbGAY",
    software: ["FlipaClip"],
    hardware: ["Iphone"],
    images: [getThumb("bob3")],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=tIB3oaQbGAY" },
    ],
  },
  {
    id: "cptn-plasnosis-1",
    title: "Captain Plasnosis: The Beginning",
    period: "2024",
    summary:
      "Captain plasnosis has been missing for many years, kidnapped by aliens and taken to the far reaches of space. Now he tries to venture home, and defeat his enemies.",
    youtubeId: "8qsKha2uelY",
    software: ["FlipaClip"],
    hardware: ["Iphone"],
    images: [getThumb("captain-plasnosis-1")],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=8qsKha2uelY" },
    ],
  },
  {
    id: "trife",
    title: "Trife",
    period: "2025",
    summary:
      "A semi malfunctioning robot wakes up on an empty space station, only to discover another hostile robot.",
    youtubeId: "9o0sbB_xhtw",
    software: ["FlipaClip"],
    hardware: ["Iphone"],
    images: [getThumb("trife")],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=9o0sbB_xhtw" },
    ],
  },
];
