import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ///////////////////////////////////////////

  logo = require('../assets/icons/icon-72x72.png');

  title = 'ng-ivy-boilerplate';

  isAuthenticated$: Observable<boolean> | any;
  stickyHeader$: Observable<boolean> | any;
  language$: Observable<string> | any;
  theme$: Observable<string> | any;
  hoverMenu$: Observable<boolean> | any;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.theme$ = '';
    this.isAuthenticated$ = true;
    this.stickyHeader$ = true;
    this.hoverMenu$ = false;
  }
}
