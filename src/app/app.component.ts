import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng7-material-boilerplate';

  //

  xxx(x: any) {
    console.log(x + '');
  }
}
