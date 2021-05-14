import { Injectable } from '@angular/core';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  constructor() {}
  private shapes: Shape[] = [
    // { type: 'ellipse', x: 10, y: 10, w: 32, h: 34 },
    // { type: 'line', x: 60, y: 10, w: 12, h: 34 },
    // { type: 'rectangle', x: 90, y: 10, w: 32, h: 34 },
  ];
  getShapes() {
    return this.shapes;
  }
}
