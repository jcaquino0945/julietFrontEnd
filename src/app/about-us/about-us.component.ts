import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.ribbon.show();
    this.footer.show();
  }
}
