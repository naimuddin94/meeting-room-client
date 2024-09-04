import { Input } from "@/components/ui/input";
import React from "react";

type TimeInputProps = {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
};

export default function TimePiker({ time, setTime }: TimeInputProps) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      const hours = parseInt(value.slice(0, 2));
      const minutes = parseInt(value.slice(2));

      if (hours > 23) {
        value = "23" + value.slice(2);
      }

      if (minutes > 59) {
        value = value.slice(0, 2) + "59";
      }

      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    setTime(value);
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <Input
        id="time"
        type="text"
        inputMode="numeric"
        value={time}
        onChange={handleTimeChange}
        placeholder="HH:MM"
      />
    </div>
  );
}
