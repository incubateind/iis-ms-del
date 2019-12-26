import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button} from 'reactstrap'; 
import { NavLink } from 'react-router-dom';


class NavBar extends Component{
    state = {
        isNavOpen : false,
        code: localStorage.getItem('code')
    };

  toggleNav = () => {
    this.setState({
        isNavOpen: !this.state.isNavOpen
    });
  }

  logout = (e) => {   
    localStorage.clear();
    window.location.pathname = "/login"
  }
  render() {
      return(
          <React.Fragment>
            <Navbar className="navbar-light shadow" style={{backgroundColor: 'white'}} sticky={'top'}  expand="sm">
              <div className="container">
                
                <NavbarBrand className="mr-auto" href="/">
                   POLICE SURVEILLANCE
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNav} className="mr-2" style={{outline: 'none'}}/>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="ml-auto mr-auto" >
                        <NavLink className="nav-link" to="/">
                          All Cases
                        </NavLink>
                    </NavItem>
                    <NavItem className="ml-auto mr-auto" >
                        <NavLink className="nav-link" to="/add">
                          Add Case
                        </NavLink>
                    </NavItem>
                    {this.state.code === 'ADMIN' ? <NavItem className="ml-auto mr-auto">
                        <NavLink className="nav-link" to="/stationadd">
                          Add Station
                        </NavLink>
                    </NavItem> : null }
                    {localStorage.getItem('token') !== undefined ? <NavItem className="ml-auto mr-auto">
                        <Button className="ml-2" color="success" onClick={(e) => this.logout(e)}>LogOut</Button>
                       
                    </NavItem>: null}
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
             
          </React.Fragment>
      );
  }
}
export default NavBar;