"use client";

import { Image } from "lucide-react";

interface Props {
  onFileSelected: (file: File) => void;
  uploading: boolean;
}

export default function ImageUpload({ onFileSelected, uploading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="mt-2">
      <label className="py-2 px-3 bg-primary rounded-sm cursor-pointer text-white flex items-center gap-2 w-fit">
        Choose image <Image />
        <input type="file" accept="image/*" onChange={handleChange} hidden />
      </label>
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
