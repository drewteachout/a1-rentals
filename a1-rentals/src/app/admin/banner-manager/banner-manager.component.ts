import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Banner } from 'src/app/util/Banner';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-banner-manager',
  templateUrl: './banner-manager.component.html',
  styleUrls: ['./banner-manager.component.css']
})
export class BannerManagerComponent implements OnInit {

  activeBanners: any[] = [];
  newBanner: any = {title: '', message: '', color: '', start_date: '',  end_date: ''};
  constructor(private db: AngularFirestore, private modalService: ModalService) {
    // console.log(this.newBanner.start_date.toLocaleDateString());
    this.db.collection('/banners').valueChanges().subscribe((banners: {}[]) => {
      console.log(banners);
      this.activeBanners = banners;
    });
  }

  ngOnInit() {
  }

  addNewBanner() {
    console.log(this.newBanner);
    const b = new Banner(
      this.newBanner.title,
      this.newBanner.message,
      this.newBanner.color,
      new Date(this.newBanner.start_date),
      new Date(this.newBanner.end_date));
    this.closeModal('createBannerModal');
    this.db.collection('/banners').doc(this.db.createId()).set({
      title: b.title,
      message: b.message,
      color: b.color,
      start_date: b.start_date,
      end_date: b.end_date
    });
  }

  clearNewBanner() {
    this.newBanner = new Banner('', '', '', new Date(), new Date());
  }

  switchDropdown(className: string, i: number, $event: MouseEvent) {
    $event.stopPropagation();
    const selected = document.getElementById(className + i).classList;
    if (selected.contains('is-active')) {
      selected.remove('is-active');
    } else {
      const activeDropdowns = document.getElementsByClassName('is-active');
      for (let j = 0; j < activeDropdowns.length; j++) {
        const currentElement = activeDropdowns.item(j);
        if (currentElement.id.includes(className)) {
          currentElement.classList.remove('is-active');
        }
      }
      selected.add('is-active');
    }
  }

  editBanner() {
    console.log('you are viewing the console...');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
