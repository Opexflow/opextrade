import React, { Component, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import axios from 'axios';
import { ArrowUpOutlined  } from '@ant-design/icons';
import classnames from 'classnames';
import { Popover } from 'antd';
import {
    TabContent, TabPane, Nav,
    NavItem, NavLink, Row, Col, Container, Button, Modal, ModalHeader,ModalBody, ModalFooter
} from 'reactstrap';
  
  
  
  const Demo2 = () => {

    const [data, setData] = useState([])
    const [price, setPrice] = useState({})
    // Modal open state
    const [modal, setModal] = React.useState(false);
    const [modal1, setModal1] = React.useState(false);
  
    // Toggle for Modal
    const toggle1 = () => setModal(!modal);
    const toggle2 = () => setModal1(!modal1);

      useEffect(() => {
        axios.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json').then((data) => {
            setData(data.data)
            let price = {
                high: data.data.slice(-1)[0][2],
                low: data.data.slice(-1)[0][3]
            }
            setPrice(price)
        }) 
      }, [])

      const datas = {
          name: 'SBI',
          price: '12,669.69',
          up: '5.20',
          down: '',
          percentage: '1.81'
      }
      

      const options = {
          chart:{
              height: 550
          },
        rangeSelector: {
            buttons: [{
                type: 'minute',
                count: 10,
                text: '1m',
                dataGrouping: {
                  forced: true,
                  units: [
                    ['minute', [1]]
                  ]
                }
            },{
                type: 'minute',
                count: 50,
                text: '5m',
                dataGrouping: {
                  forced: true,
                  units: [
                    ['minute', [5]]
                  ]
                }
            },{
                type: 'minute',
                count: 100,
                text: '15m',
                dataGrouping: {
                  forced: true,
                  units: [
                    ['minute', [10]]
                  ]
                }
            },{
                type: 'hour',
                count: 1,
                text: '1h',
                // dataGrouping: {
                //   forced: true,
                //   units: [
                //     ['minute', [1]]
                //   ]
                // }
            }, {
                type: 'day',
                count: 1,
                text: '1D',
                // dataGrouping: {
                //   forced: true,
                //   units: [
                //     ['minute', [20]]
                //   ]
                // }
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },
        title: {
          text: `<b>${datas.name}</b>`,
          style: {
            "fontSize": "26px",                  
            "fontWeight": '700'
          },
          useHTML: true
        },
        subtitle: {
            text: `<b>${datas.price} <span style="color: green"> ${datas.up} (${datas.percentage}%)</span></b>`,
            align: "left",
            "fontWeight": '700',
            "fontSize": "20px",
            useHTML: true
        },
        
        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green',
                label: {
                    borderRadius: 10
                }
            }
        },
        series: [{
          type: 'candlestick',
          name: 'SBI',
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      }
      // State for current active Tab
        const [currentActiveTab, setCurrentActiveTab] = useState('1');
    
        // Toggle active state for Tab
        const toggle = tab => {
            if (currentActiveTab !== tab) setCurrentActiveTab(tab);
        }
      const StockTab = () => {
          return(
              <>
                <Nav className='navbar' tabs style={{flexWrap: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', borderBottom: 'none'}}>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '1'
                            })}
                            onClick={() => { toggle('1'); }}
                        >
                            Overview
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '2'
                            })}
                            onClick={() => { toggle('2'); }}
                        >
                            Market depth
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '3'
                            })}
                            onClick={() => { toggle('3'); }}
                        >
                            Earnings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '4'
                            })}
                            onClick={() => { toggle('4'); }}
                        >
                            Notes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active:
                                    currentActiveTab === '5'
                            })}
                            onClick={() => { toggle('5'); }}
                        >
                            New
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='tabContent' activeTab={currentActiveTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className='main_content'>
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
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className='main_content'>
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
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className='main_content'>
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
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className='main_content'>
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
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>Ask</label>
                                        <h5>569.65 * 2</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Bid</label>
                                        <h5>569.41 * 2</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold'}}>
                                    <div className='main_content'>
                                        <label>High</label>
                                        <h5>{price.high}</h5>
                                    </div>
                                    <div className='main_content'>
                                        <label>Low</label>
                                        <h5>{price.low}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                <div className='buySellButton'>
                <Container>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Button onClick={toggle1} color="primary" outline style={{padding: '0.5em 3.5em'}}>
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
                        <Button onClick={toggle2} color="primary" style={{padding: '0.5em 3.5em'}}>
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
          )
      }
    
      const mainContainer = {
          'padding': '2em',
          'margin': 'auto 0'
      }
      const content = (
            <div>
            <p>Add to WatchList</p>
        </div>
      )

  return <div style={mainContainer}>
    <div className='watchList'>
        <Popover content={content} trigger="click">
            <Button>+</Button>
        </Popover>
    </div>
    <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
    />
    <StockTab />
    
  </div>
}

export default Demo2
