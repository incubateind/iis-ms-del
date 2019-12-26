import React, { Component } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle,ListGroupItem, Button } from 'reactstrap'
import axios1 from '../constants/axios'
import axios from 'axios'
import Loading from '../components/Loader/Loading'
export default class CaseView extends Component {

  state = {
    loading: true,
    img: '',
    description: '',
    name: '',
    mark: '',
    status: '',
    lastSeen: [],
    mapImage: '',
    latArray: [],
    longArray: [],
    toShow: [],
    markers: [],
    link: ''
  }

  
  async componentWillMount(){
    
    await axios1.post('caseid',{
      stationcode: this.props.match.params.stcode,
      id: this.props.match.params.id
    })
    .then((res) => {
      console.log(res.data.data)
      this.setState({
        lastSeen: res.data.data.seen,
        img: res.data.data.img,
        description: res.data.data.desc,
        mark: res.data.data.mark,
        name: res.data.data.name,
        status: res.data.data.status,
        longArray: res.data.data.longitude,
        latArray: res.data.data.latitude,
        loading: false
      })
      
  
    })
    .catch((err) => {
      this.setState({
        loading: true
      })
    })
    
    var i;
    var str;
    var toShow=[];
    for(i=0; i<this.state.latArray.length; i++){
      str += this.state.latArray[i] + ',' + this.state.longArray[i] + '|';
      console.log('hello')
      await axios({
        url: `https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/nearby/json?keywords=Police$station&refLocation=${this.state.latArray[i]},${this.state.longArray[i]}`,
        method: 'get',
        headers:{
          "Authorization": "bearer bdb3e45c-956a-4f4f-9c15-986fc31c1df5"
        }
      })
      .then(res => {
        console.log(res.data.suggestedLocations[0])
        toShow[i] = 'Last seen on ' + this.state.lastSeen[i] + ' --> Nearest Police Station ' + res.data.suggestedLocations[0].placeName + ' ' + res.data.suggestedLocations[0].placeAddress; 
      })
      .catch(err => console.log(err))
    }
    
    this.setState({
      toShow: toShow,
      markers: str,
      
    })
    this.setState({
      link : `https://apis.mapmyindia.com/advancedmaps/v1/p1fn6bcki6qsknc7shxfuozkuvn4qgbs/still_image?center=28.1234,77.22556114196777&zoom=9&size=1200x900&ssf=1&markers=${this.state.markers}`
    })
  }
 
  
  
  render() {
    const ltSeen = 
      
        <div>
              {this.state.toShow.map((val, i) => {
                return(
                  <div key={i}>
                    <ListGroupItem color="success" className="mb-1">{i+1}. {val}</ListGroupItem>
                  </div>
                )
              })}
            </div> 
      
    
    const st = this.state.status ? 'Found' : 'Not Found'
    if(this.state.loading){
      return (
        <div style={{display: 'flex', justifyContent: 'center', height:'92vh', backgroundColor: 'black'}}>
					<Loading />
				</div>
      )
    }
    else {
    return (
      <>
      
      <div>
        <Container className="mt-5">
          <Row>
          <Col md="5">
            <Card className="shadow" style={{borderRadius: '10px'}}>
              <CardBody>
                <CardTitle><b>CaseId: </b>{this.props.match.params.id}</CardTitle>
              </CardBody>
                <CardImg top src={`https://storage.googleapis.com/fir-76656.appspot.com/${this.state.img}`} alt={this.state.name} height="350"/>
                <CardBody className="justify-center">
                <CardText><b>Name: </b>{this.state.name}</CardText>
                <CardText><b>Status: </b>{st}</CardText>
                <CardText><b>Description: </b>{this.state.description}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <>
            <h4>Last Seen : </h4>
            {ltSeen}
            </>
            <Button className="bg-info" ><a href={this.state.link} target="_blank" rel="noopener noreferrer" >View</a></Button>
          </Col>
          </Row>
        </Container>
         
      </div>
      </>
    )
    }
  }
}
