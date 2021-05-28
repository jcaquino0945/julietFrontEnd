import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { RibbonService } from '../services/ribbon.service';
import { CmsService } from '../services/cms.service';
import { CMS } from './../models/cms';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css'],
})
export class RibbonComponent implements OnInit {
  myRibbon$: CMS[];
  errMess: string;

  public isMobile: Boolean;
  constructor(
    public ribbon: RibbonService,
    private responsive: ResponsiveService,
    private ribbonService: CmsService,
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.responsive.checkWidth();
    this.ribbonService.getRibbons().subscribe(
      (myRibbon$) => (this.myRibbon$ = myRibbon$),
      (errmess) => (this.errMess = <any>errmess)
    );
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
