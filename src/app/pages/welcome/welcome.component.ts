import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzButtonModule, 
    NzIconModule, 
    NzDividerModule, 
    NzDropDownModule,
    NzFlexModule,
    NzStepsModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
