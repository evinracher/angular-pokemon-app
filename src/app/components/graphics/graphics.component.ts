import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';
import {GraphicsData} from './graphics-data';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  @Input() dataset: number[][];
  datasets: GraphicsData[] = [];
  chart = Chart;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    const colors = ['rgb(62, 130, 115)', 'rgb(102, 209, 188)'];
    const colorsLength = colors.length;
    this.dataset.forEach((item, index) => {
      this.datasets.push({
        data: item,
        categoryPercentage: 0.8,
        backgroundColor: colors[index % colorsLength]
      });
    });

    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(this.ctx, {
      labels: '',
      type: 'bar',
      data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [...this.datasets]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 25,
              padding: 5
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              zeroLineColor: 'rgb(0,0,0)',
              color: 'rgb(0, 0, 0)',
              tickMarkLength: 5
            },
            scaleLabel: {
              align: 'center'
            }
          }],
          xAxes: [{
            ticks: {
              padding: 5
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              zeroLineColor: 'rgb(0,0,0)',
              color: 'rgb(0, 0, 0)',
              offsetGridLines: false,
              tickMarkLength: 5
            },
            scaleLabel: {
              align: 'center'
            }
          }]
        }
      }
    });
  }
}
