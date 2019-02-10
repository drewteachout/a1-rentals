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
  hidden: boolean = false;
  columnDefs = [
    {headerName: 'Product name', field: 'name', width: 200},
    {headerName: 'Hidden',
      field: 'hidden',
      cellRendererFramework: ToggleSwitchComponent, 
      editable: true,
      colId: 'toggle',
      width: 200
    }
  ];
  products: any[] = []
  rowData: any[] = []
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
      rowData: this.products,
      columnDefs: this.columnDefs,
      context: {
          componentParent: this
      }
    };
  }

  ngOnInit() {
  }

  valueChanged() {
    console.log(this.currentSelection);
    this.db.collection('/' + this.currentSelection.db_name).valueChanges().subscribe((productNames: any[]) => {
      let newRowData = []
      productNames.forEach(element => {
        if(element.hasOwnProperty('hidden')) {
          newRowData.push({
            name: element['name'],
            hidden: element['hidden']
          });
        }
      });
      this.rowData = newRowData;
    });
    this.db.collection('/products').doc(this.currentSelection.db_name).valueChanges().subscribe((docObject) => {
      this.hidden = docObject['hidden'];
    });
  }

  public toggleHidden(cell) {
    this.db.collection('/' + this.currentSelection.db_name).doc(this.rowData[cell.row].name.replace('/', '-')).update({hidden: cell.hidden});
  }

  exposeSubTab() {
    if(this.currentSelection != undefined) {
      this.db.collection('/products').doc(this.currentSelection.db_name).update({hidden: this.hidden});
    }
  }

}
