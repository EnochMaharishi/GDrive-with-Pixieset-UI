"use client";

import { useEffect, useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import LightboxViewer from "@/components/LightboxViewer";

export default function GalleryPage({
  params,
}: {
  params: { folderId: string };
}) {
  const [images, setImages] = useState<any[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetch(`/api/gallery?folderId=${params.folderId}`)
      .then((r) => r.json())
      .then(setImages);
  }, [params.folderId]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <GalleryGrid images={images} onClick={setIndex} />

      <LightboxViewer
        index={index}
        close={() => setIndex(-1)}
        images={images}
      />
    </main>
  );
}
