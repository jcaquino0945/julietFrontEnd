import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarService } from '../services/navbar.service';
import { ResponsiveService } from '../services/responsive.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    window.scrollTo(0,0);
  }
  
  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
export class AppComponent  {
  constructor(
    router: Router
  ) {
    router.events
          .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
          .subscribe(() => window.scrollTo(0, 0));
  }
}
