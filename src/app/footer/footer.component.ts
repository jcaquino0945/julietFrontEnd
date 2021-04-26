import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public isMobile: Boolean;

  constructor(
    public footer: FooterService,
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
export class AppComponent  {
  constructor(
    router: Router
  ) {
    router.events
          .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
          .subscribe(() => window.scrollTo(0, 0));
  }
}
