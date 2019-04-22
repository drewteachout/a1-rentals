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
    this.db.collection('/banners').valueChanges().subscribe((banners: any[]) => {
      this.activeBanners = banners;
    });
  }

  ngOnInit() {
  }

  addNewBanner() {
    if (this.newBanner.db_name === undefined) {
      this.newBanner.db_name = this.db.createId();
    }
    const b = new Banner(
      this.newBanner.title,
      this.newBanner.message,
      this.newBanner.color,
      new Date(this.newBanner.start_date),
      new Date(this.newBanner.end_date),
      this.newBanner.db_name);
    console.log(b);
    this.closeModal('createBannerModal');
    this.db.collection('/banners').doc(b.db_name).set({
      title: b.title,
      message: b.message,
      color: b.color,
      start_date: b.startDateToTimestamp(),
      end_date: b.endDateToTimestamp(),
      db_name: b.db_name
    });
    this.clearNewBanner();
  }

  clearNewBanner() {
    this.newBanner = new Banner('', '', '', new Date(), new Date(), '');
  }

  editBanner(banner: any) {
    const start = banner.start_date.toDate().toLocaleDateString().split('/');
    const end = banner.end_date.toDate().toLocaleDateString().split('/');
    let start_date = ''
    let end_date = ''
    const start_month = Number(start[0]) < 10 ? '0' + start[0] : start[0];
    const start_day = Number(start[1]) < 10 ? '0' + start[1] : start[1];
    const end_month = Number(end[0]) < 10 ? '0' + end[0] : end[0];
    const end_day = Number(end[1]) < 10 ? '0' + end[1] : end[1];
    start_date = start[2] + '-' + start_month + '-' + start_day;
    end_date = end[2] + '-' + end_month + '-' + end_day;
    console.log(start_date, end_date);
    this.newBanner = new Banner(
      banner.title,
      banner.message,
      banner.color,
      start_date as any,
      end_date as any,
      banner.db_name);
    this.openModal('createBannerModal')
    console.log(banner.end_date.toDate().toISOString().split('T')[0]);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteBanner(banner: any) {
    this.db.collection('banners').doc(banner.db_name).delete();
  }

}
