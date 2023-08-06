import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewingAreaComponent } from './components/viewing-area/viewing-area.component';
import { NoteEffects } from './state/notes/note.effects';
import { noteReducer } from './state/notes/note.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ViewingAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({ notes: noteReducer }),
    EffectsModule.forRoot([NoteEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
