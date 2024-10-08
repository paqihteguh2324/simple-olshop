import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerPageComponent } from '../customer/customer-page/customer-page.component';
import { ItemPageComponent } from '../item/item-page/item-page.component';
import { OrderPageComponent } from '../order/order-page/order-page.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [MatTabsModule, CustomerPageComponent, ItemPageComponent, OrderPageComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
  links = ['Customer', 'Item', 'Order'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;


}
