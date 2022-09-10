import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-with-validation',
  templateUrl: './input-with-validation.component.html',
  styleUrls: ['./input-with-validation.component.scss']
})
export class InputWithValidationComponent implements OnInit {
  @Input()
  control: FormControl = new FormControl;
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() required: boolean = false
  @Input() readonly: boolean = false 
  @Input() class!: string
  @Input() errorMessage: string = ''
  @Input() invalid!: any;
  @Input() value?: string;
  constructor() { }

  ngOnInit(): void {
  }

  displayErrors(){
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }

}
