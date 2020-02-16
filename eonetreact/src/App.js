import React, {Component} from 'react';
import Events from './components/contacts';
import Table1 from './components/table'
import Table from './components/table2'
class App extends Component {
    // render() {
    //     return (
    //         <Events contacts={this.state.events} />
    //     )
    // }
    // render() {
    //     return (
    //       <div className="App">
    //         <p className="Table-header">Basic Table</p>
    //         <Table data={this.state.events}/>
    //       </div>
    //     );
    //   }
    // state = {
    //     events: []
        
    // };

    
    
    componentDidMount() {
        fetch('https://localhost:44308/api/events',{
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }})
        .then(results => results.json())
            .then((data) => {
               this.setState({ events: data })
            })
            .catch(console.log)
    }
}

export default App;
