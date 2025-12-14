"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseDriveLink } from "@/lib/parseDriveLink";

export default function DriveLinkForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const folderId = parseDriveLink(value);
    if (!folderId) return alert("Invalid Google Drive folder link");
    router.push(`/gallery/${folderId}`);
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto mt-40 px-4">
      <input
        type="url"
        required
        placeholder="Paste Google Drive folder link"
        className="w-full p-4 border rounded-lg text-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="mt-4 w-full bg-black text-white py-3 rounded-lg">
        Create Gallery
      </button>
    </form>
  );
}
