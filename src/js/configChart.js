const config = (hourlyTem, labels) =>{

    const data1 = {
        labels: labels,
        datasets: [{
            label: 'Hourly forecast',
            backgroundColor: 'rgb(255,255,255)',
            borderColor: 'rgb(255,255,255)',
            data: hourlyTem,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
        }]
    };

    return {
            type: 'line',
                data: data1,
            options: {
            responsive: true,
                interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                        title: {
                        display: true
                    }
                },
                y: {
                    display: true,
                        suggestedMin: Math.min.apply(Math, hourlyTem)-5,
                        suggestedMax: Math.max.apply(Math, hourlyTem)+5
                }
            }
            }
    };
}

export default config