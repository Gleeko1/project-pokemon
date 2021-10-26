import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { find, map, tap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-details',
  template: `
    <button class="btn btn-primary" [routerLink]="'/'">Torna indietro</button>
    <div class=" block bg-primary text-light rounded-3 p-3 m-3 ">
      <div>
        <h1>#{{pokemon.id}} {{ pokemon.name}}</h1>
      </div>
      <div class="d-flex flex-row justify-content-between">
    <div >
        <img src="{{pokemon.sprites.front_default}}" alt="" height="300">
        
      </div>
      <div>
        <h2>Statistiche</h2>
        <div>
            <div *ngFor="let s of pokemon.stats">
              <p>{{ s.stat.name }}: {{ s.base_stat }}</p>
            </div>
        </div>
          
      </div>
      <div>
        <h2>Mosse</h2>
        <div>
           <p>Tante e anche belle</p>
        </div>
          
      </div>
          
      </div>    
    </div>

  `,
  styles: [
  ]
})
export class DetailsComponent implements OnInit {


  pokemons!: Observable<Pokemon[]>;
  pokemon!: Pokemon;
  id!: number;

  constructor(private getApiService: GetApiService, private route: ActivatedRoute) {
    this.pokemons = this.getApiService.list$;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!
    })
  }
  ngOnInit(): void {
    console.log(this.id)
    this.pokemons.subscribe(data => {
      this.pokemon = data.find(pokemon => pokemon.id == this.id)!;
    });
    console.log(this.pokemon)
  }

}
