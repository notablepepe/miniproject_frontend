import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;

  fb = inject(FormBuilder)
  tdee : any

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      activityLevel: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const tdee = this.calculateTDEE(
        this.profileForm.value.age,
        this.profileForm.value.height,
        this.profileForm.value.weight,
        this.profileForm.value.activityLevel,
        this.profileForm.value.gender
      );
     //console.log(`TDEE: ${tdee}`);
    }
  }

  calculateTDEE(age: number, height: number, weight: number, activityLevel: string, gender: string) {
    let bmr: number;

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityMultiplier: number;

    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightly active':
        activityMultiplier = 1.375;
        break;
      case 'moderately active':
        activityMultiplier = 1.55;
        break;
      case 'very active':
        activityMultiplier = 1.725;
        break;
      case 'super active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    this.tdee =  bmr * activityMultiplier;
  }
}