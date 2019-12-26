import React, { Component } from 'react'
import { Container, Row, Form, Label, Col, Button } from 'reactstrap'
import axios1 from '../constants/axios.js'
import axios from 'axios';
import APITOKEN from '../constants/token';

export default class CaseAdd extends Component {

  state = {
    localcode: localStorage.getItem('code'),
    code: localStorage.getItem('code'),
    name: '',
    description: '',
    file: {},
    mark: '',
    type: '',
    imageUploadProgress: '0',
    stations: [],
    addStatus: false,
    addSuccess: false,
    filledStatus: false,
    imgSrc: '',
    latitude: '0.0000',
    longitude: '0.0000',
    location: '',
  }
  handleInputChange = (e) => {
    this.setState({
      status: ''
    })
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    const formData = new FormData()
    this.setState({
      filledStatus: false,
      addSuccess: false,
      addStatus: false
    })

    e.preventDefault()
    if (!this.state.file || !this.state.code || !this.state.name || !this.state.description || !this.state.mark) {
      this.setState({
        filledStatus: true
      })
    }
    else {

      await axios({
        url: `https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/geocode?address=${this.state.location}',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                https://atlas.mapmyindia.com/api/places/geocode?address=${this.state.location}`,
        method: "GET",
        headers: {
          "Authorization": "bearer bdb3e45c-956a-4f4f-9c15-986fc31c1df5"
        },
        withCredentials: false
      })  
        .then((res) => {  
          console.log(res.data.copResults.latitude)
          

          this.setState({
            latitude: res.data.copResults.latitude,
            longitude: res.data.copResults.longitude
          })
          console.log(res)

        })
        .catch(e => console.log(e))
      await formData.append('file', this.state.file)
      await formData.append('stationcode', this.state.code)
      await formData.append('name', this.state.name)
      await formData.append('desc', this.state.description)
      await formData.append('mark', this.state.mark)
      await formData.append('location', this.state.location)
      await formData.append('added', new Date())
      await formData.append('latitude', this.state.latitude)
      await formData.append('longitude', this.state.longitude)
      await axios1.post('upload',
        formData,
        {
          onUploadProgress: (p) => this.setState({ imageUploadProgress: (Math.floor((p.loaded / this.state.file.size) * 100)) })
        }
      )
        .then((res) => {
          this.setState({
            addStatus: true,
            addSuccess: true
          })
          console.log(res)



          setTimeout(() => {
            window.location.pathname = "/"
          }, 1000)
        })
        .catch((err) => {
          this.setState({
            imageUploadProgress: '',
            addStatus: true,
            addSuccess: false
          })
          console.log(err)


        })

    }

  }

  componentWillMount() {
    if (localStorage.getItem('code') === 'ADMIN') {
      this.setState({
        code: ''
      })
      axios1.get('getstation')
        .then(res => {
          console.log(res)
          const st = res.data.data;
          st.shift()
          console.log(st)
          this.setState({
            stations: st
          })
        })
        .catch(err => console.log(err.response))
    }
  }
  handleUploadPhoto = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }


  render() {

    return (
      <>

        <Container className="mt-3 mb-2" style={{ width: "60%" }}>
          {this.state.addStatus === true && this.state.addSuccess === true ? <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Addded Successfully</h4>
          </div> :
            this.state.addStatus === true && this.state.addSuccess === false ? <div class="alert alert-warning" role="alert">
              <h4 class="alert-heading">Some Thing Went Wrong</h4>
            </div> :
              this.state.filledStatus === true ? <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Please fill all the required fields</h4>
              </div> : null}
          <div style={{ width: '100%', textAlign: 'center' }} className="mt-2 mb-3" ><span>Fields marked with <span style={{ color: 'red' }}>&#42;</span> are mandatory</span></div>
          <Form>

            {this.state.localcode !== 'ADMIN' ? <Row className="form-input">
              <Col md="3">
                <Label for="code">Station Code<span style={{ color: 'red' }}>&#42;</span> : </Label>
              </Col>
              <Col md="9">
                <input style={{ backgroundColor: "grey", fontWeight: '1000' }} className="form-control" type="textfileld" name="code" id="code" value={this.state.localcode} disabled />
              </Col >
            </Row>
              :
              <Row className="form-input">
                <Col md="3">
                  <Label for="code">Station Code<span style={{ color: 'red' }}>&#42;</span> : </Label>
                </Col>
                <Col md="9">
                  <select className="form-control" name="code" id="code" onChange={(e) => this.handleInputChange(e)}>
                    <option value="" hidden>Select</option>
                    {this.state.stations.map((val, i) => {
                      return (
                        <option value={val} key={i}>{val}</option>
                      )
                    })}
                  </select>
                </Col >
              </Row>
            }
            <br />
            <Row className="form-input">
              <Col md="3">
                <Label for="name">Name<span style={{ color: 'red' }}>&#42;</span> : </Label>
              </Col>
              <Col md="9">
                <input className="form-control" type="textfileld" name="name" id="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} required />
              </Col >
            </Row>
            <br />
            <Row className="form-input">
              <Col md="3">
                <Label for="type">Type: </Label>
              </Col>
              <Col md="9">
                <select className="form-control" name="type" id="type" onChange={(e) => this.handleInputChange(e)}>
                  <option value="" hidden>Select</option>

                  <option value="criminal">Criminal</option>
                  <option value="missing">Missing</option>

                </select>
              </Col >
            </Row>
            <br />
            <Row className="form-input">
              <Col md="3">
                <Label for="description">Description<span style={{ color: 'red' }}>&#42;</span> : </Label>
              </Col>
              <Col md="9">
                <textarea className="form-control" rows="3" name="description" id="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} required />
              </Col >
            </Row>
            <br />
            <Row className="form-input">
              <Col md="3">
                <Label for="mark">Identification Mark<span style={{ color: 'red' }}>&#42;</span> :</Label>
              </Col>
              <Col md="9">
                <input className="form-control" type="textfileld" name="mark" id="mark" value={this.state.mark} onChange={(e) => this.handleInputChange(e)} required />
              </Col >
            </Row>
            <br />
            <Row className="form-input">
              <Col md="3">
                <Label for="location">Location<span style={{ color: 'red' }}>&#42;</span> :</Label>
              </Col>
              <Col md="9">
                <input className="form-control" type="textfileld" name="location" id="location" value={this.state.location} onChange={(e) => this.handleInputChange(e)} required />
              </Col >
            </Row>
            <br />

            <Row className="form-input">
              <>
                <Col md="3">
                  <Label for="file">Upload Photo<span style={{ color: 'red' }}>&#42;</span></Label>
                </Col>
                <Col md="9">
                  <input type="file" name="file" id="file" onChange={(e) => this.handleUploadPhoto(e)} required />
                  <br />
                  <span>Uploaded: {this.state.imageUploadProgress}% </span>

                </Col >
              </>
            </Row>
            <br />
            <div style={{ textAlign: 'center' }} >
              <Button className="bg-info" onClick={(e) => this.handleSubmit(e)}>Add Case</Button>
            </div>
          </Form>

        </Container>
      </>
    )
  }
}
