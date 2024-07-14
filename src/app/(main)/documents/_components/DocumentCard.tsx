import { type Document } from '@/interface/document.interface';

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  return (
    <div>
      {document.userId}
      {document.properties.title}
    </div>
  );
}
