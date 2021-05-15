import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-jewelry-care',
  templateUrl: './jewelry-care.component.html',
  styleUrls: ['./jewelry-care.component.css'],
})
export class JewelryCareComponent implements OnInit {
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

    this.onResize();
    this.responsive.checkWidth();

    window.scrollTo(0,0);
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
