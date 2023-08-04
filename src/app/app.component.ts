import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from './interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'заметки';

    notes: Note[] = [
        {
            id: Math.floor(Math.random() * 1000000),
            title: 'Заметка 1',
            text: 'Текст заметки 1',
            updated: new Date().toISOString(),
        },
        {
            id: Math.floor(Math.random() * 1000000),
            title: 'Заметка 2',
            text: 'Текст заметки 2',
            updated: new Date().toISOString(),
        },
    ];

    noteForm: FormGroup;
    
    selectedNote!: Note | null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.noteForm = this.fb.group({
            id: [''],
            title: [''],
            text: [''],
            updated: ['']
        });
    }

    ngOnInit() {
        const storedNotes = localStorage.getItem('notes');
        this.notes = storedNotes ? JSON.parse(storedNotes) : this.notes;
        const noteId = Number(this.route.snapshot.paramMap.get('id'));
        const note = this.notes.find(note => note.id == noteId);
        this.sortNotes();
        if (this.notes.length) {
            this.sortNotes();
        }
        if (note) {
            this.onSelectNote(note);
        }
    }

    onSelectNote(note: Note) {
        this.selectedNote = note;
        this.noteForm.patchValue(note);
    }

    onAddNewNote() {
        const newNote = {
            id: Math.floor(Math.random() * 1000000),
            title: 'Введите заголовок',
            text: 'Введите текст заметки',
            updated: new Date().toISOString(),
        };
        this.notes.push(newNote);
        this.selectedNote = newNote;
        this.sortNotes();
    }

    sortNotes() {
        this.notes = [...this.notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })];
        this.saveNotesToLocalStorage();
    }

    onDeleteNote(noteToDelete: any) {
        const newNotes = this.notes.filter(note => note.id != noteToDelete.id);
        this.notes = [...newNotes];
        this.saveNotesToLocalStorage();
        this.selectedNote = null;
    }

    onUpdateNote(editedNote: any) {
        const existing = this.notes.find(note => note.id == editedNote.id);
        if (existing) {
            existing.title = editedNote.title;
            existing.text = editedNote.text;
            existing.updated = new Date().toISOString();
        }
        this.sortNotes();
    }

    private saveNotesToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}
