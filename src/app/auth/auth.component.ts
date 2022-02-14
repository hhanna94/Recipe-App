import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {

    } else {
      this.authService.register(form.value.email, form.value.password)
        .subscribe( authData => {
          console.log(authData);
          this.isLoading = false;
        },
        error => {
          this.error = 'An error occured!'
          this.isLoading = false;
        })
    }
    form.reset();
  }

}
