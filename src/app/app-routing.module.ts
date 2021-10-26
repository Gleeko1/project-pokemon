import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/home/container.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/pokemon.module').then(m => m.PokemonModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./components/details/details.module').then(m => m.DetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
