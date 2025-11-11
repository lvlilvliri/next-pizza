'use client';

import React, {  useEffect, useState, useMemo, useRef } from "react";
import { Textarea, Input, Select } from "@/components/ui";
import { WhiteBlock } from "../white-block";
import { Autocomplete } from "@react-google-maps/api";
import { SelectContent , SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

type City = { name: string; lat: number; lng: number };
const RADIUS_METERS = 15000;

const cities: City[] = [
  { name: "Одеса", lat: 46.4825, lng: 30.7233 },
  { name: "Київ", lat: 50.4501, lng: 30.5234 },
  { name: "Львів", lat: 49.8397, lng: 24.0297 },
];

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState("");

  const setCityBounds = (
    auto: google.maps.places.Autocomplete,
    city: City
  ) => {
    const circle = new google.maps.Circle({
      center: { lat: city.lat, lng: city.lng },
      radius: RADIUS_METERS,
    });
    const bounds = circle.getBounds();
    if (bounds) auto.setBounds(bounds);
  };

  const handlePlaceChanged = () => {
    const auto = autocompleteRef.current;
    if (!auto) return;
    const place = auto.getPlace();

    const street =
      place.address_components?.find((c) => c.types.includes("route"))
        ?.long_name || "";
    const house =
      place.address_components?.find((c) => c.types.includes("street_number"))
        ?.long_name || "";
    setAddress(`${street} ${house}`.trim());
  };

  useEffect(() => {
    const auto = autocompleteRef.current;
    if (!auto || !selectedCity) return;
    setCityBounds(auto, selectedCity);
  }, [selectedCity]);

  const options = useMemo(
    () => ({
      componentRestrictions: { country: "UA" },
      fields: ["address_components", "geometry"],
      types: ["address"],
      strictBounds: true,
    }),
    []
  );
  
  return (
    <WhiteBlock title="3. Delivery details">
      <div className="flex flex-col gap-5">
        <Select
          value={selectedCity.name}
          onValueChange={(name) => {
            const city = cities.find((c) => c.name === name);
            if (!city) return;
            setSelectedCity(city);
            setAddress("");
          }}
        >
          <SelectTrigger className="text-base">
            <SelectValue placeholder="Місто" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Міста</SelectLabel>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex  gap-5 ">
          <div className="basis-1/2">
            <Autocomplete
              onLoad={(auto) => {
                autocompleteRef.current = auto;
                setCityBounds(auto, selectedCity);
              }}
              onPlaceChanged={handlePlaceChanged}
              options={options}
            >
              <Input
                placeholder="Address"
                className="text-base basis-1/2"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Autocomplete>
          </div>
          <div className="basis-1/2">
            <Input placeholder="Building, apartment, etc." className="text-base" name="building" />
            </div>
        </div>

        <Textarea
          rows={5}
          className="text-base"
          placeholder="Notes"
          name="note"
        />
      </div>
    </WhiteBlock>
  );
};
