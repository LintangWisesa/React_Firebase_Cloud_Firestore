import React from 'react';
import fire from "./fire";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      allData: []
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addData = e => {
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

  getData = () => {
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
    db.collection('member').orderBy('name', 'asc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        // console.log(doc.data().name + doc.data().age);
        console.log(doc.data());
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      this.setState({allData: wholeData})
      console.log(this.state.allData)
    })
    .catch(error => {
      console.log('Error!', error);
    })
  }
  
  render() {
    
    var listOfData = this.state.allData.map((val, i)=>{
      var name = val.name
      var age = val.age
      return (
        <li key={i}>{name} ({age})</li>
      ) 
    })

    return (
      <div style={{margin:'30px'}}>
        <form onSubmit={this.addData}>
          <input
            type="text"
            name="name"
            placeholder="Input your name..."
            onChange={this.updateInput}
            value={this.state.name}
          />
          <br/>
          <input
            type="number"
            name="age"
            placeholder="Input your age..."
            onChange={this.updateInput}
            value={this.state.age}
          />
          <br/>
          <button type="submit">Submit</button>
        </form>

        <button onClick={this.getData}>
          Get Data
        </button>

        <ul>{listOfData}</ul>

      </div>
      );
    }
   }

export default App;