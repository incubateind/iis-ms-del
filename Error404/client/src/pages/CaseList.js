import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from '../constants/axios';
import Loading from '../components/Loader/Loading'
import {Container, Button, Row,Label,Col, Input} from 'reactstrap'
import {
	Table,
	TableRow,
	TableHeader,
	TableData,
} from './../components/TableComponents'

export default class CasesList extends Component {

	state ={
		data: [],
		dataStatus: true
	}

	handleSelectChange = (e) =>{
		const val = e.target.value
		console.log(val)
		if (val === "Unsolved") {
			var temp = [];
			var temp1 = [];
			for(let i of this.state.data){
				if(i.status === 0){
					temp.push(i);
				}else{
					temp1.push(i)
				}
				
			}
			temp = temp.concat(temp1)
			console.log(temp)
			this.setState({
				data: temp
			})
		} else if (val === "Solved") {
			var temp2 = [];
			var temp3 = [];
			for(let i of this.state.data){
				if(i.status === 0){
					temp2.push(i);
				}else{
					temp3.push(i)
				}
			}
			temp3 = temp3.concat(temp2)
			this.setState({
				data: temp3
			})
		} else if (val === "Recently Added") {
			const temp = this.state.data;
			temp.sort((a, b) => a.added < b.added);
			console.log(temp)
			this.setState({
				data: temp
			});
		}
	}


	setSolved = (e, code, id) => {
		// console.log(code)
		// console.log(id)
		e.preventDefault();
		axios.post('personfound',{
			stationcode: code,
			id: id
		})
		.then((res) => {
			alert(`Updated status of case no. ${id}`)
			window.location.pathname = "/"
		})
		.catch((err) => alert(`Failed to update status of case no. ${id}`))
	}


	componentDidMount(){
		
		const code = localStorage.getItem('code')
		if(code === 'ADMIN'){
			axios.get('getrecords')
			.then((res) => {
				if(res.data.data.length === 0){
					window.location.pathname = "/add"
				}
				const tempArr = []
				console.log(res)
				for(let i of res.data.data){
					const values = Object.values(i)
					if(values.length !== 0){
						for(let j of values){
							tempArr.push(j)
						}
					}
					
				}
				this.setState({
					data: tempArr
				})

				for(let i of this.state.data){
					
					if(typeof(i.seen) === 'object'){
						localStorage.setItem(i.id,i.seen.length)
					}
					else{
						localStorage.setItem(i.id,0)
					}
				}

			})
			.catch((err) => console.log(err.response) )
		}
		else {
			axios.post('getstatus',{
				stationcode: code
				
			})
			.then((res) => {
				console.log(res)
				if(res.data.data.length === 0){
					window.location.pathname = "/add"
				}
				this.setState({
					data: res.data.data
				})
				// console.log(this.state.data)
				
				for(let i of this.state.data){
					
					if(typeof(i.seen) === 'object'){
						localStorage.setItem(i.id,i.seen.length)
					}
					else{
						localStorage.setItem(i.id,0)
					}
				}
			
				// console.log('hello')
			})
			.catch((err) => console.log(err.response) )
		}
	  this.makeNotification = setInterval(this.taskRunner, 30000)
	}

