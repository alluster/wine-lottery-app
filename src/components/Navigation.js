import React, { Component } from 'react';
import '../styles/css/bootstrap.css';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, } from "react-bootstrap";
import '../styles/custom.css'
class Navigation extends Component {

  render() {
    const { login } = this.props
    const logoMargin = { marginTop: "5px" }
    
    return (
      <div>
        <Navbar staticTop collapseOnSelect transparent bsStyle="transparent">
          <Navbar.Header>
             <Navbar.Brand>
               <h2>Wine Lottery App</h2>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight>
              <NavItem>
                <h5>
                  <NavDropdown title="More information" eventKey={1} href="#">
                    <MenuItem eventKey="4.1"></MenuItem>
                  
                  </NavDropdown>
                </h5>
              </NavItem>
              <NavItem>
                <span className="small"><h5><strong>Register to the app</strong></h5></span>
              </NavItem>
              <NavItem>

                <button className="btn btn-primary btn-sm">Sign in</button>

              </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}
export default Navigation;

