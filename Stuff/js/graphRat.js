var data = d3.map();
var keys = [];
var vals = [];

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



    dayRef.orderByKey().startAt(startdate).endAt(enddate)
        .once("value", function(snapshot){
            snapshot.forEach(function(children) {
                console.log(children.numChildren());
                //console.log("date: %s; num: %d", children.key, children.val().size);
                data.set(children.key, children.numChildren());
                keys.push(children.key);
                vals.push(children.numChildren());
            });
        });


    window.setTimeout(graphNow, 5000);

    function graphNow() {
        var d3 = Plotly.d3;

        var WIDTH_IN_PERCENT_OF_PARENT = 60,
            HEIGHT_IN_PERCENT_OF_PARENT = 80;

        var gd3 = d3.select('body')
            .append('div')
            .style({
                width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

                height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
                'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
            });

        var gd = gd3.node();

        console.log(data.keys());
        console.log(data.values());

        Plotly.plot(gd, [{
            type: 'bar',
            x: keys,
            y: vals,
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
        }], {
            title: 'Auto-Resize',
            font: {
                size: 16
            }
        });

        window.onresize = function() {
            Plotly.Plots.resize(gd);
        };

    }

}