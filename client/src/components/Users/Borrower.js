import React from 'react'
import { Button, Container, Row, Col, Table, FormGroup, Form, Label, Input } from 'reactstrap'
import axios from'axios'

export default function Borrower(props) {
    var date = new Date();
var timestamp = date.getTime();
    const userId = props.userid
    const [values, setValues] = React.useState({bid: userId, lId: '-', amount: '', time: 'now', duration: '', eRate: '', status: 'pending'})
	const [allRequests, setAllRequest] = React.useState([])
    const handleSubmit =() => {
		console.log(values)
		axios.post(`/api/req/new/`,values)
			.then(res => {
				
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}

	const handleInputChange = e => {
        const {name, value} = e.target
		setValues({...values, [name]: value})
	}    

	const getLoanRequests = () => {
        axios.get(`/api/req/id/${userId}`)
        .then( (res) => { 
            // console.log(res.data)
            setAllRequest(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
	}
	
	React.useEffect(()=> {
		let timer1 = setTimeout(() => {
			getLoanRequests()
		}, 1500)

		// this will clear Timeout when component unmount like in willComponentUnmount
		return () => {
		  clearTimeout(timer1)
		}
    })
	
	const getAllLoanRequestRows = (items) =>{
        if(!items)
            return "No Requests Made"
        else{
            return allRequests.map( (ele) => (
                <tr key={ele._id}>
                    <td>{ ele._id }</td>
                    <td>{ele.bId }</td>
                    <td>{ele.lId }</td>
                    <td>{ ele.amount }</td>
                    <td>{ ele.time }</td>
                    <td>{ ele.duration}</td>
                    <td>{ ele.eRate }</td>
                    <td>{ ele.status }</td>
                </tr>
            ))
        }
    }
    
    return (
        <div>
            <h1>Borrower</h1>
			<Container>
				<Row className="mb-5">
					<Col>
						<h4>Create a Request</h4>
						<Form inline className="justify-content-between" >
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label>Amount</Label>
								<Input type="text" name="amount" onChange={handleInputChange} className="form-control" placeholder="Enter Amount" />
							</FormGroup>

							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label>Duration<br></br><span style={{fontSize: "14px"}}> (in months, ex. 10)</span></Label>
								<Input type="text" name="duration" onChange={handleInputChange} className="form-control" placeholder="Enter Duration in months(ex 2)" />
							</FormGroup>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label>Expected Rate of Interest</Label>
								<Input type="text" name="eRate" onChange={handleInputChange} className="form-control" placeholder="Enter expected Rate Of Interest" />
							</FormGroup>

							<Button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2 ml-auto mb-2 mr-sm-2 mb-sm-0">
								Submit
							</Button>
						</Form>	
					</Col>
				</Row>
				<Row>
					<Col >
						<p>All Past Request Made by you</p>
						<Table striped style={{overflowX: 'scroll', backgroundColor: "black", color: 'white'}}>
							<thead>
								<tr>
									<th>#_id</th>
									<th>Borrowers ID</th>
									<th>Lenders ID</th>
									<th>Amount</th>
									<th>Time</th>
									<th>Duration</th>
									<th>Expected Rate</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>    
								{
									getAllLoanRequestRows(allRequests)
								}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>

        </div>
    )
}
