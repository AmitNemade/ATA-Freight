import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios';
import Admin from './Users/Admin'
import Borrower from './Users/Borrower'
import Lender from './Users/Lender'
import {NoMatch} from './NoMatch'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Container, Row, Col, Input } from 'reactstrap';

function Dashboard(props) {
    const location = useLocation();
    const userId = props.userId;
    // const userId = "5ec148e29b94c6113082c093"
    // const userId = "5ec176a5a687580e2ccdf544"


    const history = useHistory();
    const [userDetails, setUserDetails] = React.useState('')
    const [admin, setAdmin] = React.useState(true)
    const [lender, setLender] = React.useState(false)
    const [borrower, setBorrower] = React.useState(false)

    const getUserDetails = () =>{
        axios.get(`/api/users/id/${location.userid}`)
        .then(res=> {
            // console.log(res.data)
            setUserDetails(res.data)    
        })
    }

    React.useEffect(()=>
        getUserDetails
        
    )

    const handleDropDown = (e) => {
        console.log(e.currentTarget.textContent)
        if(e.currentTarget.textContent === 'Admin'){
            setAdmin(true)
            setBorrower(false)
            setLender(false)
        }
        else if(e.currentTarget.textContent === 'Lender'){
            setAdmin(false)    
            setBorrower(false)
            setLender(true)
        }
        else{
            setAdmin(false)
            setBorrower(true)
            setLender(false)
        }
    }


    return (
        <Container>
          {
            console.log("reached dashboard")
          }
          <Row className="justify-content-between">
            <Col>
              <h1>DashBoard</h1>
            </Col>
            <Col className="align-items-center">
              <p style={{textAlign:"right"}}><strong>UserID:</strong> { userId }</p>
            </Col>
          </Row>
          <Row>
            <Col xs='3'>
              <UncontrolledDropdown>
                <DropdownToggle nav caret>
                  Select Role
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={handleDropDown}>
                    Borrower
                  </DropdownItem>
                  <DropdownItem onClick={handleDropDown}>
                    Lender
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleDropDown}>
                    Admin
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          { admin && <Admin userid = {userId} /> }
          { lender && <Lender userid = {userId} /> }
          { borrower && <Borrower userid = {userId}/> }
        </Container>
    )
}

export default Dashboard
