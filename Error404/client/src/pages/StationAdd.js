import React, { Component } from 'react'
import {Container, Row, Form, Label, Col,Button } from 'reactstrap'
import axios from './../constants/axios'
export default class StationAdd extends Component {

  state ={
    email: '',
    stationcode: '',
    type: 'user',
    password: '',
    stations: []
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(!this.state.email || !this.state.stationcode || !this.state.password){
      alert('Please fill all the required fields')
    }
    else if(this.state.stationcode.length > 3 || this.state.stationcode.length < 3){
      alert('Please fill 3 characters as station code')
    }

    else{
      axios.post('addstation',
        this.state
      )
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          window.location.pathname = "/"
        }, 1000)
      })
      .catch((err) => {
        console.log(err.response)
        alert('Can Not Add Right Now')
       
      })
    }
  }

  render() {
    
    return (
      <Container className="mt-5">
        <div style={{width: '100%', textAlign: 'center'}} className="mt-2 mb-3" ><span>Fields marked with <span style={{color: 'red'}}>&#42;</span> are mandatory</span></div>
        <Form>
          <Row className="form-input">
            <Col md="3">
            <Label for="stationcode">Station Code<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <input  className="form-control" type="textfileld" name="stationcode" id="stationcode" value={this.state.stationcode} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          
          <br/>
          <Row className="form-input">
            <Col md="3">
            <Label for="email">Email<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <input className="form-control" type="textfileld" name="email" id="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          <br/>
          <Row className="form-input">
            <Col md="3">
            <Label for="password">Password<span style={{color: 'red'}}>&#42;</span> : </Label>
            </Col>
            <Col md="9">
            <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={(e) => this.handleInputChange(e)} required/>
            </Col >
          </Row>
          <br />
          <div style={{textAlign: 'center'}} >
            <Button className="bg-info" onClick={(e) => this.handleSubmit(e)}>Add Station</Button>
          </div>
        </Form>
        
      </Container>
    )
  }
}
