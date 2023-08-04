import { ActivatedRoute } from '@angular/router';
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
  @Input() notes: any;
  @Input() noteForm!: FormGroup;

  @Output() saveNote = new EventEmitter<void>();

  message = 'Выберите заметку для просмотра...';

  editedNote!: Note;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const noteId = Number(this.route.snapshot.paramMap.get('id'));
    const note = this.notes.find((item: Note) => item.id == noteId);

    if (note) {
      this.selectedNote = note;
    }

    this.editedNote = { ...this.selectedNote };
    this.noteForm.patchValue(this.editedNote)
  }

  saveEditedNote() {
    const note = {
      ...this.selectedNote,
      title: this.noteForm.value.title,
      text: this.noteForm.value.text
    }

    this.saveNote.emit(note);
  }
}
