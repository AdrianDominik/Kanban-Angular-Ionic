import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Storage } from '@ionic/Storage';

@Component({
	selector: 'app-addtable',
	templateUrl: './addtable.page.html',
	styleUrls: ['./addtable.page.scss'],
})
export class AddtablePage implements OnInit {

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
		console.log(data);
	  });
	}

	ionViewWillEnter(){
		this.storage.get('session_storage').then((res)=>{
		  console.log(res);
		});
	}

	addProcess() {
		return new Promise(resolve => {
				let body = {
					aksi: 'addtable',
					name_table: this.name_table,
					project_id: this.project_id
				};
				console.log(this.id);
				this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				this.router.navigate([this.goBack()]);
			});	
				
		});

	}

	goBack() {
		this._location.back();
	}

	async requiredFields(){
		const toast = await this.toastCtrl.create({
			message: 'Los campos deben estar rellenados.',
			duration: 3000
		  });
		toast.present();
	  }

}
