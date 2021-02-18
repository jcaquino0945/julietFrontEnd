import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nav.hide();
    this.ribbon.hide();
    this.footer.hide();
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['home']);
  }
}
