import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  @Output() handleCheckout: EventEmitter<string> = new EventEmitter();
  @Input() totalItem: number = 0;
  checkOutForm!: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onInitForm();
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.checkOutForm.invalid) {
      return;
    }
    this.handleCheckout.emit(this.checkOutForm.controls['firstName'].value);
  }

  get f() {
    return this.checkOutForm.controls;
  }

  onInitForm(): void {
    this.checkOutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(16)]],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
    });
  }
}
