import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends React.Component {
    constructor(props) {
        super(props);
        
    }
    isExpandableRow(row) {
       
        if (row.children) {
           
            return true;
        } else {
          
            return false;
        }
    }
    expandComponent(row) {
        return (
            <BootstrapTable data={row.children} >
                <TableHeaderColumn isKey dataField='id' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='title' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='contact.categories[0].title' dataSort={ true }>Coverage</TableHeaderColumn>
            </BootstrapTable>
        );  
    }
    render() {
        return (
            <BootstrapTable data={this.props.data} hover pagination search
            expandableRow={ this.isExpandableRow } expandComponent={ this.expandComponent }>
                <TableHeaderColumn isKey dataField='id' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='title' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='link' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='contact.categories[0].title' dataSort={ true }>Coverage</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
export default Table;