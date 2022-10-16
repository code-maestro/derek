document.addEventListener('DOMContentLoaded', function () {
    showGraphs();
});

const showGraphs = () => {
    Highcharts.chart('graph', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'GRAPHICAL STATISTICS'
        },
        xAxis: {
            categories: [
                '2010'
            ],

            crosshair: true
        },

        yAxis: {
            title: {
                useHTML: true,
                text: 'Million tonnes CO<sub>2</sub>-equivalents'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            name: 'Oil and gas extraction',
            data: [13.93]

        }, {
            name: 'Road traffic',
            data: [10.00]

        }, {
            name: 'Agriculture',
            data: [4.35]

        }]
    });
}