	 taskRunner() {
		var notificationData = []
		if(localStorage.getItem('code') !== 'ADMIN'){
			axios.post('getstatus',{
				stationcode: localStorage.getItem('code')
			})
			.then((res) =>{
				notificationData = res.data.data
				for(let i of notificationData){
					// console.log('in forloop')
					const seenCount = typeof(i.seen) === 'object' ? i.seen.length.toString() : '0'
					if(localStorage.getItem(i.id) !== undefined && seenCount !== localStorage.getItem(i.id)){
						alert('There is a update in ' + i.id)	
						localStorage.setItem(i.id, seenCount)
						window.location.pathname = `/case/${localStorage.getItem('code')}/${i.id}`
					}
				}
			})
		}else{
			axios.get('getrecords')
			.then((res) =>{
				const tempArr = []
				// console.log(res)
				for(let i of res.data.data){
					const values = Object.values(i)
					if(values.length !== 0){
						for(let j of values){
							tempArr.push(j)
						}
					}
				}
				for(let i of tempArr){
					const seenCount = typeof(i.seen) === 'object' ? i.seen.length.toString() : '0'
					if(localStorage.getItem(i.id) !== undefined && seenCount !== localStorage.getItem(i.id)){
						alert('There is a update in ' + i.id)
						localStorage.setItem(i.id, seenCount)
					}
				}

			})
			.catch((err) => console.log(err.response))

			}
		}
	componentWillUnmount(){
		clearInterval(this.makeNotification)
	}
  render() {
		const code = localStorage.getItem('code')
		if(this.state.data.length === 0){
			return (
				<div style={{display: 'flex', justifyContent: 'center', height:'92vh', backgroundColor: 'black'}}>
					<Loading />
				</div>
			)
		}
		else{
    return (
			code === 'ADMIN' ? <div >
				<>
				<Container className="mt-5">
				<Row>
				
					<Label for="filter" md={1}>Filter</Label>
          <Col xs={3}>
          <Input type="select" name="filter" id="filter" value={this.state.day} onChange={(e) => this.handleSelectChange(e) }>
            <option value="" hidden>Select</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
           
          </Input>
          </Col>
				
					<div className="ml-auto mb-2 mt-2">
					<Link to="/add">
						<Button color="danger">Add</Button>
					</Link>
					</div>
				</Row>
        <Row style={{ overflowX: "auto" }}>
							<Table>
								<tbody key="1">
									<TableRow>
										<TableHeader>ID</TableHeader>
										<TableHeader>Photo</TableHeader>
										<TableHeader>Name</TableHeader>
										<TableHeader>Description</TableHeader>
										<TableHeader>Status</TableHeader>
										<TableHeader>Last Location</TableHeader>
										<TableHeader>Actions</TableHeader>
										
									</TableRow>
								</tbody> 
								  {this.state.data.map((record) => {
										const st = record.status === 0 ? 'Not Found' : 'Found'
										const desc = record.desc.length > 30 ? record.desc.substring(0,30) + "..." : record.desc
										const lastseen = typeof(record.seen) === 'object' ? record.seen[record.seen.length -1] : '---'
										// console.log(typeof(record.seen))
										const color = record.status === 1 ? "green" : "red"
									return (
										<tbody key={record.id}>
											<TableRow>
												<TableData>{record.id} </TableData>
												<TableData>
													{/* <img src={require('./../Constants/logo512.png')} width="100" height="100" alt="testImage"/> */}
													<img src={`https://storage.googleapis.com/fir-76656.appspot.com/${record.img}`} width="100" height="100" alt={record.name}/>													
												</TableData>
												<TableData>{record.name}</TableData>
												<TableData>{desc}</TableData>
												<TableData bgcolor={color}> {st}</TableData>
												<TableData>{lastseen}</TableData>
												<TableData>
												<Link to={`/case/${record.stationcode}/${record.id}`} >
														<Button color="info">View</Button>
													</Link>
													{record.status === 0 ?<Button color="success" className="ml-1" onClick={(e) => this.setSolved(e, record.stationcode, record.id)}>Solved</Button> : null}
												</TableData>
											</TableRow>
										</tbody>
									)
								})}
													
							</Table>
						</Row>
						
			</Container>

				</>
			</div> :
			<>
			<div>
				
		<Container className="mt-5">
				<Row>
				
					<Label for="filter" md={1}>Filter</Label>
          <Col xs={3}>
          <Input type="select" name="filter" id="filter" value={this.state.day} onChange={(e) => this.handleSelectChange(e) }>
            <option value="" hidden>Select</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
           
          </Input>
          </Col>
				
					<div className="ml-auto mb-2 mt-2">
					<Link to="/add">
						<Button color="danger">Add</Button>
					</Link>
					</div>
				</Row>
        <Row style={{ overflowX: "auto" }}>
							<Table>
								<tbody key="1">
									<TableRow>
										<TableHeader>ID</TableHeader>
										<TableHeader>Photo</TableHeader>
										<TableHeader>Name</TableHeader>
										<TableHeader>Description</TableHeader>
										<TableHeader>Status</TableHeader>
										<TableHeader>Last Location</TableHeader>
										<TableHeader>Actions</TableHeader>
										
									</TableRow>
								</tbody> 
								  {this.state.data.map((record) => {
										const st = record.status === 0 ? 'Not Found' : 'Found'
										const desc = record.desc.length > 30 ? record.desc.substring(0,30) + "..." : record.desc
										const lastseen = typeof(record.seen) === 'object' ? record.seen[record.seen.length -1] : '---'
										// console.log(typeof(record.seen))
										const color = record.status === 1 ? "green" : "red"
									return (
										<tbody key={record.id}>
											<TableRow>
												<TableData>{record.id} </TableData>
												<TableData>
													{/* <img src={require('./../Constants/logo512.png')} width="100" height="100" alt="testImage"/> */}
													<img src={`https://storage.googleapis.com/fir-76656.appspot.com/${record.img}`} width="100" height="100" alt={record.name} />													
												</TableData>
												<TableData>{record.name}</TableData>
												<TableData>{desc}</TableData>
												<TableData bgcolor={color}> {st}</TableData>
												<TableData>{lastseen}</TableData>
												<TableData>
													<Link to={`/case/${record.stationcode}/${record.id}`} >
														<Button color="info">View</Button>
													</Link>
													{record.status === 0 ? <Button color="success" className="ml-1" onClick={(e) => this.setSolved(e, record.stationcode, record.id)}>Solved</Button> : null}
												</TableData>
											</TableRow>
										</tbody>
									)
								})}
													
							</Table>
						</Row>
						
			</Container>

			
			</div>
			
			</>
		)
	}
  }
}
