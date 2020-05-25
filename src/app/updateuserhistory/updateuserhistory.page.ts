import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/Storage';

@Component({
	selector: 'app-updateuserhistory',
	templateUrl: './updateuserhistory.page.html',
	styleUrls: ['./updateuserhistory.page.scss'],
})
export class UpdateuserhistoryPage implements OnInit {

	userhistory_name: string = "";
	userhistory_projectId: number = 0;
	userhistory_tableId: number = 0;
	id: number;
	idUserHistory: number;
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
			this.idUserHistory = data.idUserHistory;
			console.log(data);
		});
	}

	ionViewWillEnter(){
		this.storage.get('session_storage').then((res)=>{
		  console.log(res);
		});
	}

	goBack() {
		this._location.back();
	}

	updateProcess() {
		return new Promise(resolve => {
			let body = {
				aksi: 'updateuserhistory',
				userhistory_id: this.idUserHistory,
				userhistory_name: this.userhistory_name
			};
			console.log(body);
			this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				this.router.navigate(['/project']);
				console.log('OK');
			});

		});

	}

	async requiredFields(){
		const toast = await this.toastCtrl.create({
			message: 'Los campos deben estar rellenados.',
			duration: 3000
		  });
		toast.present();
	  }

}
