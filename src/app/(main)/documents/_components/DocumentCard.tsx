import { type Document } from '@/interface/document.interface';
import { RootState } from '@/lib/store/store';
import { useSelector } from 'react-redux';

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="relative flex h-36 w-36 cursor-pointer flex-col overflow-hidden rounded-xl border border-default-200 bg-default-100 hover:border-default-300">
      <div className="h-1/3 bg-text-default"></div>
      <img className="absolute left-2 top-7 flex h-7 w-7" src={document.properties.icon} />
      <div className="flex h-2/3 flex-col justify-between p-3">
        <div className="mt-2 text-ellipsis font-medium">{document.properties.title}</div>
        <div className="flex items-center gap-2">
          <div className="flex h-3 w-3 items-center justify-center rounded-full border border-default-400 bg-text-green p-2 text-[8px] text-default-100">
            <span>{user.nickname.charAt(0)}</span>
          </div>
          <DisplayDate date={document.createdAt} />
        </div>
      </div>
    </div>
  );
}

interface DisplayDateProps {
  date: Date;
}

function DisplayDate({ date }: DisplayDateProps) {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return <p className="text-xs text-text-grey">{formattedDate}</p>;
}
