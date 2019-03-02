﻿import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../services/modal.service';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        //console.log(this);
        this.modalService.add(this);
        //console.log(this.modalService);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        const element = document.getElementById(this.id);
        //console.log((<HTMLElement>element.childNodes[0]).classList.add('is-active'));
    }

    // close modal
    close(): void {
        const element = document.getElementById(this.id);
        //console.log((<HTMLElement>element.childNodes[0]).classList.remove('is-active'));
    }
}