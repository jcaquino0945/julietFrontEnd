import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'julietFront';

  constructor(private responsive: ResponsiveService, private facebookService: FacebookService) {}

  ngOnInit() {
    this.initFacebookService();
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        console.log('Mobile device detected');
      } else {
        console.log('Desktop detected');
      }
    });
    this.onResize();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }

  onResize() {
    this.responsive.checkWidth();
  }
}
