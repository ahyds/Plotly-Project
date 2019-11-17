function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  var metadataURL = `/metadata/${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(metadataURL).then(function(sample){
      var sampleData = d3.select(`#sample-metadata`);
    // Use `.html("") to clear any existing metadata
      sampleData.html("");


    // Use `Object.entries` to add each key and value pair to the panel
 
      Object.entries(sample).forEach(function([key,value]){
        var row = sampleData.append("p");
        row.text(`${key}:${value}`)
      })
    });
}

function buildCharts(sample) {

  var plotData = `/samples/${sample}`;

  //bar chart
  d3.json(plotData).then(function(data){
  var sampleValues = data.sample.sample_values;
  var otuIds = data.sample.otu_ids;
  var otuLabels = data.sample.otu_labels;
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


    //     Pie Chart
    d3.json(plotData).then(function(data){
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);

      var pie_chart = [{
        values: values,
        lables: labels,
        hovertext: display,
        type: "pie"
      }];
      Plotly.newPlot('pie',pie_chart);
    });
  });
};

function init() {
  console.log('hello');
  //  reference to the dropdown selected element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to generate the selection options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // 1stsample for the initial plots
    const firstSample = sampleNames[0];

    buildCharts(firstSample);
    buildMetadata(firstSample);
  });

}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize 
init();