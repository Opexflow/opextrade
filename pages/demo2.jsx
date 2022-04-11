import React, { Component, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import Indicators from 'highcharts/indicators/indicators-all.js';
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';
import axios from 'axios';
import { socketio,initiateSocketConnection} from './socketio';
import { ArrowUpOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Popover } from 'antd';
import {
    TabContent, TabPane, Nav,
    NavItem, NavLink, Row, Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';
import { volumeData } from './volumeData';
import { priceData } from './priceData';
import { TailSpin } from 'react-loader-spinner';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

// init the module
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const Demo2 = () => {
    const [dataa, setData] = useState([]);
    const [price, setPrice] = useState({});
    const [marker, setMarker] = useState({});
    const [volume, setVolume] = useState([]);

    // Modal open state
    const [modal, setModal] = React.useState(false);
    const [modal1, setModal1] = React.useState(false);

    // Toggle for Modal
    const toggle1 = () => setModal(!modal);
    const toggle2 = () => setModal1(!modal1);
   
    useEffect(async () => {
        axios.get('http://127.0.0.1:12345/?command=gethistorydata&period=2&count=162&reset=true&HftOrNot=NotHft&page=widget')
        socketio().on("show-widget", async (data) => {
          console.log("data")
          console.log(data)
            setData(data);
            const price = {
                high: data.candles.candle.slice(-1)[0][2],
                low: data.candles.candle.slice(-1)[0][3],
                date: data.candles.candle.slice(-20)[0][0],
            };
            setPrice(price);
            const volume_filter = [];
            for (let i = 0; i < data.candles.candle.length; i++) {
                volume_filter.push([data.candles.candle[i][0], Math.floor(Math.random() * 1000000000)]);
            }
            setVolume([volume_filter]);
            const buy_price = [];
            const sell_price = [];
            let indexOfMinPrice = 100;
            
            // eslint-disable-next-line promise/always-return
            for (let j = 1 * 101; j < data.candles.candle.length; j += 100) {
                if (data.candles.candle[j][2] < data.candles.candle[indexOfMinPrice][2]) {
                    indexOfMinPrice = j;
                    sell_price.push({ x: data.candles.candle[j][0] });
                } else {
                    indexOfMinPrice = j;
                    buy_price.push({ x: data.candles.candle[j][0] });
                }
            }
            setMarker({ buy_price: buy_price, sell_price: sell_price });
            // eslint-disable-next-line no-console
            console.log('data', sell_price, buy_price, marker);
          
        })
        console.log("reach")
        
        return ()=>{
        
         socketio().off("show-widget")
       }
      }
      , [socketio()]);

    const datas = {
        name: 'SBI',
        price: '12,669.69',
        up: '5.20',
        down: '',
        percentage: '1.81',
        days: 24 * 36e5,
    };
    const options = {
        chart: {
            height: 550,
        },
        yAxis: [{
            labels: {
                align: 'left',
            },
            height: '80%',
            resize: {
                enabled: true,
            },
        }, {
            labels: {
                align: 'left',
            },
            top: '80%',
            height: '20%',
            offset: 0,
        }],
        rangeSelector: {
            buttons: [{
                type: 'minute',
                count: 30,
                text: '1m',
                dataGrouping: {
                    forced: true,
                    units: [
                        ['minute', [1]],
                    ],
                },
            }, {
                type: 'minute',
                count: 5,
                text: '5m',
                dataGrouping: {
                    forced: true,
                    units: [
                        ['minute', [1]],
                    ],
                },
            }, {
                type: 'minute',
                count: 15,
                text: '15m',
                dataGrouping: {
                    forced: true,
                    units: [
                        ['minute', [1]],
                    ],
                },
            }, {
                type: 'minute',
                count: 30,
                text: '30m',
                dataGrouping: {
                    forced: true,
                    units: [
                        ['minute', [5]],
                    ],
                },
            }, {
                type: 'hour',
                count: 1,
                text: '1h',

                // dataGrouping: {
                //   forced: true,
                //   units: [
                //     ['minute', [20]]
                //   ]
                // }
            }, {
                type: 'day',
                count: 1,
                text: '1D',

                // dataGrouping: {
                //   forced: true,
                //   units: [
                //     ['hour', [1]]
                //   ]
                // }
            }, {
                type: 'all',
                count: 1,
                text: 'All',
            }],
            selected: 1,
            inputEnabled: false,
        },
        title: {
            text: `<b>${datas.name}</b>`,
            style: {
                fontSize: '26px',
                fontWeight: '700',
            },
            useHTML: true,
        },
        subtitle: {
            text: `<b>${datas.price} <span style="color: green"> ${datas.up} (${datas.percentage}%)</span></b>`,
            align: 'left',
            fontWeight: '700',
            fontSize: '20px',
            useHTML: true,
        },
        tooltip: {
            style: {
                width: '200px',
            },
            valueDecimals: 4,
            shared: true,
        },
        scrollbar: {
            enabled: false,
        },
        navigator: {
            enabled: false,
        },
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green',
                label: {
                    borderRadius: 10,
                },
            },
        },
        series: [{
            type: 'candlestick',
            name: 'SBI',
            data: dataa,
            id: 'myId',
            tooltip: {
                valueDecimals: 2,
            },
        },
        {
            type: 'column',
            id: 'sbi-volume',
            name: 'SBI Volume',
            data: volume[0],
            yAxis: 1,
        },
        {
            type: 'flags',
            useHTML: true,
            name: 'Flags on series',
            data: marker.buy_price,
            title: '<span style="color: green">↑Buy</span>',
            onSeries: 'myId',
            shape: 'squarepin',
            color: 'transparent',
            fontSize: '18px',
        },
        {
            type: 'flags',
            useHTML: true,
            name: 'Flags on series',
            data: marker.sell_price,
            title: '<span style="color: red">↓Sell</span>',
            onSeries: 'myId',
            shape: 'squarepin',
            color: 'transparent',
            fontSize: '18px',
            y: 15,
        },
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800,
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false,
                    },
                },
            }],
        },
    };

    // State for current active Tab
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    };
    const StockTab = () => {
        return (
            <>
                <Nav className="navbar" tabs style={{ flexWrap: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', borderBottom: 'none' }}>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '1',
                            })}
                            onClick={() => { toggle('1') }}
                        >
                            Overview
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '2',
                            })}
                            onClick={() => { toggle('2') }}
                        >
                            Market depth
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '3',
                            })}
                            onClick={() => { toggle('3') }}
                        >
                            Earnings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '4',
                            })}
                            onClick={() => { toggle('4') }}
                        >
                            Notes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '5',
                            })}
                            onClick={() => { toggle('5') }}
                        >
                            New
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="tabContent" activeTab={currentActiveTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="5">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                                    <div className="main_content">
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className="main_content">
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                <div className="buySellButton">
                    <Container>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Button onClick={toggle1} color="primary" outline style={{ padding: '0.5em 3.5em' }}>
                            Sell
                            </Button>
                            <Modal isOpen={modal} toggle={toggle1}>
                                <ModalHeader
                                    toggle={toggle1}>Sell SBI Stock</ModalHeader>
                                <ModalBody>
                                Want to sell?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={toggle1}>Okay</Button>
                                    <Button color="danger" onClick={toggle1}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                            <Button onClick={toggle2} color="primary" style={{ padding: '0.5em 3.5em' }}>
                            Buy
                            </Button>
                            <Modal isOpen={modal1} toggle={toggle2}>
                                <ModalHeader
                                    toggle={toggle2}>Buy SBI Stock</ModalHeader>
                                <ModalBody>
                                Want to Buy?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={toggle2}>Okay</Button>
                                    <Button color="danger" onClick={toggle2}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </Container>
                </div>
            </>
        );
    };

    const mainContainer = {
        padding: '2em',
        margin: 'auto 0',
    };
    const content = (
        <div>
            <p>Add to WatchList</p>
        </div>
    );

    return <div style={mainContainer}>
        <div className="watchList">
            <Popover content={content} trigger="click">
                <Button>+</Button>
            </Popover>
        </div>
        <div className="mainContainer">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
            {/* <Editor /> */}
            <div>
                <StockTab />
            </div>
        </div>

    </div>;
};

export default Demo2;
