import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
})
export class FaqsComponent implements OnInit {
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
