import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarService } from '../services/navbar.service';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isMobile: Boolean;
  constructor(
    public nav: NavbarService,
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
