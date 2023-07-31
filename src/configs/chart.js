const chartOptionsConfig = {
    chart: {
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#dc3545', '#ffc107', '#28a745'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 5,
    },
    title: {
        text: 'High, Average, Low gas prices',
        align: 'left'
    },
    markers: {
        size: 1
    },
    xaxis: {
        type: 'datetime',
        title: {
            text: 'Month'
        },
        labels: {
            format: 'dd/MMM',
        },
    },
    yaxis: {
        title: {
            text: 'Price $'
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
};

export default chartOptionsConfig;