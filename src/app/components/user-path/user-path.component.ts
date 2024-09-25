import { Component } from '@angular/core';
import { AuthService } from '../personal-account/auth-service.service';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

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
  paramsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  reloadComponent(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.userNick = params['id'];
      const authToken = localStorage.getItem('authToken');
  
      // Если токен отсутствует, перенаправляем на профиль
      if (!authToken) {
        this.router.navigateByUrl(`/${this.userNick}/profile`);
        return;
      }
  
      // Получаем текущего пользователя и выполняем проверку
      this.authService.getCurrentUser().subscribe((user: any) => {
        this.userCurrentNick = user.nickname;
        const token = localStorage.getItem('authToken');
        const nick = localStorage.getItem('userNickname');
  
        if (this.userNick === this.userCurrentNick && token && nick) {
          // Если пользователь находится на подмаршруте внутри account, не перенаправляем
          if (!this.router.url.startsWith(`/${this.userNick}/account`)) {
            this.router.navigateByUrl(`/${this.userNick}/account`);
          }
        } else {
          // Если пользователь на profile странице, проверяем подмаршруты
          if (!this.router.url.startsWith(`/${this.userNick}/profile`)) {
            this.router.navigateByUrl(`/${this.userNick}/profile`);
          }
        }
      });
    });
  }
  

  ngOnInit(): void {
    // Подписка на параметры маршрута
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Проверяем, находится ли пользователь на той же странице
        if (this.router.url === `/${localStorage.getItem('userNickname')}`) {
          this.reloadComponent();
        }
      }
    });
    
    this.reloadComponent();
  }



  ngOnDestroy(): void {
    // Отписка от подписки на изменение маршрута при уничтожении компонента
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
