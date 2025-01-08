import { Injectable } from '@angular/core';
import { Match } from '../classes/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  matchs: Match[] = [];

  creerMatch(nouveauMatch: Match): Match {
    nouveauMatch.id = 1234;
    this.matchs.push(nouveauMatch);
    return nouveauMatch;
  }

  findMatch(id: number): Match {
    console.log('Match cherché : ' + id);
    let matchReturn = this.matchs.find((match) => match.id == id);
    if (matchReturn) return matchReturn;
    return { id: 1 } as Match;
  }
}
