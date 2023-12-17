import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

// D3.js
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation, forceX, forceY,
  select,
  zoom
} from 'd3';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, MatToolbarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

  nodes!: Array<{ id: string }>;
  links!: Array<{ source: string, target: string; }>;
  svg!: any;
  simulation!: any;
  node!: any;
  link!: any;
  zoom!: any;

  ngOnInit() {
    this.nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
      { id: 'D' },
      { id: 'E' },
      { id: 'F' }
    ];

    this.links = [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'B', target: 'F' },
      { source: 'D', target: 'E' },
      { source: 'D', target: 'B' },
      { source: 'F', target: 'A' },
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => this.#initGraph(), 0);
  }

  #initGraph() {
    // Create an SVG container for the graph
    this.svg = select('#network-container')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    // Create the links and nodes
    this.link = this.svg.selectAll('.link')
      .data(this.links)
      .enter()
      .append('line')
      .attr('class', 'link');

    this.node = this.svg.selectAll('.node')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 10);

    // Create a simulation for the force-directed layout
    // this.simulation = forceSimulation(this.nodes as SimulationNodeDatum[])
    //   .force('link', forceLink(this.links).distance(100))
    //   .force('charge', forceManyBody().strength(-200))
    //   .force('center', forceCenter(this.svg.attr('width') / 2, this.svg.attr('height') / 2));

    this.simulation = forceSimulation();
    this.simulation.nodes(this.nodes);
    this.simulation
      .force('link', forceLink())
      .force('charge', forceManyBody())
      .force('collide', forceCollide())
      .force('center', forceCenter())
      .force('forceX', forceX())
      .force('forceY', forceY());
    // apply properties to each of the forces
    // this._updateForces(this.form.value);

    // Update the simulation on each tick
    this.simulation.on('tick', () => {
      if (this.link) {
        this.link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);
      }

      if (this.node) {
        this.node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);
      }
    });

    // Define the zoom behavior
    this.zoom = zoom()
      .scaleExtent([ 0.1, 4 ])
      .on('zoom', (event: any) => {
        this.svg.attr('transform', event.transform);
      });

    // Apply the zoom behavior to the SVG container
    this.svg.call(this.zoom);
  }
}
