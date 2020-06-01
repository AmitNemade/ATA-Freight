import React, { useEffect } from 'react'
import { Table, Container, Row } from 'reactstrap';
import axios from 'axios';

export function Home() {
    const [allUsers, setAllUsers] = React.useState([])
    const [allRequests, setAllRequest] = React.useState([])
    const [allTrxns, setAllTrxns] = React.useState([])

    const getUserDetails = () => {
        axios.get(`/api/users/`)
        .then( (res) => { 
            // console.log(res.data)
            setAllUsers(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
    }
    const getLoanRequests = () => {
        axios.get(`/api/req/all`)
        .then( (res) => { 
            // console.log(res.data)
            setAllRequest(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
    }

    const getTrxns = () => {
        axios.get(`/api/trxns/`)
        .then( (res) => { 
            // console.log(res.data)
            setAllTrxns(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
    }

    useEffect(()=> {
        let timer1 = setTimeout(() => {
            getUserDetails()
            getLoanRequests()
            getTrxns()
		}, 1500)

		// this will clear Timeout when component unmount like in willComponentUnmount
		return () => {
		  clearTimeout(timer1)
		}
    })


    const getAllUsersRows = (items) =>{
        if(!items)
            return
        else{
            return allUsers.map( (ele) => (
                <tr key={ele._id}>
                    <td scope="row">{ ele._id }</td>
                    <td>{ele.fname }</td>
                    <td>{ ele.lname }</td>
                    <td>{ ele.email }</td>
                    <td>{ ele.password}</td>
                    <td>{ ele.phone }</td>
                    <td>{ ele.uidai }</td>
                </tr>
            ))
        }
    }
    const getAllLoanRequestRows = (items) =>{
        if(!items)
            return
        else{
            return allRequests.map( (ele) => (
                <tr key={ele._id}>
                    <td scope="row">{ ele._id }</td>
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
    const getAllTrxnsRows = (items) =>{
        if(!items)
            return
        else{
            return allTrxns.map( (ele) => (
                <tr key={ele._id}>
                    <td scope="row">{ ele._id }</td>
                    <td>{ele.reqId }</td>
                    <td>{ele.lId }</td>
                    <td>{ele.bId }</td>
                    <td>{ ele.amount }</td>
                    <td>{ ele.time }</td>
                </tr>
            ))
        }
    }


    return (
        <Container>
            <h1>HOME</h1>  
            <h1>All Users</h1>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor: "black", color: 'white'}}>
                            <th>#_id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone no.</th>
                            <th>UIDAI no.</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            getAllUsersRows(allUsers)
                        }
                    </tbody>
                </Table>
            </Row>
            <h1>All Request</h1>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor: "black", color: 'white'}}>
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
            </Row>
            <h1>All Transactions</h1>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor: "black", color: 'white'}}>
                            <th>#_id</th>
                            <th>Request ID</th>
                            <th>Borrowers ID</th>
                            <th>Lenders ID</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            getAllTrxnsRows(allTrxns)
                        }
                    </tbody>
                </Table>

            </Row>
          
        </Container>
    )
}
