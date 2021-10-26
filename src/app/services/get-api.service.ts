import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private teamSubject = new BehaviorSubject<Pokemon[]>([]);
  public team$ = this.teamSubject.asObservable();

  private rejectedSubject = new BehaviorSubject<Pokemon[]>([]);
  public reject$ = this.rejectedSubject.asObservable();

  list: Pokemon[] = [];
  private listSubject = new BehaviorSubject<Pokemon[]>([]);
  public list$ = this.listSubject.asObservable();

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon> {
    let random = Math.floor(Math.random() * 898) + 1;
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${random}`)/* .pipe(
      tap(data => { console.log('Service:', data) }) 
    )*/
  }
  addTeam(team: Pokemon[]) {
    this.teamSubject.next(team);
    console.log(this.teamSubject)
    this.listPokemon(team);

  }
  addRejectedPokemon(rejected: Pokemon[]) {
    this.rejectedSubject.next(rejected);
    console.log(this.rejectedSubject);
    this.listPokemon(rejected)
  }

  listPokemon(data: Pokemon[]) {
    this.list.push(...data);
    this.listSubject.next(this.list);
  }

}
