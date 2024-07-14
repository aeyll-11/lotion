'use client';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Dialog from './Dialog';

interface Props {
  setNewIcon: (newIcon: string) => void;
}

export default function IconPicker({setNewIcon}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<SVGSVGElement>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handleEmojiClick = (e: EmojiClickData) => {
    setNewIcon(e.imageUrl);
  };

  useEffect(() => {
    if (!isOpen && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom, left: rect.left });
    }
  }, [isOpen]);

  return (
    <>
      <Plus ref={dialogRef}  onClick={() => setIsOpen(true)} className='h-4 w-4 cursor-pointer' />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="absolute" style={{ top: modalPosition.top, left: modalPosition.left }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      </Dialog>
    </>
  );
}
