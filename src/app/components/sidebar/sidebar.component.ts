import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from './../../interfaces';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() notes: any;

  @Output() noteSelected = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<Note>();
  @Output() addNewNote = new EventEmitter<void>();
  
  MAX_TEXT_LENGTH = 30;

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {}

  selectNote(note: Note) {
    this.noteSelected.emit(note);
  }

  addNote() {
    this.addNewNote.emit();
    this.location.replaceState('/');
  }

  deleteSelectedNote(note: Note) {
    this.deleteNote.emit(note);
  }

  checkText(text: string) {
    const copyText = text;

    return copyText.substring(0, this.MAX_TEXT_LENGTH)
    + `${copyText.length > this.MAX_TEXT_LENGTH ? '...' : ''}`;
  }
}
