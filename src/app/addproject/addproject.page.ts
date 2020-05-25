import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';

@Component({
	selector: 'app-addproject',
	templateUrl: './addproject.page.html',
	styleUrls: ['./addproject.page.scss'],
})
export class addprojectPage implements OnInit {

	anggota: any;
	username: string;
	created_by: number;

	projects: any = [];
	limit: number = 13; // LIMIT GET PERDATA
	start: number = 0;

	name_project: string = "";
	desc_project: string = "";
	user_id: number = 0;
	id: number;
	constructor(
		private postPvdr: PostProvider,
		private router: Router,
		private actRoute: ActivatedRoute,
		public toastCtrl: ToastController,
		private storage: Storage
	) { }

	ngOnInit() {
		this.actRoute.params.subscribe((data: any) => {
			this.id = data.id;
			this.name_project = data.name;
			this.desc_project = data.desc;
			console.log(data);
			//let user_id = sessionStorage.getItem('user_id');
			//console.log({user_id});
		});
	}

	addProcess() {
		return new Promise(resolve => {
			let body = {
				aksi: 'add',
				name_project: this.name_project,
				created_by: this.user_id
			};
			console.log(body);
			this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				this.router.navigate(['/project']);
			});

		});

	}

	updateProcess() {
		return new Promise(resolve => {
			let body = {
				aksi: 'update',
				project_id: this.id,
				name_project: this.name_project
			};

			this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				this.router.navigate(['/project']);
				console.log('OK');
			});

		});

	}

	async requiredFields() {
		const toast = await this.toastCtrl.create({
			message: 'Los campos deben estar rellenados.',
			duration: 3000
		});
		toast.present();
	}

	ionViewWillEnter() {
		this.storage.get('session_storage').then((res) => {
			this.anggota = res;
			this.username = this.anggota.username;
			this.user_id = this.anggota.user_id;
		});

		this.projects = [];
		this.start = 0;
		this.loadproject();
	}

	loadData(event: any) {
		this.start += this.limit;
		setTimeout(() => {
			this.loadproject().then(() => {
				event.target.complete();
			});
		}, 500);
	}

	loadproject() {
		return new Promise(resolve => {
			let body = {
				aksi: 'getdata',
				limit: this.limit,
				start: this.start,
				created_by: this.user_id
			};

			this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
				for (let project of data.result) {
					this.projects.push(project);
				}
				resolve(true);
			});
		});
	}

}
