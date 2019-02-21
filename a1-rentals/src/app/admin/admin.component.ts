import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  entryComponents: [ToggleSwitchComponent]
})
export class AdminComponent implements OnInit {

  public gridOptions: GridOptions;
  currentSelection: any;
  private getNodeChildDetails;
  hidden: boolean = false;
  columnDefs = [
    {headerName: 'Product name', field: 'name', width: 200},
    {headerName: 'Hidden',
      field: 'hidden',
      cellRendererFramework: ToggleSwitchComponent,
      editable: true,
      colId: 'toggle',
      width: 200,
      cellClass: 'toggle-class'
    }
  ];
  products: any[] = [];
  rowData: any[] = [];
  constructor(private db: AngularFirestore) {
    this.db.collection('/products').valueChanges().subscribe((productNames: any[]) => {
      productNames.forEach(element => {
        this.products.push({
          name: element['display_name'],
          db_name: element['collection_name'],
          hidden: element['hidden'],
          orderNum: element['display_order']});
      });
    });
    this.gridOptions = <GridOptions>{
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      context: {
          componentParent: this
      }
    };
    this.getNodeChildDetails = function getNodeChildDetails(rowItem) {
      console.log(rowItem);
      if (rowItem.products) {
        console.log(rowItem.products);
        return {
          group: true,
          expanded: false,
          children: rowItem.products,
          key: rowItem.name
        };
      } else {
        console.log('No Products found in group');
        return null;
      }
    };
  }

  ngOnInit() {
  }

  valueChanged() {
    console.log(this.currentSelection);
    this.db.collection('/' + this.currentSelection.db_name).valueChanges().subscribe((productSubGroups: any[]) => {
      const newRowData = [];
      if (productSubGroups.length > 0 && productSubGroups[0].hasOwnProperty('array')) {
        console.log('Subgroups found');
        productSubGroups.forEach(productSubGroup => {
          console.log(productSubGroup);
          this.db.collection('/' + this.currentSelection.db_name)
          .doc(productSubGroup['name'].replace('/', '-'))
          .collection(productSubGroup['name'].replace('/', '-')).valueChanges().subscribe((products) => {
            newRowData.push({
              name: productSubGroup['name'],
              hidden: productSubGroup['hidden'],
              products: products
            });
            console.log(newRowData);
          });
        });
      } else {
        console.log('Only products here');
        newRowData.push( {
          name: this.currentSelection.name,
          products: productSubGroups
        });
        console.log(newRowData);
      }
      this.rowData = newRowData;
    });
    this.db.collection('/products').doc(this.currentSelection.db_name).valueChanges().subscribe((docObject) => {
      this.hidden = docObject['hidden'];
    });
  }

  public toggleHidden(cell) {
    this.db.collection('/' + this.currentSelection.db_name)
    .doc(this.rowData[cell.row].name.replace('/', '-'))
    .update({hidden: cell.hidden});
  }

  exposeSubTab() {
    if(this.currentSelection !== undefined) {
      this.db.collection('/products').doc(this.currentSelection.db_name).update({hidden: this.hidden});
    }
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
    console.log(this.rowData)
  }

}
