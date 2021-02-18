import { Component, OnInit } from '@angular/core';
import { RibbonService } from '../services/ribbon.service';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css'],
})
export class RibbonComponent implements OnInit {
  constructor( public ribbon: RibbonService ) {}

  ngOnInit(): void {}
}
