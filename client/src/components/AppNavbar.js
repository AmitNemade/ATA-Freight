import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="container">
        <NavbarBrand href="/">ATA FREIGHT</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
          </Nav>
          { !props.loginStatus && <NavLink href="/login">Login/Signup</NavLink>}
          { props.loginStatus && <NavLink href="/" onClick={()=>{props.giveAuth(false)}}>Logout</NavLink>}

        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;