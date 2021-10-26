import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-rejected',
  template: `
   <div class="d-flex flex-column align-items-start">
    <div *ngFor="let pokemon of rejected | async" class="pokemon border border-danger border-4 rounded-3 p-2 m-1">
        <a (click)="goToDetails(pokemon.id)">
          <img src="{{ pokemon.sprites.front_default }}" alt="" width="40" height="40">
        </a>
        <p>{{ pokemon.name}}</p>
      </div>
   </div>
  `,
  styles: [`
  .pokemon{ width: 100px}
  `]
})
export class RejectedComponent implements OnInit {
  rejected!: Observable<Pokemon[]>;
  constructor(private getApiService: GetApiService, private router: Router) {
    this.rejected = this.getApiService.reject$;
  }

  ngOnInit(): void {
  }
  goToDetails(id: number) {
    this.router.navigate(['/details',
      id])
  }

}
