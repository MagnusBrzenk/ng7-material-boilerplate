import { Injectable } from '@angular/core';
import { INav } from './navigation.models';

/**
 * Service defining nested navigation menus that are injected into the sidenav and toolbar
 * where they are displayed in a dropdown-nested manner
 */
@Injectable({
  providedIn: 'root'
})
export class NavService {
  readonly navLinks: INav[] = [
    // {
    //   label: 'HomeV0',
    //   link: 'home',
    //   icon: 'home'
    // },
    // {
    //   label: 'HomeV1',
    //   link: 'home1',
    //   icon: 'home'
    // },
    // {
    //   label: 'TT',
    //   link: 'testtable',
    //   icon: 'home'
    // },
    {
      label: 'About',
      icon: 'info',
      isExpanded: false,
      children: [
        {
          label: 'Background',
          link: 'background',
          isFA: true,
          icon: 'landmark'
        },
        {
          label: 'Documentation',
          link: 'documentation',
          isFA: true,
          icon: 'book'
        },
        {
          //
          label: 'Contact',
          link: 'contact',
          icon: 'mail',
          isExpanded: false
        }
      ]
    },
    {
      label: 'Data',
      link: 'data',
      icon: 'insert_chart',
      isExpanded: false
    }
  ];

  constructor() {}

  getNavLinks() {
    return [...this.navLinks];
  }
}
