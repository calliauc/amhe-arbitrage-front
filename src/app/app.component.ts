import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { EvenementOverviewComponent } from './evenement-overview/evenement-overview.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, EvenementOverviewComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.css'
})
export class AppComponent {
}
