import React from 'react'
import axios from'axios'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';

export default function Lender(props) {
    // const ModalExample = (props) => {
    const {
      buttonLabel,
      className
    } = props;
    
    const [modal, setModal] = React.useState(false);
    
    const toggle = () => setModal(!modal);

    const userId = props.userid;
    // const initialValues = {reqId:'', bid: userId, lId: '-', amount: '', time: 'now', duration: '', eRate: '', status: 'pending'}
    const [values, setValues] = React.useState({})
    const [payment,setPayment] = React.useState(false)
    const [allRequests, setAllRequest] = React.useState([])
    const [allTrxns, setAllTrxns] = React.useState([])

    const getLoanRequests = () => {
        axios.get(`/api/req/all`)
        .then( (res) => { 
            // console.log(res.data)
            setAllRequest(res.data.filter(ele => {return ele.status == 'pending'}))
            console.log(values)
        })
        .catch(err => {console.log(err)})
    }
    
    const handleLendButton =(ele) => {
        setPayment(false)
        toggle()
        console.log('BID: ', ele._id)
        setValues({...values,
                "reqId": ele._id,
                "bid": ele.bId,
                "lid": userId,
                "amount": ele.amount,       
                "time": ele.time,
                "duration": ele.duration,
                "eRate": ele.eRate,
                'status': 'active',

            })
            if(payment){
                updateLoanRequest(values)
            }
            else{
                console.log("Payment Cancelled")
            }

    }

    const updateLoanRequest = (ele) =>{
        console.log(ele)
        axios.post(`/api/req/update/`, ele)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
	
	React.useEffect(
        () => {
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
        // console.log(items)
        if(items.length == 0)
            {
                return <tr><td>No Requests Made</td></tr>}
        else{
            return items.map( (ele) => (
                <tr key={ele._id}>
                    <td scope="row">{ ele._id }</td>
                    <td>{ele.bId }</td>
                    <td>{ele.lId }</td>
                    <td>{ ele.amount }</td>
                    <td>{ ele.time }</td>
                    <td>{ ele.duration}</td>
                    <td>{ ele.eRate }</td>
                    <td>{ ele.status }</td>
                    <td>{ <Button onClick={()=>handleLendButton(ele)}>Lend</Button> }</td>
                    
                </tr>
            ))
        }
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

    const getAllTrxnsRows = (items) =>{
        if(items.length == 0)
            return <tr><td>No Data</td></tr>
        else{
            return items.map( (ele) => (
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
            <h1>Lender {userId}</h1>
            <h4>See all loan Requests</h4>
            <Row style={{overflowX:'scroll', padding:'20px'}}>
                <Table striped>
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
                            <th>Lend him</th>
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
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Are You SUre You Want to Lend him Money.<br></br>
                    By clicking on <strong>PAY</strong> button, your amount will be deducted from your bank.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        setPayment(true)
                        toggle()
                    }}>Pay</Button>{' '}
                    <Button color="secondary" onClick={() => {
                        setPayment(false)
                        toggle()
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
 
        </div>
    )
}
