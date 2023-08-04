import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Note } from './../../interfaces';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private storageInitialised = false;
  private presetNotes: Note[] = [
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

  constructor(private storage: Storage) {}

  async getNotes(): Promise<Note[]> {
    if (!this.storageInitialised) await this.storage.create();

    return (await this.storage.get('notes')) || this.presetNotes;
  }

  async saveNotes(notes: Note[]) {
    if (!this.storageInitialised) await this.storage.create();

    return this.storage.set('notes', notes);
  }
}
