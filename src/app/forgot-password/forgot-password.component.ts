import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  saveSuccess: boolean;
  saveFailure: boolean;
  user = { email: '' };
  constructor(
    private authService: AuthService,
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    public adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.ribbon.hide();
    this.footer.hide();
  }

  resetPassword() {
    this.adminService
    .sendPasswordResetRequest(this.user.email)
    .then((saveSuccess) => {
      this.saveSuccess = true;
      saveSuccess = this.saveSuccess;
    }).catch((err) => {
      this.saveFailure = true
    })
  }

}
