import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import * as AOS from 'aos';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Juliet MNL PH';

  constructor(private responsive: ResponsiveService, private facebookService: FacebookService,private titleService: Title) {}

  ngOnInit() {
    this.setTitle('Juliet MNL PH')
    AOS.init();
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

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onResize() {
    this.responsive.checkWidth();
  }
}
