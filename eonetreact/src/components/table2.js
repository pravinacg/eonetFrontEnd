import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';  
import axios from 'axios'; 
import Modal from './model';  
import Countries from './EventSelect' 
const apiUrl = 'https://localhost:44308/api/events'; 


  
  function onRowSelect(row, isSelected, e) {
    alert('hi');
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': "' + row[prop] + '"';
    }
    
    
    console.log(e);
   // alert(`is selected: ${isSelected}, ${rowStr}`);
    }
  
class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
            isOpen: false,  
            error: null,  
            
            userData: {},  
            
             
            selectedCat:0,
            selectedValue: 'Nothing selected'  
          };  
        
    }

    isExpandableRow(row) {
       
        if (row.children) {
           
            return true;
        } else {
          
            return false;
        }
    }

    selectRowProp = {
        mode: 'checkbox',
        onSelect: onRowSelect,
        clickToSelect: true,
         
        bgColor: function(row, isSelect) {
          if (isSelect) {
            const { id } = row;
            if (id < 2) return 'blue';
            else if (id < 4) return 'red';
            else return 'yellow';
          }
          return null;
        }
        
         // give rowkeys for unselectable row
      };


    
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



    expandComponent(row) {
        return (
            <BootstrapTable data={row.children} >
                <TableHeaderColumn isKey dataField='id' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='title' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='contact.categories[0].title' dataSort={ true }>Coverage</TableHeaderColumn>
            </BootstrapTable>
        );  
    }
    render() {
        return (

            
            <BootstrapTable data={this.props.data} hover pagination search selectRow={this.selectRowProp}
            expandableRow={ this.isExpandableRow } expandComponent={ this.expandComponent }>
                <TableHeaderColumn isKey dataField='id' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='title' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='contact.categories[0].title' dataSort={ true }>
                <Button variant="info" onClick={()=>this.toggleModal('id')} >Details</Button></TableHeaderColumn>
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
            </BootstrapTable>

            



        );
    }
}
export default Table;