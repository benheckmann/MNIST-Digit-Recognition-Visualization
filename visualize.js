let showProcessing = (elementId)=>{
    let parent = document.querySelector(elementId);
    let img = document.createElement('img');
    //img.setAttribute('src', 'https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif');
    img.style.position = 'absolute';
    img.width = '200';
    img.style.left = '15%';
    img.style.top = '15%';
    parent.appendChild(img);
    return img;
}

function delay() {
  var promise = new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      resolve();
    },0); // ... --
  });
  return promise;
}

let clearProcessing = (elem)=>{
  elem.style.display = "none";
}


let Plot = (activations,dim,elementId) => {
     
    document.querySelector(elementId).innerHTML = "";

    activations = activations.map((p,i)=>{
        let s = Math.floor(i/dim)*dim;
        let e = Math.floor((i/dim) + 1 ) * dim;

        return {
            variable: s.toString() +" - " + e.toString(),
            group: Math.floor((i%dim)).toString(),
            value: p.toString()
        }
    })

// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 250 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(elementId)
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + 50 + "," + 40 + ")");

// read the data
let data = activations;

console.log(data)

var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0);
    

  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0);
  

  var myColor = d3.scaleLinear()
    .domain([0,0.25,0.5,0.75,1])
    .range(['#ed6c72','#e75665', '#e73735', '#d7322f', '#63f542']); //'#d80909']); ... -- 


  var tooltip = d3.select(elementId)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "1px")
    .style("padding", "5px")

  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Activation: " + d.value)
      .style("position","absolute")
      .style('z-index',"100")
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 0)
      .attr("ry", 0)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth())
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .style("border","none")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)




}

