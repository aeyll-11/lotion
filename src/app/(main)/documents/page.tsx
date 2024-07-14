'use client';

import Navigation from './_components/Navigation';
import Welcoming from './_components/Welcoming';

export default function Documents() {
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="h-full w-full p-4">
        <Welcoming />
      </div>
    </div>
  );
}
