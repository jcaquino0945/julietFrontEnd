import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor( public nav: NavbarService ) {}

  ngOnInit(): void {}
}
