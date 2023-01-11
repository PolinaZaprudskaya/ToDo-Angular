import { Component, forwardRef, Input } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent {
  @Input() value: string;
  @Input() readonly = false;
  @Input() placeholder = '';

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
