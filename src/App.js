import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

import {ToastContainer, toast} from 'react-toastify';


class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
   

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = data => {
    const { contacts } = this.state;

    if (contacts.find(({ name }) => name === data.name)) {
      toast.error(`Oh. no! ${data.name} is already exist in phonebook`);
      return;
    }
      
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: uuidv4(),
            name: data.name,
            number: data.number,
          },
        ],
      };
    });
  };

  handleFilter = filter => {
    this.setState({
      filter,
    });
  };

  handleDelete = idData => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== idData),
      };
    });
  };

  filteredContacts () {
    const { contacts, filter } = this.state;

    return contacts.filter(data =>
      data.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

componentDidMount() {

    const contacts = localStorage.getItem('Contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('Contacts', JSON.stringify(nextContacts));
    }
  }

  render() {
    const { filter } = this.state;
    
    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2 className="title">Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.handleFilter} />

        <ContactList data={this.filteredContacts()} onDeleteButton={this.handleDelete} />

        <ToastContainer autoClose={3000} />
      </div>

    );
  }
}

export default App;
