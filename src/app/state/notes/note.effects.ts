import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addNote,
  removeNote,
	updateNote,
  loadNotes,
  loadNotesSuccess,
  loadNotesFailure,
} from './note.actions';
import { NoteService } from './../../services/note/note.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllNotes } from './note.selectors';
import { AppState } from '../app.state';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private noteService: NoteService
  ) {}

  // Run this code when a loadNotes action is dispatched
  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotes),
      switchMap(() =>
        // Call the getNotes method, convert it to an observable
        from(this.noteService.getNotes()).pipe(
          // Take the returned value and return a new success action containing the notes
          map((notes) => loadNotesSuccess({ notes: notes })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadNotesFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addNote or removeNote or updateNote action is dispatched
  saveNotes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNote, removeNote, updateNote),
        withLatestFrom(this.store.select(selectAllNotes)),
        switchMap(([action, notes]) => from(this.noteService.saveNotes(notes)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
