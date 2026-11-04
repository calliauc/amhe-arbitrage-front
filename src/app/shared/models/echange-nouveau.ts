export class EchangeNouveau {
  match!: number;
  type!: number;

  inscritA!: number;
  inscritB!: number;
  scoreA!: number;
  scoreB!: number;

  vulnerantA!: number;
  cibleA!: number;
  penaliteA!: number;

  vulnerantB!: number;
  cibleB!: number;
  penaliteB!: number;
}

export interface EchangeNouveauInterface {
  match: number;
  type: number;

  inscritA: number;
  inscritB: number;
  scoreA: number;
  scoreB: number;

  vulnerantA: number;
  cibleA: number;
  penaliteA: number;

  vulnerantB: number;
  cibleB: number;
  penaliteB: number;
}

export const echangeNouveauVide : EchangeNouveauInterface = {
  match:0,
  type:0,

  inscritA:0,
  inscritB:0,
  scoreA:0,
  scoreB:0,

  vulnerantA:0,
  cibleA:0,
  penaliteA:0,

  vulnerantB:0,
  cibleB:0,
  penaliteB:0
}