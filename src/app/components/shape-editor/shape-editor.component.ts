import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ShapeService } from 'src/app/services/shape.service';
import { Shape } from 'src/app/services/shape';

@Component({
  selector: 'app-shape-editor',
  templateUrl: './shape-editor.component.html',
  styleUrls: ['./shape-editor.component.scss'],
})
export class ShapeEditorComponent implements OnInit {
  // Angular initializes the ShapeService
  // and other constructor parameters via dependency injection
  constructor(
    private shapeService: ShapeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  title: string = 'Shape editor';
  shapes: Shape[];
  currentShape = new BehaviorSubject<Shape>(null);

  findShape = (x) => (x < 0 ? 1 : x + 1);

  ngOnInit() {
    // // invoke the shape service
    // this.shapes = this.shapeService.getShapes();
    // // when current shape changes, navigate the router
    // this.currentShape.subscribe((shape) =>
    //   this.router.navigate([
    //     '/shape',
    //     this.findShape(this.shapes.findIndex((sh) => sh == shape)),
    //   ])
    // );
    // // when the route changes, change currentShape
    // this.route.params
    //   .pipe((p: any) => p.id)
    //   .subscribe((id: any) => this.currentShape.next(this.shapes[id - 1]));
  }
}
