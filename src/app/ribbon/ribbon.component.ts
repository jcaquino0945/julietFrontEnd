import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { RibbonService } from '../services/ribbon.service';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css'],
})
export class RibbonComponent implements OnInit {
  public isMobile: Boolean;
  constructor(
    public ribbon: RibbonService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.responsive.checkWidth();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
