import React, { Component } from 'react';
import PropTypes from "prop-types";

 import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import s from "./ContactForm.module.css";

export default class ContactForm extends Component {

  static propTypes = {
  onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: ''
  } 

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  
  onSubmitContactForm = e => {
    e.preventDefault();
    
    this.props.onSubmit(this.state);

    this.reset();
  };

 onChangeContactFormName = e => {
    const { name, value } = e.target;
   if (e.target.value.match("^[a-zA-Z ]*$") != null) {
     this.setState({
       [name]: value,
     })
   }
   else {
     toast.error("Enter just letters, please");
       }
  
  };

  onChangeContactFormNumber = e => {
     const { name, value } = e.target;
     
    if (e.target.validity.valid) {
      this.setState({
        [name]: value,
      })
    }
    else {
     toast.error("Enter the correct phone number");
       }

  }


  render() {
    const { name, number } = this.state;

    return (
      <div className={s.inner}>
        <form className={s.form} onSubmit={this.onSubmitContactForm}>
          <label className={s.label}>
            Name
          <input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChangeContactFormName}
              className={s.input}
            />
          </label>
          <label className={s.label}>
            Phone
          <input
              name="number"
              type="tel"
              placeholder="Enter Phone Number"
              value={number}
              pattern="[0-9]*"
              onChange={this.onChangeContactFormNumber}
              className={s.input}
            />
          </label>
          <button type="submit" className={s.button}>Add contacts</button>
        </form>
      </div>
    );
  }
};




