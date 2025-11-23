"use client";

import { useEffect, useRef } from "react";

interface Props {
  onChange: (value: string) => void;
  className?: string;
}

export const AddressInput: React.FC<Props> = ({ onChange, className }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(interval);

        const autocomplete = new google.maps.places.Autocomplete(ref.current!, {
          types: ["address"],
          componentRestrictions: { country: "ua" },
          fields: ["formatted_address", "geometry", "address_components"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const value = place.formatted_address || "";
          onChange(value);
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onChange]);

  return (
    <input
      ref={ref}
      type="text"
      placeholder="Введите адрес"
      className={`border rounded-xl px-4 py-3 text-base ${className || ""}`}
      onChange={(e) => onChange(e.target.value)} // ручной ввод тоже работает
    />
  );
};
