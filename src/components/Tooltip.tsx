import { useState } from 'react';

interface Props {
  text: string;
  children: React.ReactNode;
  shouldNotDisplay?: boolean;
}

export default function Tooltip({ text, children, shouldNotDisplay }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
        {children}
      </div>
      {showTooltip && shouldNotDisplay && (
        <div className="absolute z-10 mt-2 whitespace-nowrap rounded-md bg-default-800 px-2 py-1 text-sm font-normal text-default-100 shadow-md">
          {text}
        </div>
      )}
    </div>
  );
}
