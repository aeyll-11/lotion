export enum DocumentType {
  Page = 'page',
}

interface Properties {
  title: string;
  icon?: string;
  cover?: string;
  description?: string;
}

export interface Document {
  id: string;
  type: DocumentType;
  parentDocument?: string;
  userId: string;
  properties: Properties;
  createdAt: Date;
  updatedAt: Date;
}
