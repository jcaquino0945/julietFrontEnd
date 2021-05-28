import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };

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

  login() {
    this.authService
      .validate(this.user.username, this.user.password)
      .then((response) => {
        this.authService.setUserInfo(response['token']);
        this.router.navigate(['admin']);
      })
      .catch((err) => {
        window.alert('Wrong username/password');
      });
  }
}
