import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() value!: boolean;
  @Input() text?: string;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
