import Dialog from '@/components/Dialog';
import { RootState, useAppDispatch } from '@/lib/store/store';
import { editNickName } from '@/lib/store/user.store';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EditNickname() {
  const user = useSelector((state: RootState) => state.user);
  const [nickname, setNickName] = useState<string>(user.nickname);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const toggleModal = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (dialogRef.current) {
      if (nickname.length === 0) {
        setNickName(user.nickname)
      }
      if (event.code === 'Enter' || event.code === "Escape") {
        setIsOpen(false);
        dispatch(editNickName(nickname))
      }
    }
  };

  useEffect(() => {
    if (!isOpen && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom, left: rect.left });
    }

    if (nickname.length === 0) {
      setNickName(user.nickname);
    }
  }, [isOpen, nickname]);

  useEffect(() => {
    const handleResize = () => {
      if (dialogRef.current && isOpen) {
        const rect = dialogRef.current.getBoundingClientRect();
        setModalPosition({ top: rect.bottom, left: rect.left });
      }
    };

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div
      ref={dialogRef}
      role="button"
      onClick={toggleModal}
      onKeyDown={handleKeyDown}
      className="hover:bg-default-300 rounded px-2 cursor-pointer relative select-none"
    >
      {nickname}
      <Dialog open={isOpen} onClose={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
        <div
          style={{ top: modalPosition.top + 10, left: modalPosition.left }}
          className="absolute flex flex-col gap-1 border rounded p-2 border-default-300 shadow-md font-normal text-sm min-w-64 bg-white"
        >
          <Dialog.Title className="text-text-grey">Edit nickname</Dialog.Title>
          <Dialog.Actions>
            <input
              ref={inputRef}
              className="p-1 w-full bg-default-200 border rounded border-default-300"
              placeholder={user.nickname}
              onChange={(e) => setNickName(e.target.value)}
            />
          </Dialog.Actions>
        </div>
      </Dialog>
    </div>
  );
}
