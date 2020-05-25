import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/Storage';

@Component({
	selector: 'app-updatetable',
	templateUrl: './updatetable.page.html',
	styleUrls: ['./updatetable.page.scss'],
})
export class UpdatetablePage implements OnInit {

	name_table: string = "";
	project_id: number;
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
		this.actRoute.params.subscribe((data: any) =>{
		this.project_id = data.id;
		this.id = data.idTable;
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
				aksi: 'updatetable',
				table_id: this.id,
				name_table: this.name_table,
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
