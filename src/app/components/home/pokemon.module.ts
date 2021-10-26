import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { RejectedComponent } from './rejected.component';
import { ContainerComponent } from './container.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContainerComponent }
]

@NgModule({
  declarations: [
    ContainerComponent,
    TeamComponent,
    RejectedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonModule { }
