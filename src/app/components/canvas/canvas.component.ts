import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Shape } from '../../services/shape';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  type = 'rectangle';

  constructor() {}
  shapeType = 'rectangle';

  @Output() onTypeChange = new EventEmitter<string>();
  @Input() shapesToDraw: Shape[];
  @Input() currentShape: Subject<Shape>;

  // the shape being just drawn
  createdShape: Shape;

  ngOnInit(): void {}

  setType(type: string) {
    this.shapeType = type;
  }
  startDrawing(evt: MouseEvent) {
    this.createdShape = {
      type: this.shapeType,
      x: evt.offsetX,
      y: evt.offsetY,
      w: 0,
      h: 0,
    };
    //this.shapesToDraw.push(this.createdShape);
  }

  keepDrawing(evt: MouseEvent) {
    if (this.createdShape) {
      //this.currentShape.next(this.createdShape);
      this.createdShape.w = evt.offsetX - this.createdShape.x;
      this.createdShape.h = evt.offsetY - this.createdShape.y;
      // console.log(this.createdShape);
      // console.log(this.currentShape);
    }
  }

  stopDrawing(evt: MouseEvent) {
    this.createdShape = null;
  }

  typeChanged() {
    this.type;
    console.log(this.type);
    // this.onTypeChange.emit(this.type);
    // console.log(this.onTypeChange.emit(this.type));
  }
}
