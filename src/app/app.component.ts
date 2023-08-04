import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from './interfaces';
import { Store } from '@ngrx/store';
import { selectAllNotes } from './state/notes/note.selectors';
import { addNote, loadNotes, removeNote, updateNote } from './state/notes/note.actions';
import { AppState } from './state/app.state';
import { Location } from '@angular/common'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public allNotes$ = this.store.select(selectAllNotes);

    title = 'заметки';

    noteForm: FormGroup;
    
    selectedNote: any;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private location: Location,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
    ) {
        this.noteForm = this.fb.group({
            id: [''],
            title: [''],
            text: [''],
            updated: ['']
        });
    }

    ngOnInit() {
        this.store.dispatch(loadNotes());
    }

    onSelectNote(note: Note) {
        this.selectedNote = note;
        this.noteForm.patchValue(note);
    }

    onAddNewNote() {
        const note: Note = {
            id: Math.floor(Math.random() * 1000000),
            title: 'Введите заголовок',
            text: 'Введите текст заметки',
            updated: new Date().toISOString(),
        };

        this.store.dispatch(addNote({ note }));
        this.selectedNote = null;
    }


    onDeleteNote(noteToDelete: any) {
        this.store.dispatch(removeNote({ id: noteToDelete.id }));
        this.selectedNote = null;
        this.location.replaceState('/');
    }

    onUpdateNote(note: any) {
        this.store.dispatch(updateNote({ note }));
    }
}

