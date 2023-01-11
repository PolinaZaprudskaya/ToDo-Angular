import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() value: string;
  @Input() items: { name: string, value: string }[];
  @Input() readonly: boolean;

  @Output() valueChange: EventEmitter<string> =  new EventEmitter<string>();

  constructor() { }

  setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

  public onChange = (value: any) => {};

  public onTouched = () => { };

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public change(value: any): void {
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }
}
