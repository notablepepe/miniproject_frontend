import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MealPlannerService } from 'src/app/services/meal-planner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  fb = inject(FormBuilder)
  router = inject(Router)
  service = inject(MealPlannerService)
  //localstorage = inject(StorageService)
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // call service to make post
      this.service.loginToAccount(username, password).subscribe({
        next: (data) => console.log(data) ,
        error: (error) => {
          if(error.status === 200) {
            alert('hello')
            localStorage.setItem('token', username)
            this.router.navigate(['/profile'])
          }
          else {
            alert('Invalid username/password')
          }
        }
        
      })
      
    }
  }

  signUp() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    //to do
  }
}
