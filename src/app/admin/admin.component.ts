import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isMobile: boolean;
  constructor(
    private authService: AuthService,
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private router: Router,
    private responsive: ResponsiveService,
  ) {}

  ngOnInit(): void {
    this.nav.hide();
    this.ribbon.hide();
    this.footer.hide();
    this.onResize();
    this.responsive.checkWidth();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }


  logout() {
    this.authService.clear();
    this.router.navigate(['home']);
    window.location.reload();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
      this.nav.hide();
    });
  }

}