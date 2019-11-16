var file = "./samples.json";
// Promise Pending
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

var subjectid = d3.select("#selDataset");

// Add an empty option under country and city section
subjectid.append("option");


// Fetch the JSON data and console log it
d3.json(file).then(function(data) {
  console.log(data);

  // save the subject id to a variable 
  var ids = data.names;

  // Add all of the id to dropdown menu
  ids.forEach(element => subjectid.append("option").text(element));
  console.log(ids);

});

// draw an initial bar chart
d3.json(file).then(function(data) {
    subjectdata = data.samples.filter(element => element.id === "941");

    var trace1 = {
        x: [subjectdata.otu_ids],
        y: [subjectdata.sample_values],
        type: "bar"
      };
      
      var plotdata = [trace1];

    var layout = {
        title: "'Bar' Chart",
    };

    Plotly.newPlot("bar", plotdata, layout);
});

// Actions after a subject id is selected
subjectid.on("change", function(){
    // save the chosen id to a var
    idselected = d3.event.target.value;
    console.log(idselected);

    
});

// Get the proper data to plot based on the selected subject id
d3.json(file).then(function(data) {
    subjectdata = data.samples.filter(element => element.id === idselected);

    var trace1 = {
        x: [subjectdata.otu_ids],
        y: [subjectdata.sample_values],
        type: "bar"
      };
      
      var plotdata = [trace1];

    var layout = {
        title: "'Bar' Chart",
    };

    Plotly.newPlot("bar", plotdata, layout);
});

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


// Use sample_values as the values for the bar chart.


// Use otu_ids as the labels for the bar chart.


// Use otu_labels as the hovertext for the chart.









// var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
//   "Brown", "Brown", "Brown", "Green", "Green",
//   "Green", "Green", "Green", "Blue", "Blue",
//   "Blue", "Blue", "Blue", "Blue"];
// var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
//   25.7, 24.5, 26.4, 24.2, 28, 26.9,
//   29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// // Create the Trace
// var trace1 = {
//   x: eyeColor,
//   y: eyeFlicker,
//   type: "bar"
// };

// // Create the data array for the plot
// var data = [trace1];

// // Define the plot layout
// var layout = {
//   title: "Eye Color vs Flicker",
//   xaxis: { title: "Eye Color" },
//   yaxis: { title: "Flicker Frequency" }
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("bar-plot", data, layout);
