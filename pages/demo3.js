import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./priceData";
// import { areaData } from './areaData';
import { volumeData } from "./volumeData";
import dynamic from 'next/dynamic';
import axios from 'axios';


 function Demo3() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [data, setData] = useState([])
  const [price, setPrice] = useState({})

  useEffect(async() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500, //"300px", //chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      toolbar: {
        hide_top_toolbar: false,
     },
      grid: {
        vertLines: {
          color: "#334158"
        },
        horzLines: {
          color: "#334158"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderColor: "#485c7b"
      },
      pane: 0,
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1"
    });

    // const newData = await axios.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json');

    // axios.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json').then(async(data) => {
        // setData(newData.data)
        // let price = {
        //     high: newData.data.slice(-1)[0][2],
        //     low: newData.data.slice(-1)[0][3],
        //     date: newData.data.slice(-10)[0][0]
        // }
        // setPrice(price)
        // console.log("data", newData[newData.length - 1])
        // await setMarker(data[data.length - 1])
         // Milliseconds in a day

        // }).then(()=>{
            // console.log("newData", newData.data)

            candleSeries.setData(priceData);
        // })

    //SMA
    const sma_series = chart.current.addLineSeries({ color: 'red', lineWidth: 1 });
    const sma_data = priceData
        .filter((d) => d.sma)
        .map((d) => ({ time: d.time, value: d.sma }));
    sma_series.setData(sma_data);
    //EMA
    const ema_series = chart.current.addLineSeries({ color: 'green', lineWidth: 1 });
    const ema_data = priceData
        .filter((d) => d.ema)
        .map((d) => ({ time: d.time, value: d.ema }));
    ema_series.setData(ema_data);
    //MARKERS
//     candleSeries.setMarkers(
//     priceData
//       .filter((d) => d.high || d.low)
//       .map((d) =>
//         d.high
//           ? {
//               time: d.time,
//               position: 'belowBar',
//               color: 'green',
//               shape: 'arrowUp',
//               text: 'LONG',
//             }
//           : {
//               time: d.time,
//               position: 'aboveBar',
//               color: 'red',
//               shape: 'arrowDown',
//               text: 'SHORT',
//             }
//       )
//   );

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    var datesForMarkers = [priceData[priceData.length - 45], priceData[priceData.length - 25], priceData[priceData.length - 19], priceData[priceData.length - 1]];
    console.log("data", datesForMarkers)
    var indexOfMinPrice = 0;
    for (var i = 1; i < datesForMarkers.length; i++) {
        if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
            indexOfMinPrice = i;
        }
    }

    var markers = [{ time: priceData[priceData.length - 48].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' }];
    for (var i = 0; i < datesForMarkers.length; i++) {
        if (i !== indexOfMinPrice) {
            markers.push({ time: datesForMarkers[i].time, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2) });
        } else {
            markers.push({ time: datesForMarkers[i].time, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2) });
        }
    }
    candleSeries.setMarkers(markers);

    const volumeSeries = chart.current.addHistogramSeries({
      color: "#182233",
      lineWidth: 2,
      priceFormat: {
        type: "volume"
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    });

    volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={chartContainerRef}
        className="chart-container"
        // style={{ height: "100%" }}
      />
    </div>
  );
}

export default Demo3