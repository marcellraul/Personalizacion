import { Component, OnInit, Input } from '@angular/core';

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
  urlImage: string = 'assets/images/98_original.png';
  urlImage2: string = 'assets/images/98_original.png';

  @Input() shapesToDraw: Shape[];
  @Input() currentShape: Subject<Shape>;

  // the shape being just drawn
  createdShape: Shape;

  ngOnInit(): void {}

  setType(type: string) {
    this.shapeType = type;
    //console.log(this.shapeType);
  }

  startDrawing(evt: MouseEvent) {
    this.createdShape = {
      type: this.shapeType,
      x: evt.offsetX,
      y: evt.offsetY,
      w: 0,
      h: 0,
    };

    this.shapesToDraw.push(this.createdShape);
    console.log('shapesdraw', this.shapesToDraw);
  }

  keepDrawing(evt: MouseEvent) {
    if (this.createdShape) {
      this.currentShape.next(this.createdShape);
      this.createdShape.w = evt.offsetX - this.createdShape.x;
      this.createdShape.h = evt.offsetY - this.createdShape.y;
    }
    // console.log(this.currentShape);
    // console.log(this.createdShape);
  }

  stopDrawing(evt: MouseEvent) {
    this.createdShape = null;
    //console.log('stopdrawing');
  }

  Delete(i) {
    this.shapesToDraw.splice(i, 1);
    console.log(this.shapesToDraw);
  }
}
