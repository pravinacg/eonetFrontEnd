import React, { Component } from 'react';  
import Modal from './model';  
import Select from 'react-select'
import Countries from './EventSelect'
import axios from 'axios';  
import { Table,Button } from 'react-bootstrap';  
const apiUrl = 'https://localhost:44308/api/events'; 

let categories = [ ];

class App extends Component {  
  constructor(props) {  
    super(props);  
  
    this.state = {  
      isOpen: false,  
      error: null,  
      users: [],  
      userData: {},  
      response: {},
      evcategories:{}, 
      selectedCat:0,
      selectedValue: 'Nothing selected'  
    };  
  }  
  
  componentDidMount () {
    // Promise.all([this.getEventData(), this.getCategories()])
    //     .then(([product_detail, comments])  => {
    //         this.setState({
    //           users,
    //           categories
    //         });
    //     });
    this.getEventData();
    this.getCategories();
 
}



getEventData () {
  axios.get("https://localhost:44308/api/events").then(response => response.data).then(  
         (result)=>{  
             this.setState({  
                 users:result  
             });  
         },  
         (error)=>{  
             this.setState({error});  
         }  
     )  
}

getCategories () {
  axios.get("https://localhost:44308/api/events/EventCategories")
  .then(res => {
     
      let arr = [];
      Object.keys(res.data).forEach(key => arr.push({name: key.id, value: key.value}));
      alert(arr[0].id);
      let names = res.data.map(p => p.id);
    
      this.setState({
        evcategories: res
      })
    })
  // axios.get("https://localhost:44308/api/events/EventCategories").then(response => response.data).then(  
  //        (result)=>{ 
         
  //            this.setState({  
  //             evcategories:result
             
  //            });  
  //        },  
  //        (error)=>{  
  //         alert('hi'); 
  //            this.setState({error});  
  //        }  
  //    ) 
     

}

Search (id) {
  this.state.users=[];
  axios.get(apiUrl + "/FilterEvents?status=open&category="+this.state.selectedValue).then(response => response.data).then(  
         (result)=>{  
             this.setState({  
                 users:result  
             });  
         },  
         (error)=>{  
             this.setState({error});  
         }  
     )  
}

Sort() {  
  axios.get(apiUrl + "/getEventDetails?EventID=").then(response => response.data).then(result => {  
    this.setState({  
    userData: result
   });  
    },  
    (error) => {  
      this.setState({ error });  
    }  
    )  

    this.setState({  
    isOpen: !this.state.isOpen  
    });  
    //alert(this.state.userData);
    console.log(this.state.selectedCat);
}   

  
  toggleModal(id) {  
         axios.get(apiUrl + "/getEventDetails?EventID="+id).then(response => response.data).then(result => {  
         this.setState({  
          userData: result
         
         });  
       },  
       (error) => {  
         this.setState({ error });  
       }  
     )  
  
     this.setState({  
      isOpen: !this.state.isOpen  
    });  
   //alert(this.state.userData);
  console.log(this.state.selectedCat);
  }  
  
  handleSelectChange = (selectedValue) =>{
    this.setState({
      selectedValue: selectedValue
    });
   
  }

  render() {  
    const{users}=this.state;  
    return ( 
    <div className="App">
  <div className="row">Event Details</div>  
  <div className="row">
  <div className="col-md-3"></div> 
  <div className="col-sm-4">Status :<select><option>Open</option><option>Closed</option></select></div>
  <div className="col-sm-4">Catgory<Countries  onSelectChange={this.handleSelectChange}  selectedTeam={this.state.selectedValue}></Countries></div>
  </div>
  <div className="row">
  <div className="col-md-3"></div> 
  <div className="col-sm-4"></div>
  <div className="col-sm-4"><Button variant="info" onClick={()=>this.Search()} >Search</Button></div>
  
  </div>
       
  <div>  
        <div className="row"> 
        <div className="col-md-3"></div> 
         <div className="col-md-6">  
        <Table className="table">  
                    <thead className="btn-primary">  
                      <tr>  
                        <th>id</th>                       
                        <th>Title</th>  
                        <th>Link</th>  
                        <th sortable-column="Catagory" onClick={()=>this.sort()} >Categories</th>
                        <th>closed</th>  
                      </tr>  
                    </thead>  
                    <tbody>  
                      {users.map(user => (  
                        <tr key={user.id}>  
                          <td>{user.id}</td>  
                       
                          <td>{user.title}</td>  
                          <td>{user.link}</td>  
                          <td>{user.closed}</td>
                          <td><Button variant="info" onClick={()=>this.toggleModal(user.id)} >Details</Button>       
                          
                          </td>  
                        </tr>  
                      ))}  
                    </tbody>  
                  </Table>  
</div>  
<div className="col-md-3"></div>  
</div>  
      
                  </div>  
        <Modal show={this.state.isOpen}  
          onClose={()=>this.toggleModal(this.id)}>  
          <Table className="table">  
            <thead>  
              <tr className="btn-primary"><th colSpan="2">
              Event Details</th></tr>  
            </thead>  
            <tbody>  
  
              <tr>  
                <th>Title</th><td>{this.state.userData.title}</td>  
              </tr> 
              <tr>
                <th>Link</th><td>{this.state.userData.link}</td>  
              </tr>
              <tr>
                <th>Categories</th><td> <Countries selectedTeam={this.state.userData.categories}></Countries></td>  
              </tr>
              <tr>  
                <th>Source </th><td>{this.state.userData.link}</td>  
              </tr>
              <tr>  
                <th>Gemoatery </th><td>{this.state.userData.link}</td>  
              </tr> 
              
            </tbody>  
          </Table>  
                 
        </Modal>  
      </div>  
    );  
  }  
}  
  
export default App;