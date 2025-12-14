"use client";

import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";

export default function LightboxViewer({
  index,
  close,
  images,
}: {
  index: number;
  close: () => void;
  images: any[];
}) {
  return (
    <Lightbox
      open={index >= 0}
      close={close}
      index={index}
      slides={images.map((img) => ({
        src: img.src,
        download: `/api/download?fileId=${img.id}`,
      }))}
      plugins={[Download]}
    />
  );
}
