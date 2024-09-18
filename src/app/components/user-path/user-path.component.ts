import { Component } from '@angular/core';
import { AuthService } from '../personal-account/auth-service.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-path',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-path.component.html',
  styleUrl: './user-path.component.css'
})
export class UserPathComponent {

  userNick!: string;
  userCurrentNick!: string;
  isCurrentUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, // Сервис для получения текущего пользователя
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userNick = this.route.snapshot.params['id'];
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {

      this.router.navigate([`/${this.userNick}/profile`]);
      return; 
    }

    this.authService.getCurrentUser().subscribe((user: any) => {
      this.userCurrentNick = user.nickname;

      if (this.userNick === this.userCurrentNick) {

        this.router.navigate([`/${this.userNick}/account`],{ replaceUrl: true });
      } else {

        this.router.navigate([`/${this.userNick}/profile`],{ replaceUrl: true });
      }
    });
  }
  
  
}
