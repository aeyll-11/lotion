import { DocumentType, type Document } from '@/interface/document.interface';
import { v4 as uuid } from 'uuid';
import { user } from './user';

export const documents: Document[] = [
  {
    id: uuid(),
    type: DocumentType.Page,
    userId: user.id,
    properties: {
      title: 'Lotion',
      icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f5d2-fe0f.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    type: DocumentType.Page,
    userId: user.id,
    properties: {
      title: 'Bagel.rs',
      icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f980.png"
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
