import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { AdminService } from '../services/admin.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password-details',
  templateUrl: './forgot-password-details.component.html',
  styleUrls: ['./forgot-password-details.component.css']
})
export class ForgotPasswordDetailsComponent implements OnInit {
  user = { password: '' };
  admin: any;
  errMess: string;
  _id: any;
  constructor(
    private authService: AuthService,
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    public adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.adminService.getAdmin(params['_id'])
    })).subscribe(admin => {
      this.admin = admin;
      this.adminService.setUserInfo(admin['token']);
    }),
    err => console.log(err);
    errmess => this.errMess = <any>errmess;
    this.nav.hide();
    this.ribbon.hide();
    this.footer.hide();
  }
/*
  validateAdmin() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.adminService.getAdmin(params['_id'])
    })).subscribe(admin => {
      this.admin = admin;
    }),
    err => console.log(err);
    errmess => this.errMess = <any>errmess;
  }
*/

  updatePassword(password,_id) {
    _id = this.route.snapshot.paramMap.get('_id');
    console.log(_id);
    this.adminService.changePassword(this.user.password,_id)
    .then((response) => {
      window.alert('Password updated!')
    }).catch((err) => {
      window.alert('Encountered an error! Try refreshing this window')
    });

  }

}
