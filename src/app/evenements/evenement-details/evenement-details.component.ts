// import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EvenementsService } from '../../shared/services/evenements.service';
// import { NomsPipe } from '../../shared/pipes/noms.pipe';
// import { Tag, TagsFiltres } from '../../shared/models/tag';
// import { CommonModule, DatePipe } from '@angular/common';
// import { ClubPipe } from '../../shared/pipes/club.pipe';

// @Component({
//     selector: 'app-evenement-details',
//     imports: [NomsPipe, DatePipe, ClubPipe, CommonModule],
//     templateUrl: './evenement-details.component.html',
//     changeDetection: ChangeDetectionStrategy.Eager,
//     styleUrl: './evenement-details.component.css'
// })
// export class EvenementDetailsComponent {
//   private route = inject(ActivatedRoute);
//   private evenementService = inject(EvenementsService);
//   private router = inject(Router);

//   details!: EvenementDetails;
//   evenementId!: number;
//   tagPoule!: Tag;
//   tags: TagsFiltres = {
//     tagsRequis: [
//       {
//         id: 1,
//         code: 'B-CUP-25',
//       },
//       {
//         id: 2,
//         code: 'Epée',
//       },
//     ],
//     tagsOptions: [],
//     tagsExclus: [
//       {
//         id: 3,
//         code: 'Hache',
//       },
//       {
//         id: 16,
//         code: 'Finale-p',
//       },
//       {
//         id: 17,
//         code: 'Finale-g',
//       },
//     ],
//   };

//   constructor() {
//     this.route.params.subscribe((params) => {
//       this.evenementService
//         .getEvenementsDetails(params['id'], this.tags)
//         .subscribe((details) => {
//           if (details) {
//             this.details = details;
//             console.log(details);
//           } else {
//             alert('Evenement introuvable');
//             this.router.navigate(['evenements']);
//           }
//           this.trieStats();
//         });
//       this.evenementId = params['id'];
//     });
//   }

//   trieStats() {
//     this.details.coupsMarques.cibles?.sort((a, b) => b.valeur - a.valeur);
//     this.details.coupsMarques.vulnerants?.sort((a, b) => b.valeur - a.valeur);
//     this.details.coupsMarques.details?.sort((a, b) => b.valeur - a.valeur);
//     this.details.coupsSubis.cibles?.sort((a, b) => b.valeur - a.valeur);
//     this.details.coupsSubis.vulnerants?.sort((a, b) => b.valeur - a.valeur);
//     this.details.coupsSubis.details?.sort((a, b) => b.valeur - a.valeur);
//   }

//   filtreTags(tags: Tag[]): Tag {
//     return tags.filter((tag) => tag.code.startsWith('Poule'))[0];
//   }
// }
