import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users:''
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.fillUsers = this.fillUsers.bind(this);
    this.fillTBody = this.fillTBody.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }

  async fetchUsers(){
    const myPromise = Promise.resolve(fetch('https://jsonplaceholder.typicode.com/users'));
    const response = await myPromise;
    const json = await response.json();
    return json;
  }

  async fillUsers(){
    const obj = await this.fetchUsers();
    this.setState({users:obj});
  }

  fillTable(){
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.fillTBody((item,index) => {
              return (
              <tr key={index}>
                <td>{item[1].id}</td>
                <td>{item[1].name}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  }

  fillTBody(fn){
    return Object.entries(this.state.users).map((item,index) => fn(item,index));
  }

  render(){
    return this.fillTable()
  }

  componentDidMount(){
    this.fillUsers();
  }
}

export default App