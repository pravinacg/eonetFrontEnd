import React, { Component } from 'react';
import {BootstrapTable,  TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

const selectRowProp = {
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

function onRowSelect(row, isSelected, e) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
  this.showPopup = true;
  
  console.log(e);
 // alert(`is selected: ${isSelected}, ${rowStr}`);
  }


  class BSTable extends React.Component {
    render() {
      if (this.props.data) {
        return (
          <BootstrapTable data={ this.props.data }>
            <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='title'>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='link'>
            Link
          </TableHeaderColumn>
          <TableHeaderColumn dataField='link'>
        
          </TableHeaderColumn>

          </BootstrapTable>);
      } else {
        return (<p>?</p>);
      }
    }
  }

  class ExpandRow extends React.Component {
    constructor(props) {
      super(props);
    }
  
    isExpandableRow(row) {
      if (row.id < 2) return true;
      else return false;
    }
  
    expandComponent(row) {
      return (
        <BSTable data={ row.expand } />
      );
    }
  
    render() {
      const options = {
        expandRowBgColor: 'rgb(242, 255, 163)'
      };
      return (
        <BootstrapTable data={ this.props.data }
          options={ options }
          striped
          expandableRow={ this.isExpandableRow.bind(this) }
          expandComponent={  this.expandComponent.bind(this) }
          search>
          <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }

  class Table1 extends React.Component {
  constructor(props) {
    super(props);
  }

  // togglePopup() {
  //   this.setState({
  //     showPopup: !this.state.showPopup
  //   });
  // }


  isExpandableRow(row) {
    if (row.children) {
      alert('me');
        return true;
    } else {
        return false;
    }
}
expandComponent(row) {
    return (
        <BSTable data={row.children} />
    );  
}
  
render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
        <BootstrapTable hover pagination search selectRow={this.selectRowProp}
        selectRow={ {mode: 'checkbox', clickToSelect: false, clickToExpand: true} } 
          expandableRow={ this.isExpandableRow } expandComponent={ this.expandComponent }
         data={this.props.data}>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='title'>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='link'>
            Link
          </TableHeaderColumn>
          <TableHeaderColumn dataField='link'>
        
          </TableHeaderColumn>
        
        </BootstrapTable>
        
      
      
    );
  }
}
 
export default Table1;