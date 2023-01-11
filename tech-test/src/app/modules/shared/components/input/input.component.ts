import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
  @Input() value: string;
  @Input() readonly = false;
  @Input() placeholder = '';

  @Output() valueChange: EventEmitter<string> =  new EventEmitter<string>();

  public onChange = (value: any) => {};

  public onTouched = () => { };

  private writeValue(value: any): void {
    this.value = value;
  }

  private registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
