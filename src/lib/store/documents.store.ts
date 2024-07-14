import { type Document } from '@/interface/document.interface';
import { documents } from '@/utils/documents';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Document[] = documents;

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
});

export const {} = documentsSlice.actions;

export default documentsSlice.reducer;
