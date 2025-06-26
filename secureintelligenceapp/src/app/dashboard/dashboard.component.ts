import {Component, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements AfterViewInit, OnInit {
  // https://www.youtube.com/watch?v=VRQdvBCwmWg
  // https://www.google.com/search?q=uncaught+typeerror+overlaybtn+is+null+angular&sca_esv=c9370329d8b01a80&ei=-dWmZ4u6B_eH0PEPp4qB-A0&ved=0ahUKEwjLmuKzl7OLAxX3AzQIHSdFAN8Q4dUDCBA&uact=5&oq=uncaught+typeerror+overlaybtn+is+null+angular&gs_lp=Egxnd3Mtd2l6LXNlcnAiLXVuY2F1Z2h0IHR5cGVlcnJvciBvdmVybGF5YnRuIGlzIG51bGwgYW5ndWxhcjIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0iaHFAAWABwAXgAkAEAmAE6oAE6qgEBMbgBA8gBAJgCAaACCpgDAIgGAZAGCJIHATGgB7cK&sclient=gws-wiz-serp
  @ViewChild('myElement') myElement: ElementRef

  ngAfterViewInit() {
    if (this.myElement) {
      this.myElement.nativeElement.addEventListener('click', this.handleClick.bind(this));
    } else {
      console.error('Element not found!');
    }


   //  window.addEventListener("DOMContentLoaded", () => {
   // const element = document.getElementById("overlayBtn");
   //     if (element) {
   //       element?.addEventListener('click', this.handleClick);
   //     } else {
   //       console.error('Element not found!');
   //     }
   //  });
  }


  handleClick() {
    console.log("Element click")
  }

  ngOnInit() {
  }
}
