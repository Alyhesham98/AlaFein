import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  adminForm!: FormGroup;
  adminTypes!: any[];

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      adminType: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
    });

    this.adminTypes = [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  onSubmitForm() {
    console.log(this.adminForm.value);
  }

  onResetForm() {
    this.adminForm.reset();
  }
}
