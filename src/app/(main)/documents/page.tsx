"use client";

import Navigation from "./_components/Navigation";
import Welcoming from "./_components/Welcoming";

export default function Document() {
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="p-4 w-full h-full"
      >
        <Welcoming />
      </div>
    </div>
  );
}
