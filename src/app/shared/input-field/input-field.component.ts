import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFieldComponent,
      multi: true,
    },
  ],
})
export class InputFieldComponent {
  constructor(private controlContainer: ControlContainer) {}
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() required: boolean = false;
  @Input() formControl!: FormControl;
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }
  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  ngOnChanges(changes: any): void {
    this.disabled = changes.disabled?.currentValue;
  }
}
