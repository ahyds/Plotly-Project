d3.json("./samples.json").then(function(d) {

    //
    
    function buildCharts(sample) {
        //bar chart
        var sampleValues = sample.sample_values;
        var otuIds = sample.otu_ids;
        var otuLabels = sample.otu_labels;
        //console.log(otu_ids);

        // Slice Top 10
        var top10 = sampleValues.slice(0, 10);
        var formattedId = otuIds.map(d => {
            return `OTU ${d}`});
        var top10Id = formattedId.slice(0, 10);
        var top10Label = otuLabels.slice(0, 10);

        var trace1 = {
            x: top10.reverse(),
            y: top10Id.reverse(),
            hovertext: top10Label.reverse(),
            type: "bar",
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
            title: "Top 10 OTUs Observed"
        };

        Plotly.newPlot("bar", data, layout);

        //bubble chart
        
            var x_axis = sample.otu_ids;
            var y_axis = sample.sample_values;
            var size = sample.sample_values;
            var color = sample.otu_ids;
            var texts = sample.otu_labels;
          
            var bubble = {
              x: x_axis,
              y: y_axis,
              text: texts,
              mode: `markers`,
              marker: {
                size: size,
                color: color
              }
            };
        
            var data2 = [bubble];
            var layout2 = {
              title: "Belly Button Bacteria",
              xaxis: {title: "OTU ID"}
            };
        Plotly.newPlot("bubble", data2, layout2);
    };

    // function buildMetadata(sample) {

    //     // To builds the metadata panel
    //         var sampleMetaData = d3.select(`#sample-metadata`);
    //       // Use `.html("") to clear any existing metadata
    //         sampleMetaData.html("");
    //       // Use `Object.entries` to add each key and value pair to the panel
    //       // (Hint:Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.)
    //         Object.entries(sample.metadata).forEach(function([key,value]){
    //           var row = sampleMetaData.append("p");
    //           row.text(`${key}:${value}`)
    //         })
    //       };

    function init() {

        // reference the dropdown
        var selector = d3.select("#selDataset");

        // Use the list of sample names to generate dropdown list
        d.names.forEach((name) => {
            selector
                .append("option")
                .text(name)
                .property("value", name);
            });

        // Use the first sample to build initial chart
        const firstSample = d.samples[0];
        buildCharts(firstSample);
        //buildMetadata(firstSample);
    };

    function optionChanged(newSample) {
        buildCharts(newSample);
        //buildMetadata(newSample);
    };

    // Initialize 
    init();


    // //On change to the DOM, call getData()
    // d3.selectAll("#selDataset").on("change", getData);

    // // Function called by DOM changes
    // function getData() {
    // var dropdownMenu = d3.select("#selDataset");
    // // Assign the value of the dropdown menu option to a variable
    // var dataset = dropdownMenu.property("value");
    // // Initialize an empty array for the country's data
    // var sampleData = {};
    // sampleData =





//     //Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");

  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
//     var sample = [];

//     var sample = d.samples.filter(element => element.id === dataset);
//     console.log(sample);

    
//         var sampleValues = sample.sample_values;
//         var otuIds = sample.otu_ids;
//         var otuLabels = sample.otu_labels;
        

//         // Slice Top 10
//         var top10 = sampleValues.slice(0, 10);
//         var formattedId = otuIds.map(d => {
//             return `OTU ${d}`});
//         var top10Id = formattedId.slice(0, 10);
//         var top10Label = otuLabels.slice(0, 10);

//         var x = top10.reverse();
//         var y = top10Id.reverse();
//         // var hovertext = top10Label.reverse();

  
//     // if (dataset === 'dataset1') {
//     //   x = [1, 2, 3, 4, 5];
//     //   y = [1, 2, 4, 8, 16];
//     // }
  
//     // if (dataset === 'dataset2') {
//     //   x = [10, 20, 30, 40, 50];
//     //   y = [1, 10, 100, 1000, 10000];
//     // }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("bar", "x", [x]);
//     Plotly.restyle("bar", "y", [y]);
//   };

    // int();
});  

