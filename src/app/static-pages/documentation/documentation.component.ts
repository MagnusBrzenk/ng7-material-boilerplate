import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route-change.animations';
import * as docs from 'raw-loader!./documentation.md';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  docPageContent = docs;

  githubReadmeUrl =
    'https://raw.githubusercontent.com/MagnusBrzenk/ng7-material-boilerplate/master/README.md';

  constructor() {}

  ngOnInit() {}

  onLoad(content: string) {
    // console.log('onLoad: ', content);
  }

  onError(errorObj: any) {
    console.log('onError: ', JSON.stringify(errorObj));
  }
}
