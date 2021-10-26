import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-team',
  template: `
  <div class=" d-flex flex-column align-items-end">
    <div *ngFor="let pokemon of team | async" class="pokemon border border-success border-4 rounded-3 p-2 m-1">
    <a (click)="goToDetails(pokemon.id)">
          <img src="{{ pokemon.sprites.front_default }}" alt="" width="40" height="40">
        </a>
      <p>{{ pokemon.name}}</p>
    </div>
  </div>
    
  `,
  styles: [`
  .pokemon{ width: 100px}`
  ]
})
export class TeamComponent implements OnInit {
  team!: Observable<Pokemon[]>;
  constructor(private getApiService: GetApiService, private router: Router) {
    this.team = this.getApiService.team$;
  }

  ngOnInit(): void {
  }

  goToDetails(id: number) {
    this.router.navigate(['/details',
      id])
  }
}
