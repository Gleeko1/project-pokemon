import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { GetApiService } from 'src/app/services/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  template: `
  <div class="d-flex align-items-center vh-100">
    <div class="d-flex flex-column">
     <p>Pokemon rifiutati: {{rejected.length}}</p>
    <app-rejected class="reject overflow-auto"></app-rejected> 
    </div>
    <div class="container d-flex flex-row align-items-center justify-content-center p-3">
      <div class="block bg-primary text-light rounded-3 p-3 m-3 ">
        <div class="d-flex justify-content-around">
        <div class="bg-warning rounded-3 text-black p-3 m-2">
          <h2>Details</h2>
          <p>Id: {{ pokemon.id }} </p>
          <p>Name: {{ pokemon.name }} </p>
          <p>Weight: {{ pokemon.weight }} </p>
          <p>Height: {{ pokemon.height}} </p>
        </div>
        <div class="p-3 m-3 rounded-3">
          <h1> {{ pokemon.name }} </h1>
          <a>
            <img src="{{pokemon.sprites.front_default}}" alt="" width="150">
          </a>  
        </div>
      </div>
      <div class="d-flex justify-content-evenly m-2">
        <button class="btn btn-success" (click)="catchPokemon()" [disabled]="isDisabled" >Cattura</button>
        <button  class="btn btn-danger" (click)="rejectPokemon()">Rifiuta</button>
      </div>
      <p class="p-3">E' apparso un {{pokemon.name}} selvatico!</p>
    </div>
  </div>
  <app-team class="team overflow-auto"></app-team>
  </div>
  `,
  styles: [`
    .team, .reject { width: 300px; max-height: 700px }
    .block{ min-width: 600px}
    
  `]
})
export class ContainerComponent implements OnInit {
  pokemon!: Pokemon;
  isDisabled: boolean = false;

  team: Pokemon[] = [];
  rejected: Pokemon[] = [];

  constructor(private getApiService: GetApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.get();
    this.getApiService.team$.subscribe(data => this.team = data);
    this.getApiService.reject$.subscribe(data => this.rejected = data);
  }

  get() {
    this.getApiService.getPokemon().subscribe(res => {
      this.pokemon = res;
      /* console.log('Container:', res) */
    });
  }
  catchPokemon() {

    if (this.team.length <= 5) {
      this.team.push(this.pokemon);
      this.getApiService.addTeam(this.team);
      this.get();
      if (this.team.length == 6) {
        this.isDisabled = true;
      }
    } else {
      this.isDisabled = true;
    }

  }
  rejectPokemon() {
    this.rejected.push(this.pokemon);
    this.getApiService.addRejectedPokemon(this.rejected);
    this.get()
  }

}
