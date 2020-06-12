import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/Storage';

@Component({
	selector: 'app-adduserhistory',
	templateUrl: './adduserhistory.page.html',
	styleUrls: ['./adduserhistory.page.scss'],
})
export class AdduserhistoryPage implements OnInit {

	userhistory_name: string = "";
	userhistory_projectId: number = 0;
	userhistory_tableId: number = 0;
	userhistory_color: string = "";
	id: number;
	constructor(
		private postPvdr: PostProvider,
		private router: Router,
		private actRoute: ActivatedRoute,
		public toastCtrl: ToastController,
		private _location: Location,
		private storage: Storage
	) { }

	ngOnInit() {
		this.actRoute.params.subscribe((data: any) => {
			this.userhistory_projectId = data.id;
			console.log(data);
		});
	}

	ionViewWillEnter() {
		this.storage.get('session_storage').then((res) => {
			console.log(res);
		});
	}

	addProcess() {
		return new Promise(resolve => {
			let body = {
				aksi: 'adduserhistory',
				userhistory_name: this.userhistory_name,
				userhistory_color: this.userhistory_color,
				userhistory_projectId: this.userhistory_projectId,
				userhistory_tableId: this.userhistory_tableId
			};
			console.log(body);
			this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				this.creatingToast();
				this.router.navigate([this.goBack()]);
			});

		});

	}

	goBack() {
		this._location.back();
	}

	async requiredFields() {
		const toast = await this.toastCtrl.create({
			message: 'Los campos deben estar rellenados.',
			duration: 3000
		});
		toast.present();
	}

	async creatingToast() {
		const toast = await this.toastCtrl.create({
			message: 'Creando historia...',
			duration: 1000
		});
		toast.present();
	}

}
