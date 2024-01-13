import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  visible: boolean = false;
  languageSwitch: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.router.navigate(['/home']);
    // this.authService.login(this.loginForm.value).subscribe(
    //   (result) => {},
    //   (err) => {}
    // );
  }

  onForgetPassword() {
    this.router.navigate(['/forget-password']);
  }
}
