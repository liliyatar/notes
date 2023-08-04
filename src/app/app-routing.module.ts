import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full'},
  { path: 'notes', component: AppComponent },
  { path: 'notes/:id', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
