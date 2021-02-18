import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-jewelry-care',
  templateUrl: './jewelry-care.component.html',
  styleUrls: ['./jewelry-care.component.css'],
})
export class JewelryCareComponent implements OnInit {
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
