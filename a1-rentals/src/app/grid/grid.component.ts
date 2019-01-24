import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() columnDefs: JSON;
  @Input() rowData: JSON;
  @Input() height: number;
  @Input() width: number;

  style: any;

  constructor() {
  }

  ngOnInit() {
    this.style = 'width: ' + this.width + '; height: ' + this.height + ';';
    console.log(this.style);
    console.log('ColumnDefs: ' + this.columnDefs);
  }

}
