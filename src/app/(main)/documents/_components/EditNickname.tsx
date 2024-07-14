import Dialog from '@/components/Dialog';
import { RootState, useAppDispatch } from '@/lib/store/store';
import { editNickName } from '@/lib/store/user.store';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EditNickname() {
  const user = useSelector((state: RootState) => state.user);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const dispatch = useAppDispatch();

  const toggleModal = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom, left: rect.left });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        setModalPosition({ top: rect.bottom, left: rect.left });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (dialogRef.current) {
      if (event.code === 'Enter') setIsOpen(false);
    }
  };

  return (
    <div
      ref={dialogRef}
      role="button"
      onClick={toggleModal}
      onKeyDown={handleKeyDown}
      className="hover:bg-default-300 rounded px-2 cursor-pointer relative select-none"
    >
      {user.nickname}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{ top: modalPosition.top + 10, left: modalPosition.left }}
          className="absolute flex flex-col gap-1 border rounded p-2 border-default-300 shadow-md font-normal text-sm min-w-64 bg-white"
        >
          <Dialog.Title className="text-text-grey">Edit nickname</Dialog.Title>
          <Dialog.Actions>
            <input
              className="p-1 w-full bg-default-200 border rounded border-default-300"
              placeholder={user.nickname}
              onChange={(e) => dispatch(editNickName(e.target.value))}
            />
          </Dialog.Actions>
        </div>
      </Dialog>
    </div>
  );
}
