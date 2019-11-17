d3.json("./samples.json").then(function(d) {
  function buildMetadata(sample) {

    //d3.json("./samples.json").then(function(d) {
  
        var sampleData = d3.select(`#sample-metadata`);
      // Use `.html("") to clear any existing metadata
        sampleData.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
        Object.entries(d.sample[0]).forEach(function([key,value]){
          var row = sampleData.append("p");
          row.text(`${key}:${value}`)
        })
      //});
};

  function buildCharts(sample) {

    //d3.json("./samples.json").then(function(d) {

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
    //});
};



function init() {

        // reference the dropdown
        var selector = d3.select("#selDataset");

    //d3.json("../samples.json").then(function(d) {

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
   
        buildMetadata(firstSample);
    //});
}; 

 function optionChanged(newSample) {
        buildCharts(newSample);
        //buildMetadata(newSample);
 };

// Initialize 
init();

});