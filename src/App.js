import React from 'react';
import fire from "./fire";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     name: '',
     age: ''
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addUser = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('member').add({
      name: this.state.name,
      age: this.state.age
    });
    this.setState({
      name: '',
      age: ''
    });
  };
  render() {
    return (
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="name"
            placeholder="Input your name..."
            onChange={this.updateInput}
            value={this.state.name}
          />
          <input
            type="number"
            name="age"
            placeholder="Input your age..."
            onChange={this.updateInput}
            value={this.state.age}
          />
          <button type="submit">Submit</button>
        </form>
        );
      }
   }

export default App;