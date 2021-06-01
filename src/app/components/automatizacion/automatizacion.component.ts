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
  List = [];
  listCoord = [];
  ListLineCrossing = [];
  coord = { x: 0, y: 0 };
  nombreAnalitica = '';
  queDibujar = 'Roi';
  loading: false;
  //Lista de coordendas y nombres y todas las analiticas guardadas
  Analiticas = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.coord.x);
    this.context = this.canvas.nativeElement.getContext('2d');
    const image = new Image();
    image.src = 'https://podcast.duolingo.com/images/spanish/Episode%2011.jpeg';
    image.onload = () => {
      this.canvas.nativeElement.width = 600;
      this.canvas.nativeElement.height = 600;
      this.context.drawImage(image, 0, 0);
      this.context.beginPath();
    };
  }

  public click(event) {
    if (this.queDibujar == 'Line') {
      this.context.lineWidth = 5;
      this.context.lineJoin = 'round';
      this.context.beginPath();
      if (this.ListLineCrossing.length == 0) {
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(event.offsetX, event.offsetY, 8, 8);
      }
      this.ListLineCrossing = [
        ...this.ListLineCrossing,
        {
          x: (this.coord.x = event.offsetX),
          y: (this.coord.y = event.offsetY),
        },
      ];

      if (this.ListLineCrossing.length == 2) {
        this.context.moveTo(
          this.ListLineCrossing[0].x,
          this.ListLineCrossing[0].y
        );
        this.context.lineTo(
          this.ListLineCrossing[1].x,
          this.ListLineCrossing[1].y
        );
      } else if (this.ListLineCrossing.length == 3) {
        this.context.moveTo(
          this.ListLineCrossing[0].x,
          this.ListLineCrossing[0].y
        );
        this.context.lineTo(
          this.ListLineCrossing[1].x,
          this.ListLineCrossing[1].y
        );
      } else if (this.ListLineCrossing.length == 4) {
        this.context.moveTo(
          this.ListLineCrossing[0].x,
          this.ListLineCrossing[0].y
        );
        this.context.lineTo(
          this.ListLineCrossing[1].x,
          this.ListLineCrossing[1].y
        );
        this.canvas_arrow(
          this.context,
          this.ListLineCrossing[2].x,
          this.ListLineCrossing[2].y,
          this.ListLineCrossing[3].x,
          this.ListLineCrossing[3].y
        );

        this.List = [...this.List, [this.ListLineCrossing]];
        this.ListLineCrossing = [];
        console.log('List grande: ', this.List);
      }
      this.context.strokeStyle = '#27AE60';
      this.context.stroke();
      console.log('LineCrossing: ', this.ListLineCrossing);
      // let List = [
      //   { x: 219, y: 146 },
      //   { x: 312, y: 262 },
      //   { x: 189, y: 241 },
      //   { x: 331, y: 186 },
      // ];

      // let i = true;
      // List.forEach((e) => {
      //   if (i) {
      //     this.context.moveTo(e.x, e.y);
      //     i = false;
      //   }
      //   this.context.lineTo(e.x, e.y);

      //   this.context.strokeStyle = '#5B2C6F';
      //   this.context.stroke();
      // });
    }

    if (this.queDibujar == 'Roi') {
      this.context.lineWidth = 5;
      this.context.lineJoin = 'round';
      if (this.listCoord.length == 0) {
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(event.offsetX, event.offsetY, 10, 10);
      }

      this.listCoord = [
        ...this.listCoord,
        {
          x: (this.coord.x = event.offsetX),
          y: (this.coord.y = event.offsetY),
        },
      ];
      this.context.beginPath();
      if (this.listCoord.length >= 1) {
        let i = true;
        this.listCoord.forEach((e) => {
          if (i) {
            this.context.moveTo(e.x, e.y);
            i = false;
          }
          this.context.lineTo(e.x, e.y);
        });
        this.context.strokeStyle = '#F7DC6F';
        this.context.stroke();
      }
      console.log('ROi: ', this.listCoord);
    }
  }

  canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    );
  }
}
