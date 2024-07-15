'use client';

import Carousel from '@/components/Carousel';
import Dialog from '@/components/Dialog';
import { type Document } from '@/interface/document.interface';
import { RootState } from '@/lib/store/store';
import { Editor } from '@tinymce/tinymce-react';
import axios, { AxiosResponse } from 'axios';
import { Sparkle } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DocumentCard from './_components/DocumentCard';
import Navigation from './_components/Navigation';
import Welcoming from './_components/Welcoming';

interface CompletionApiResponse {
  completion: string;
}

export default function Documents() {
  const documents = useSelector((state: RootState) => state.documents);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = (): Promise<AxiosResponse<CompletionApiResponse>> => {
    return axios.post<CompletionApiResponse>(
      'Enter The Url',
      {
        username: 'Enter UserName',
        dataset: 'telecom',
        context: content,
      },
      {
        headers: {
          Authorization:
            'Bearer InsertTokenHere',
        },
      },
    );
  };

  const handleChange = (text: string): void => {
    setContent(text);
  };

  return (
    <div className="flex w-full">
      <Navigation />
      <div className="h-full relative w-full p-6">
        <Welcoming />
        <Carousel items={documents}>
          {(item: Document) => <DocumentCard document={item} />}
        </Carousel>
        {isLoading && (
          <Dialog open={isLoading} onClose={() => {}}>
            <div className="bg-default-100 top-1/2 left-1/2  z-[999999] items-center absolute min-w-64 flex-col gap-1 rounded border border-default-300 p-2 text-sm font-normal shadow-md">
              <Dialog.Title className='flex items-center font-semibold text-[#a782c3]'>
                <Sparkle className='h-4 w-4 mx-2' />
                Ai is writing
                <div className='flex gap-1 mx-5 mt-1'>
                  <div className='h-1 w-1 animate-bounce rounded-full delay-0 bg-[#a782c3] opacity-50'></div>
                  <div className='h-1 w-1 animate-bounce delay-500 rounded-full bg-[#a782c3] opacity-75'></div>
                  <div className='h-1 w-1 animate-bounce delay-1000 rounded-full bg-[#a782c3]'></div>
                </div>
              </Dialog.Title>
            </div>
          </Dialog>
        )}
        <Editor
          apiKey="wwk5s3et1gojgcoxaykysgpujnneiu8n8dfbs4c1ygdhb7hq"
          initialValue="<p>This is the initial content of the editor.</p>"
          onEditorChange={handleChange}
          value={content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            setup: (editor) => {
              editor.on('keydown', async (e) => {
                if (e.code === 'Enter' && e.shiftKey) {
                  editor.mode.set('readonly')
                  e.preventDefault();
                  setIsLoading(true);
                  await fetchData().then((response) => {
                    editor.setContent(editor.getContent() + response.data.completion)
                  }).finally(() => {
                    setIsLoading(false);
                    editor.mode.set('design')
                  })
                }
              });
            },
          }}
        />
      </div>
    </div>
  );
}
