import React from 'react';
import { Container, Alert } from 'reactstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export function Signup(props) {

	const [values, setValues] = React.useState({fname:'', lname:'',uidai:'', phone:'', email: '', password: ''})
	const [showAlert, setShowAlert] = React.useState(false)

	const history = useHistory()

	const handleSubmit = () => {
		if(handleValidation()){
		console.log(values)
		axios.post(`/api/users/new/`,values)
			.then(res => {
				props.giveAuth(true,res.data[0]._id)
				history.push({pathname: '/dashboard/'})
				console.log(res.data[0])
			})
			.catch(err => console.log(err))
			}
		else{
			console.log("Validation Failed")
			setShowAlert(true)
		}
	}
	const handleValidation = () => {
		console.log("I m Validator")
		return true
	}


	  

	const handleInputChange = e => {
        const {name, value} = e.target
		setValues({...values, [name]: value})
		
	}
	React.useEffect(() => {console.log(values, showAlert)})

	return (
		<Container>
			<form className="m-auto" style={{maxWidth: "500px"}}>
				<h3>Sign Up</h3>
				{  
					showAlert && 						 
						<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
							<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
							<p>
							Change this and that and try again. Duis mollis, est non commodo
							luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
							Cras mattis consectetur purus sit amet fermentum.
							</p>
						</Alert>		
				}
				<div className="form-group">
					<label>First name</label>
					<input type="text" name="fname" onChange={handleInputChange} className="form-control" placeholder="First name" />
				</div>

				<div className="form-group">
					<label>Last name</label>
					<input type="text" name="lname" onChange={handleInputChange} className="form-control" placeholder="Last name" />
				</div>
				<div className="form-group">
					<label>UIDAI no.</label>
					<input type="text" name="uidai" onChange={handleInputChange} className="form-control" placeholder="Enter email" />
				</div>

				<div className="form-group">
					<label>Phone no.</label>
					<input type="text" name="phone" onChange={handleInputChange} className="form-control" placeholder="Enter email" />
				</div>

				<div className="form-group">
					<label>Email address</label>
					<input type="email" name="email" onChange={handleInputChange} className="form-control" placeholder="Enter email" />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input type="password" name="password" onChange={handleInputChange} className="form-control" placeholder="Enter password" />
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input type="password" name="cpassword" onChange={handleInputChange} className="form-control" placeholder="Enter password" />
				</div>

				<button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">
					Sign Up
				</button>
				<p className="forgot-password text-right">
					Already registered <a href="/login">sign in?</a>
				</p>
			</form>
		</Container>
	);
}
