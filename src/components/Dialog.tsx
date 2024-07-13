interface Props {
  open: boolean,
  onClose: () => void,
  children: React.ReactNode
}

const Dialog = ({ open, onClose, children }: Props) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed flex justify-center items-center inset-0" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface DialogChildProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className }: DialogChildProps) => <div className={className}>{children}</div>;

const DialogDescription = ({ children, className }: DialogChildProps) => <div className={className}>{children}</div>;

const DialogActions = ({ children, className }: DialogChildProps) => <div className={className}>{children}</div>;


Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Actions = DialogActions;

export default Dialog;
