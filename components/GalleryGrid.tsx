"use client";

import PhotoAlbum from "react-photo-album";

export default function GalleryGrid({
  images,
  onClick,
}: {
  images: any[];
  onClick: (index: number) => void;
}) {
  return (
    <PhotoAlbum
      layout="masonry"
      photos={images}
      onClick={({ index }) => onClick(index)}
      columns={(w) => (w < 640 ? 2 : w < 1024 ? 3 : 4)}
    />
  );
}
