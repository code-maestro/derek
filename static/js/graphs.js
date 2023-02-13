document.addEventListener('DOMContentLoaded', function () {
    showGraphs();
});


// DISPLAYS GRAPHS
const showGraphs = async () => {

    const year_registered = ['oldAnimals', 'yearAnimals', 'newAnimals'];
    const no = [];

    for (const yr of year_registered) {
        const animalCount = await getCount(yr);
        no.push(animalCount.count[0].COUNT);
    }

    const pCount = await getCount('pendingAnimals');
    const vCount = await getCount('vaccinatedAnimals');

    Highcharts.chart('graph', {
        chart: {
            type: 'column'
        },
        title: {
            text: '<strong>GRAPHICAL STATISTICS</strong>'
        },
        xAxis: {
            categories: [
                `${new Date().getFullYear() - 1}`,
                `${new Date().getFullYear()}`,
                `${new Date().getFullYear() + 1}`
            ],

            crosshair: true
        },

        yAxis: {
            title: {
                useHTML: true,
                text: 'Numbers'
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
            name: 'Registered Animals',
            data: no

        }, {
            name: 'Vaccinated Animals',
            data:  [0, vCount.count[0].COUNT, 0]

        }, {
            name: 'Animals Pending Vaccinations',
            data: [0, pCount.count[0].COUNT, 0]

        }]
    });
}