import { Component, OnInit, Input } from '@angular/core';
import { Shape } from 'src/app/services/shape';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss'],
})
export class ShapeFormComponent implements OnInit {
  constructor() {}
  @Input() shapesToEdit: Shape[];
  @Input() editedShape: Subject<Shape>;

  // a local reference to the currentShape, useful for [(ngModel)]
  localCurrent: Shape;

  // subscribe the local currentShape to the global Subject
  ngOnInit() {
    this.editedShape.subscribe((x: any) => (this.localCurrent = x));
  }
  // when the shape changes, make the current shape subject emit
  shapeChanged(e: Event) {
    this.editedShape.next(this.localCurrent);
  }
}
