import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, children }: Props) => {
  return (
    <div
      className="fixed inset-0 z-[9999] transition duration-300 ease-in-out"
      style={{ opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden' }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

interface DialogChildProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className }: DialogChildProps) => (
  <div className={className}>{children}</div>
);

const DialogDescription = ({ children, className }: DialogChildProps) => (
  <div className={className}>{children}</div>
);

const DialogActions = ({ children, className }: DialogChildProps) => (
  <div className={className}>{children}</div>
);

Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Actions = DialogActions;

export default Dialog;
