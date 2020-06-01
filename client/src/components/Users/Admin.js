import React from 'react'
import axios from 'axios'
import { Table, Row } from 'reactstrap'

export default function Admin(props) {

    const [allRequests, setAllRequest] = React.useState([])
    const [allTrxns, setAllTrxns] = React.useState([])
    const userId = props.userid
    // const userId = "5ec148e29b94c6113082c093"

    const getLoanRequests = () => {
        axios.get(`/api/req/id/${userId}`)
        .then( (res) => { 
            // console.log(res.data)
            setAllRequest(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
    }

    const getTrxns = () => {
        axios.get(`/api/trxns/all/${userId}`)
        .then( (res) => { 
            // console.log(res.data)
            setAllTrxns(res.data)
            // console.log(allUsers)
        })
        .catch(err => {console.log(err)})
    }

    React.useEffect(()=> {
        let timer1 = setTimeout(() => {
            getLoanRequests()
            getTrxns()
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
        <div>
            <h1>Admin</h1>
            <h5>All Request</h5>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped hover>
                    <thead style={{backgroundColor: "black", color: 'white'}}>
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
            </Row>
            <h5>All Transactions</h5>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped>
                    <thead style={{backgroundColor: "black", color: 'white'}}>
                        <tr>
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
        </div>
    )
}
