import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

