import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesDropComponent } from './files-drop/files-drop.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { FormsModule } from '@angular/forms';
import { ShapeEditorComponent } from './shape-editor/shape-editor.component';
import { Routes, RouterModule } from '@angular/router';
import { ShapeService } from '../services/shape.service';
import { CanvasJsComponent } from './canvas-js/canvas-js.component';
import { ShapeFormComponent } from './shape-form/shape-form.component';
import { ShapeTypeComponent } from './shape-type/shape-type.component';

const appRoutes: Routes = [
  { path: 'shape/:id', component: ShapeEditorComponent },
  { path: '', redirectTo: '/shape/1', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    FilesDropComponent,
    CanvasComponent,
    ShapeEditorComponent,
    CanvasJsComponent,
    ShapeFormComponent,
    ShapeTypeComponent,
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
    FilesDropComponent,
    ShapeEditorComponent,
    CanvasJsComponent,
    ShapeFormComponent,
    ShapeTypeComponent,
  ],
  providers: [ShapeService],
})
export class ComponentsModule {}
