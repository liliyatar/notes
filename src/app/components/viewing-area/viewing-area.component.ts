import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Note } from './../../interfaces';

@Component({
  selector: 'app-viewing-area',
  templateUrl: './viewing-area.component.html',
  styleUrls: ['./viewing-area.component.css']
})
export class ViewingAreaComponent implements OnInit {
  @Input() selectedNote: any;
  @Input() notes: any[] = [];
  @Input() noteForm!: FormGroup;

  @Output() saveNote = new EventEmitter<void>();

  message = 'Выберите заметку для просмотра...';

  editedNote!: Note;

  constructor() {}

  ngOnInit() {
    this.editedNote = { ...this.selectedNote };
    this.noteForm.patchValue(this.editedNote)
  }

  saveEditedNote() {
    this.selectedNote.title = this.noteForm.value.title;
    this.selectedNote.text = this.noteForm.value.text;
    this.selectedNote.updated = new Date().toISOString();

    this.saveNote.emit(this.selectedNote);
  }
}
