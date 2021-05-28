import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { FormsModule } from '@angular/forms';
import { ShapeEditorComponent } from './shape-editor/shape-editor.component';
import { Routes, RouterModule } from '@angular/router';
import { ShapeService } from '../services/shape.service';
import { CanvasJsComponent } from './canvas-js/canvas-js.component';
import { AutomatizacionComponent } from './automatizacion/automatizacion.component';

const appRoutes: Routes = [
  { path: 'shape', component: ShapeEditorComponent },
  { path: 'roi&lc', component: AutomatizacionComponent },
  { path: '', redirectTo: '/shape', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    CanvasComponent,
    ShapeEditorComponent,
    CanvasJsComponent,
    AutomatizacionComponent,
  ],
  imports: [
    CommonModule,
    CanvasWhiteboardModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        /*enableTracing: true */
      } // <-- debugging purposes only
    ),
  ],
  exports: [
    CanvasComponent,
    ShapeEditorComponent,
    CanvasJsComponent,
    AutomatizacionComponent,
  ],
  providers: [ShapeService],
})
export class ComponentsModule {}
