import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { NoteState } from './note.reducer';

export const selectNotes = (state: AppState) => state.notes;
export const selectAllNotes = createSelector(
  selectNotes,
  (state: NoteState) => state.notes
);
