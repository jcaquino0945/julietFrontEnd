import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';
import { NavbarService } from '../services/navbar.service';
import { ResponsiveService } from '../services/responsive.service';
import { RibbonService } from '../services/ribbon.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  public isMobile: Boolean;

  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
    window.scrollTo(0,0);
    this.onResize();
    this.responsive.checkWidth();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
