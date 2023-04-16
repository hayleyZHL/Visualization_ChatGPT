// script.js
document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');

    // Function to create the bar chart
    function createBarChart() {
        const data = [50, 70, 100, 90, 80];
        const width = 400;
        const height = 200;
        const margin = { top: 10, right: 10, bottom: 20, left: 40 };

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => i + 1).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, data.format))
            .call(g => g.select(".domain").remove());

        const svg = d3.select("#bar-chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", height - margin.bottom)
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .transition()
            .duration(750)
            .attr("y", d => y(d))
            .attr("height", d => y(0) - y(d));

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);
    }

    // Function to create the line chart
    function createLineChart() {
        const data = [180, 140, 80, 100, 110];
        const width = 400;
        const height = 200;
        const margin = { top: 10, right: 10, bottom: 20, left: 40 };

        const x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .defined(d => !isNaN(d))
            .x((d, i) => x(i))
            .y(d => y(d));

        const svg = d3.select("#line-chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
    }

    createBarChart();
    createLineChart();

    // Parallax scrolling effect
    function parallaxScroll() {
        const scrollTop = parallaxContainer.scrollTop;
        const windowHeight = window.innerHeight;

        document.querySelectorAll('.parallax-section').forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollTop + windowHeight >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
                const translateAmount = (scrollTop - sectionTop) / 2;
                section.querySelector('.chart-container').style.transform = `translateY(${translateAmount}px)`;
            }
        });
    }

    parallaxContainer.addEventListener('scroll', parallaxScroll);
});
