import { createReducer, on } from '@ngrx/store';
import { Note } from './../../interfaces';
import {
  addNote,
  removeNote,
	updateNote,
  loadNotes,
  loadNotesSuccess,
  loadNotesFailure,
} from './note.actions';

export interface NoteState {
  notes: Note[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: NoteState = {
  notes: [],
  error: '',
  status: 'pending',
};

export const noteReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new note to the notes array
  on(addNote, (state, { note }) => ({
    ...state,
    notes: [
			...state.notes,
			{ 
				id: Math.floor(Math.random() * 1000000),
				title: note.title,
				text: note.text,
				updated: new Date().toISOString(),
			}
		],
  })),
  // Remove the note from the notes array
  on(removeNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== id),
  })),
	// Update the note in the notes array
  on(updateNote, (state, { note }) => ({
    ...state,
    notes: state.notes.map(
			item => item.id == note.id 
				? {
						...note,
						title: note.title,
						text: note.text,
						updated: new Date().toISOString(),
					} 
				: item
		).sort((a, b) => new Date(a.updated) > new Date(b.updated) ? -1 : 1),
  })),
  // Trigger loading the notes
  on(loadNotes, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded notes
  on(loadNotesSuccess, (state, { notes }) => ({
    ...state,
    notes: notes,
    error: '',
    status: 'success',
  })),
  // Handle notes load failure
  on(loadNotesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);