import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NavService } from '../../navigation.service';
import { INav } from '../../navigation.models';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingsComponent implements OnChanges {
  //

  @Input()
  menuItems: INav[] | undefined;

  _menuItems: INav[] = [];

  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor(private navService: NavService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this._menuItems = simpleChanges.menuItems.currentValue;
    // console.log('this._menuItems', this._menuItems);
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
