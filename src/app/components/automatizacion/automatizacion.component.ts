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
  alert: boolean = false;
  urlImage2: string = 'assets/images/98_original.png';

  //Lista de coordendas y nombres y todas las analiticas guardadas
  Analiticas = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.coord.x);
    this.context = this.canvas.nativeElement.getContext('2d');
    const image = new Image();
    image.src = 'https://podcast.duolingo.com/images/spanish/Episode%2011.jpeg';
    image.onload = () => {
      this.canvas.nativeElement.width = image.width;
      this.canvas.nativeElement.height = image.height;
      this.context.drawImage(image, 0, 0);
      this.context.beginPath();
    };
  }

  public click(event) {
    this.LineCrossing(event);
    this.ROI(event);
  }

  LineCrossing(event) {
    if (this.queDibujar == 'Line') {
      this.alert = false;
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
        if (
          this.seg_intersection(
            this.ListLineCrossing[0],
            this.ListLineCrossing[1],
            this.ListLineCrossing[2],
            { x: this.coord.x, y: this.coord.y }
          )
        ) {
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
        } else {
          this.ListLineCrossing.splice(this.LineCrossing.length - 3, 2);
          this.alert = true;
        }

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
  }

  ROI(event) {
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
    var headlen = 20;
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

  area_triang(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
  }

  side_p_to_seg(v1, v2, p) {
    let area = this.area_triang(v1, v2, p);
    let lado = '';
    if (area > 0) lado = 'izq';
    else if (area < 0) lado = 'der';
    else lado = 'col';
    return lado;
  }

  seg_intersection(u1, u2, v1, v2) {
    if (
      this.side_p_to_seg(u1, u2, v1) === 'col' ||
      this.side_p_to_seg(u1, u2, v2) === 'col' ||
      this.side_p_to_seg(v1, v2, u1) === 'col' ||
      this.side_p_to_seg(v1, v2, u2) === 'col'
    )
      return false;
    else if (
      ((this.side_p_to_seg(u1, u2, v1) === 'izq' &&
        this.side_p_to_seg(u1, u2, v2) === 'der') ||
        (this.side_p_to_seg(u1, u2, v1) === 'der' &&
          this.side_p_to_seg(u1, u2, v2) === 'izq')) &&
      ((this.side_p_to_seg(v1, v2, u1) === 'der' &&
        this.side_p_to_seg(v1, v2, u2) === 'izq') ||
        (this.side_p_to_seg(v1, v2, u1) === 'izq' &&
          this.side_p_to_seg(v1, v2, u2) === 'der'))
    )
      return true;
    else return false;
  }

  comprobarInterseccionPoligono(lista, nuevoPunto) {
    for (var i = 0; i < lista.length - 1; i++)
      if (
        this.seg_intersection(
          lista[i],
          lista[i + 1],
          lista[lista.length - 1],
          nuevoPunto
        )
      ) {
        return true;
      }
    return false;
  }
}
