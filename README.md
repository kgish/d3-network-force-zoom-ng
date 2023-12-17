# D3.js Network Force Zoom Mg

D3.js network force demo using Angular with zoom and pan.

# Message ChatGPT

"Write code in javascript using the d3.js library to zoom and pan a force directed network graph."

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zoomable Force-Directed Network</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        /* Define CSS styles for the SVG container */
        #network-container {
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="network-container"></div>
    <script>
        // Define your graph data (you can replace this with your own data)
        const nodes = [
            { id: "A" },
            { id: "B" },
            { id: "C" },
            // Add more nodes as needed
        ];

        const links = [
            { source: "A", target: "B" },
            { source: "B", target: "C" },
            // Add more links as needed
        ];

        // Create an SVG container for the graph
        const svg = d3.select("#network-container")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        // Create a simulation for the force-directed layout
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).distance(100))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2));

        // Create the links and nodes
        const link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link");

        const node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", 10);

        // Define the zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", () => {
                svg.attr("transform", d3.event.transform);
            });

        // Apply the zoom behavior to the SVG container
        svg.call(zoom);

        // Update the simulation on each tick
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
    </script>
</body>
</html>
```

## References

* [D3,js](https://d3js.org)
* [Force Directed Graph](https://observablehq.com/@d3/force-directed-graph-component)
* [Angular](https://angular.dev)
* [Material](https://material.angular.io)
