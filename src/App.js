import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateUpdateEmp from './CreateUpdateEmp';
import Employees from './Employees';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = {
      employees: []
    }
  }

  componentDidMount() { 
    // This app runs with the Employee2020 Java/Spring Boot server
    this.getEmployees() 
  }

  getEmployees = async () => {
    try {
      let response = await axios.get('/api/employees')
      this.setState({ employees: response.data })
      console.log(response.data)
    }
    catch (err) {
      console.log('error occured')
      console.log(err)
    }
  }

  deleteEmployee = async (id) => {
    try {
      let response = await axios.delete(`/api/employees/${id}`)
      this.getEmployees()
      console.log(response)
    }
    catch (err) {
      console.log('error occured')
      console.log(err)
    }
  }

  updateEmployee = async (employee, id) => {
    console.log('update')
    try {
      let response = await axios.put(`/api/employees/${id}`, employee)
      console.log(response)
      this.getEmployees()
    } catch (err) {
      console.log('failed update')
    }
  }

  addNewEmployee = async (employee) => {
    console.log('create')
    try {
      let response = await axios.post(`http://localhost:8080/company/api/v1/employees/`, employee)
      console.log(response)
      this.getEmployees()
    } catch (err) {
      console.log('failed create')
    }
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' render={() => <Employees 
                                                    employees={this.state.employees} 
                                                    deleteEmployee={this.deleteEmployee}/>} />
            <Route path='/employees' render={() => <CreateUpdateEmp 
                                                      updateEmployee={this.updateEmployee}
                                                      addNewEmployee={this.addNewEmployee}/>} />
          </Switch>
        </Router>
      </>
     );
  }
}

export default App;
