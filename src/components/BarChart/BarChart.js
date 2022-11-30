// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useState , useEffect } from 'react';
 import "./BarChart.scss";
 function BarChart({ width, height }){
    // const datas = [
    //     [10, 30, 40, 20],
    //     [10, 40, 30, 20, 50, 10],
    //     [60, 30, 40, 20, 30]
    //   ]
    //   let i = 0;

      const [data, setData] = useState([]);

  useEffect(() => {
      changeData();
  }, []);

  const changeData = () => {
    //   setData(datas[i++]);
    //   if(i === datas.length) i = 0;
    const arr = [];
    for(let i =0 ; i < 10 ; i++){
        arr.push(Math.floor(Math.random() * 10));
    }
    setData(arr);
  }
    
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            // .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(data);
        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(data)])
                            .range([0, height-100]);
        
        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", (d) => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "orange")
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
            <button className="chart--btn" onClick={changeData}>Change Data</button>
        </div>
        
    )

 }

export default BarChart;