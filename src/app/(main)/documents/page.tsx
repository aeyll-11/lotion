'use client';

import Carousel from '@/components/Carousel';
import { type Document } from '@/interface/document.interface';
import { RootState } from '@/lib/store/store';
import { useSelector } from 'react-redux';
import DocumentCard from './_components/DocumentCard';
import Navigation from './_components/Navigation';
import Welcoming from './_components/Welcoming';

export default function Documents() {
  const documents = useSelector((state: RootState) => state.documents);
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="h-full w-full p-6">
        <Welcoming />
        <Carousel items={documents}>
          {(item: Document) => <DocumentCard document={item} />}
        </Carousel>
      </div>
    </div>
  );
}
