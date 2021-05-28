import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-automatizacion',
  templateUrl: './automatizacion.component.html',
  styleUrls: ['./automatizacion.component.scss'],

  styles: ['canvas { border-style: solid }'],
})
export class AutomatizacionComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  listCoord = [];
  constructor() {}

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    const image = new Image();
    image.src = 'https://podcast.duolingo.com/images/spanish/Episode%2011.jpeg';
    image.onload = () => {
      this.canvas.nativeElement.width = image.width;
      this.canvas.nativeElement.height = image.height;
      this.context.drawImage(image, 0, 0);
      this.context.beginPath();
      this.context.lineWidth = 3;
      if (this.listCoord?.length === 0) {
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(this.listCoord[0].x, this.listCoord[0].y, 10, 10);
      }
    };

    console.log(this.context);
  }
  click() {
    console.log('click');
    if (this.listCoord.length >= 0) {
      let i = true;
      this.listCoord.forEach((e) => {
        if (i) {
          this.context.moveTo(e.x, e.y);
          i = false;
        }
        this.context.lineTo(e.x, e.y);
      });
      this.context.strokeStyle = 'yellow';
      this.context.stroke();
      console.log(this.listCoord);
      console.log(this.context);
    }
  }
}
