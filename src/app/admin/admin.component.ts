import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    
  }
  logout() {
    this.authService.clear();
    this.router.navigate(['home']);
  }

  
}
