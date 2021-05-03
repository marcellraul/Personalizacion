import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesDropComponent } from './files-drop/files-drop.component';
import { CanvasComponent } from './canvas/canvas.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

@NgModule({
  declarations: [FilesDropComponent, CanvasComponent, SignaturePadComponent],
  imports: [CommonModule, CanvasWhiteboardModule],
  exports: [CanvasComponent, FilesDropComponent, SignaturePadComponent],
})
export class ComponentsModule {}
