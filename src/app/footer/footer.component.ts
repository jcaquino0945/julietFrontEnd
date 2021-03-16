import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';
import { ResponsiveService } from '../services/responsive.service';

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
