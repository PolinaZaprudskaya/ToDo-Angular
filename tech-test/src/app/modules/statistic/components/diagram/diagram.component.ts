import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { Task } from '@tasks/models/task.model';
import { TypeAndColor } from '@common/constants/type-and-color';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
})
export class DiagramComponent implements OnChanges, AfterViewInit {
  @Input() tasks!: Task[];

  @ViewChild('diagram', {static: false}) diagram!: ElementRef;

  public groupedTasks: [string, number][];
  public typeAndColor = TypeAndColor;
  private id = 'pie';
  private margin = 20;
  private width = 300;
  private height = 300;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private svg!: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks && !changes.tasks.firstChange) {
      const tasks = changes.tasks.currentValue;
      this.update(tasks);
    }
  }

  ngAfterViewInit(): void {
    this.initDivWrapper();
    this.initSvg();
    this.update(this.tasks);
  }

  private initDivWrapper(): void {
    this.diagram.nativeElement.setAttribute('id', this.id);
  }

  private initSvg(): void {
    this.svg = d3.select('#' + this.id)
      .style('display', 'flex')
      .style('align-item', 'center')
      .style('justify-content', 'center')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'svg-' + this.id)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  private update(tasks: Task[]): void {
    if (tasks?.length) {
      const data = tasks.reduce((group, task) => {
        const { category } = task;
        // @ts-ignore
        group[category] = (group[category] ?? 0) + 1;
        return group;
      }, {} as { [key: string]: number });

      this.groupedTasks = Object.entries(data);

      const color = d3.scaleOrdinal()
        .domain(['sport', 'work', 'house', 'health', 'bureaucracy', 'education'])
        .range(['#3c3cc0', '#a80645', 'rgba(222, 121, 10, 0.88)', '#42bb7b', '#1bab9c', '#9b1c9b']);

      const pie = d3.pie()
        .value((d) => d[1])
        // @ts-ignore
        .sort((a, b) => d3.ascending(a.key, b.key));

      // @ts-ignore
      const u = this.svg.selectAll('path').data(pie(Object.entries(data)));

      u
        .join('path')
        .transition()
        .duration(1000)
        .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
        .attr('fill', (d) => color(d.data[0]))
        .attr('stroke', 'white')
        .attr('stroke-width', '2px')
        .attr('opacity', 1);
    }
  }

}
