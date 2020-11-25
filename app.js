function plot(id) {
    
    d3.json("samples.json").then((data)=> {
        console.log(data)

        var wFreq = data.metadata.map(d => d.wfreq)
        console.log(wFreq);

        var samples = data.samples.filter(s => s.id === id)[0];
        console.log(samples);

        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var values = (samples.otu_ids.slice(0, 10)).reverse();        
        console.log(values);

        var otu = values.map(d => "OTU " + d)
        console.log(otu)

        var labels = samples.otu_labels.slice(0, 10);

        var trace = {
            x: sampleValues,
            y: otu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU"
        };

        Plotly.newPlot("bar", data, layout);


        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var layout1 = {
            xaxis:{title: "OTU ID"},
            height: 650,
            width: 1200
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout1); 


        var trace2 = {
            labels: otu,
            values:sampleValues,
            type:"pie",
        }

        var layout2 = {
            title: "Top 10 OTU Pie "
        }

        var data = [trace2]
        
        Plotly.newPlot("gauge", data,layout2)

    });    
}
    

function info(id) {
    d3.json("samples.json").then((data)=> {
        
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        console.log(result);

        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key,value) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    plot(id);
    info(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        plot(data.names[0]);
        info(data.names[0]);
    });
}

init();