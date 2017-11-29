function GraphRats() {
    var startdate = document.getElementById("startdate").value;
    var enddate = document.getElementById("enddate").value;
    // var startdate = sd.substring(5,8) + sd.substring(8) + "-" + sd.substring(0,5);
    // var enddate = ed.substring(5,8) + ed.substring(8) + "-" + ed.substring(0,5);
    const db = firebase.database();
    const dayRef = db.ref("WEB_DAYS_TABLE");

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = d3.map();

    dayRef.orderByKey().startAt(startdate).endAt(enddate)
        .once("value", function(snapshot){
            snapshot.forEach(function(children) {
                console.log(children.numChildren());
                //console.log("date: %s; num: %d", children.key, children.val().size);
                data.set(children.key, children.numChildren());
            });
        });

    // d3.tsv("../js/data.tsv", function(d) {
    //     d.frequency = +d.frequency;
    //     return d;
    // }, function(error, data) {
    //     if (error) throw error;
    //
    //     x.domain(data.map(function(d) { return d.letter; }));
    //     y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    //
    //     g.append("g")
    //         .attr("class", "axis axis--x")
    //         .attr("transform", "translate(0," + height + ")")
    //         .call(d3.axisBottom(x));
    //
    //     g.append("g")
    //         .attr("class", "axis axis--y")
    //         .call(d3.axisLeft(y).ticks(10, "%"))
    //         .append("text")
    //         .attr("transform", "rotate(-90)")
    //         .attr("y", 6)
    //         .attr("dy", "0.71em")
    //         .attr("text-anchor", "end")
    //         .text("Frequency");
    //
    //     g.selectAll(".bar")
    //         .data(data)
    //         .enter().append("rect")
    //         .attr("class", "bar")
    //         .attr("x", function(d) { return x(d.letter); })
    //         .attr("y", function(d) { return y(d.frequency); })
    //         .attr("width", x.bandwidth())
    //         .attr("height", function(d) { return height - y(d.frequency); });
    // });

    x.domain(d3.extent(data, function(d) { return d; }));
    y.domain([0, d3.max(data, function(d) {
        return data.get(d); })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("y", function(d) { return y(data.get(d)); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(data.get(d)); });

}