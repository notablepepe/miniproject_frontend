import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MealPlannerService } from 'src/app/services/meal-planner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  fb = inject(FormBuilder)
  service = inject(MealPlannerService)
  router = inject(Router)

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      //confirmPassword: ['', Validators.required],
    });
  }

  register() {
    console.log('checking valid');
    
    if (this.registrationForm.valid) {
      // to do service
      const username = this.registrationForm.value['username']
      const password = this.registrationForm.value['password']
      const email = this.registrationForm.value['email']
      console.log('its valid');
      
      this.service.registerAccount(username, password, email) 
    }
  }

  login() {
    this.router.navigate(['/login'])
  }
}
