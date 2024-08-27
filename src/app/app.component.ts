// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// export class AppComponent {
//   title = 'budget-planner';
// }

export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Check if the current URL is the root URL
    if (this.router.url === '/') {
      this.router.navigate(['/budget-planner/dashboard']);
    }
  }
}

