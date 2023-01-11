import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss']
})
export class InputWrapperComponent {
  @Input() label!: string;
  @Input() readonly!: string;
  @Input() errorMessage!: string;
  @Input() hasError!: boolean;
  @Input() withoutBackground?: boolean;
}
