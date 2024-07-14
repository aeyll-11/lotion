import Dialog from '@/components/Dialog';
import Tooltip from '@/components/Tooltip';
import { RootState, useAppDispatch } from '@/lib/store/store';
import { editNickName } from '@/lib/store/user.store';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EditNickname() {
  const user = useSelector((state: RootState) => state.user);
  const [nickname, setNickName] = useState<string>(user.nickname);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
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
        setNickName(user.nickname);
      }
      if (event.code === 'Enter') {
        setIsOpen(false);
        dispatch(editNickName(nickname));
      }
      if (event.code === 'Escape') {
        setIsOpen(false);
        setNickName(user.nickname);
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
  }, [isOpen, nickname, user]);

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
    <Tooltip text="Edit nickname" shouldNotDisplay={!isOpen}>
      <div
        ref={dialogRef}
        role="button"
        onClick={toggleModal}
        onKeyDown={handleKeyDown}
        className="relative cursor-pointer select-none rounded px-2 hover:bg-default-300"
      >
        {nickname}
        <Dialog open={isOpen} onClose={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
          <div
            style={{ top: modalPosition.top + 10, left: modalPosition.left }}
            className="bg-white absolute min-w-64 flex-col gap-1 rounded border border-default-300 p-2 text-sm font-normal shadow-md"
          >
            <Dialog.Title className="text-text-grey">Edit nickname</Dialog.Title>
            <Dialog.Actions>
              <input
                ref={inputRef}
                className="w-full rounded border border-default-300 bg-default-200 p-1"
                placeholder={user.nickname}
                onChange={(e) => setNickName(e.target.value)}
              />
            </Dialog.Actions>
          </div>
        </Dialog>
      </div>
    </Tooltip>
  );
}
