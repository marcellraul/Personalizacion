import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesDropComponent } from './files-drop/files-drop.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [FilesDropComponent, CanvasComponent],
  imports: [CommonModule],
  exports: [CanvasComponent, FilesDropComponent],
})
export class ComponentsModule {}
