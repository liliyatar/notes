import { createAction, props } from '@ngrx/store';
import { Note } from './../../interfaces';

export const addNote = createAction(
  '[Note Page] Add note',
  props<{ note: Note }>()
);

export const removeNote = createAction(
  '[Note Page] Remove note',
  props<{ id: number }>()
);

export const updateNote = createAction(
  '[Note Page] Update note',
  props<{ note: Note }>()
);

export const loadNotes = createAction('[Note Page] Load Notes');

export const loadNotesSuccess = createAction(
  '[Note API] Note Load Success',
  props<{ notes: Note[] }>()
);

export const loadNotesFailure = createAction(
  '[Note API] Note Load Failure',
  props<{ error: string }>()
);
