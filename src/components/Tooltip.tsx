import { useState } from "react";

interface Props {
  text:string;
  children: React.ReactNode
  shouldNotDisplay?: boolean
}

export default function Tooltip({ text, children, shouldNotDisplay }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    console.log("here");
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {(showTooltip && shouldNotDisplay) && (
        <div className="absolute z-10 px-2 py-1 mt-2 bg-default-800 text-default-100 text-sm font-normal whitespace-nowrap rounded-md shadow-md">
          {text}
        </div>
      )}
    </div>
  );
}