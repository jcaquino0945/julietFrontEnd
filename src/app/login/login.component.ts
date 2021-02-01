import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {username: '', password: ''};

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.validate(this.user.username, this.user.password)
    .then((response) => {
      this.authService.setUserInfo({'user' : response['user']});
      this.router.navigate(['admin']);
      
    })
  }
}
