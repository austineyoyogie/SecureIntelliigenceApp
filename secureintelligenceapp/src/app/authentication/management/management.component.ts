import {Component, ViewEncapsulation} from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ManagementComponent {

}
