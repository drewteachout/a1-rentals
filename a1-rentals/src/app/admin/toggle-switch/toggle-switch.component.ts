import {Component, Input, OnInit} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'app-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styles: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements ICellRendererAngularComp, OnInit {
    public params: any;
    private state: boolean;

    ngOnInit() {
      console.log(this.state)
    }
    agInit(params: any): void {
        this.params = params;
        this.state = this.params.data.hidden
    }

    refresh(): boolean {
        return false;
    }

    public invokeParentMethod() {
      this.params.context.componentParent.toggleHidden({row: this.params.node.rowIndex, hidden: this.state});
    }
}
