import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shape-type',
  templateUrl: './shape-type.component.html',
  styleUrls: ['./shape-type.component.scss'],
})
export class ShapeTypeComponent implements OnInit {
  @Output() onTypeChange = new EventEmitter<string>();
  type = 'rectangle';

  constructor() {}

  typeChanged() {
    this.onTypeChange.emit(this.type);
  }

  ngOnInit(): void {}
}
