import React from 'react';
import { Container, NavLink, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export function Login(props) {
	const [values, setValues] = React.useState({email: '', password: ''})
	const history = useHistory()
	
	const handleSubmit =() => {
		console.log(values)
			console.log("Validation successfull")
			axios.post(`/api/users/login/`,values)
				.then(res => {
					console.log(res.data[0]._id)
					history.push({pathname: '/dashboard/'})
					console.log(res.data[0]._id)
					props.giveAuth(true,res.data[0]._id)
				})
				.catch(err => console.log(err))
		
	}
	const handleInputChange = e => {
        const {name, value} = e.target
		setValues({...values, [name]: value})
		
	}
	React.useEffect(()=> console.log(values))


	return (
		<Container>
			<form className="m-auto" style={{maxWidth: "500px"}}>
				<h3>Sign In</h3>


				<div className="form-group">
					<label>Email address</label>
					<input type="email" name="email" onChange={handleInputChange} className="form-control" placeholder="Enter email" />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input type="password" name="password" onChange={handleInputChange} className="form-control" placeholder="Enter password" />
				</div>

				<div className="form-group">
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="customCheck1" />
						<label className="custom-control-label" htmlFor="customCheck1">
							Remember me
						</label>
					</div>
				</div>

				<NavLink type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">
					Submit
				</NavLink>
				<div className="form-group">
					<Row>
						<Col>
							<a href="/"  >Forgot password?</a> <br></br>
						</Col>
						<Col>
							<a href="/signup" className="ml-auto">Create an Account</a>
						</Col>
					</Row>
				</div>
			</form>
		</Container>
	);
}
