import React, { Component, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";
import axios from 'axios';
import { ArrowUpOutlined  } from '@ant-design/icons';
import classnames from 'classnames';
import { Popover } from 'antd';
import {
    TabContent, TabPane, Nav,
    NavItem, NavLink, Row, Col, Container, Button, Modal, ModalHeader,ModalBody, ModalFooter
} from 'reactstrap';
import TradingViewWidget, {Themes} from 'react-tradingview-widget';
import { AdvancedChart, Ticker, MarketOverview, Timeline, MarketOverviewWidgetProps } from "react-tradingview-embed";
  
  
  const Demo4 = () => {

    const [data, setData] = useState([])
    

  return <div>
    <div className='mainContainer'>    
        <div className='order-book'>
            <MarketOverview MarketOverviewWidgetProps={{"showChart": false}, {"dateRange": "12M"},{"isTransparent": true}, {"showFloatingTooltip": false}, 
            {
                "tabs": [
                    {
                      "title": "Indices",
                      "symbols": [
                        {
                          "s": "FOREXCOM:SPXUSD",
                          "d": "S&P 500"
                        },
                        {
                          "s": "FOREXCOM:NSXUSD",
                          "d": "US 100"
                        },
                        {
                          "s": "FOREXCOM:DJI",
                          "d": "Dow 30"
                        },
                        {
                          "s": "INDEX:NKY",
                          "d": "Nikkei 225"
                        },
                        {
                          "s": "INDEX:DEU40",
                          "d": "DAX Index"
                        },
                        {
                          "s": "FOREXCOM:UKXGBP",
                          "d": "UK 100"
                        }
                      ]
                }
                ]
        }} />
        </div>
        <div className='main-chart'>
            <TradingViewWidget
                            height='400'
                            width='600'
                            // autosize
                            hide_side_toolbar={false}
                            symbol="NASDAQ:AAPL"
                            theme={Themes.LIGHT}
                            watchlist={["BINANCE:BTCUSDT"]}
                            interval = "D"
                            locale="us"
                            container_id= "tradingview_a611a"
                            custom_indicators_getter = {data}
            />
        </div>
        <div className='Info'>
            <Timeline /> 
        </div>
    </div>
    
  </div>
}

export default Demo4
