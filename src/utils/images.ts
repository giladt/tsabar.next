export const wfImageUrl = (id: string, size: "th" | "lg") =>
  `https://wunderflatsng.blob.core.windows.net/imagesproduction/${id}${size === "th" ? "-thumbnail" : size === "lg" ? "-large" : ""
  }.jpg`;

export const localImageUrl = (id: string) =>
  `/images/apt-04/${id}.jpg`;
