import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class projectPage implements OnInit {
  
  anggota: any;
  username: string;
  projects: any = [];
  limit: number = 13; // LIMIT GET PERDATA
  start: number = 0;
  user_id = sessionStorage.getItem("user_id");
  
  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.username = this.anggota.username;
      sessionStorage.setItem('user_id', this.anggota.user_id);
      this.user_id = this.anggota.user_id;
      console.log(res);
    });

  	this.projects = [];
  	this.start = 0;
  	this.loadproject();
  }

  addproject(){
  	this.router.navigate(['/addproject']);
  }

  updateproject(id,name){
  	this.router.navigate(['/addproject/' + id + '/' + name]);
  }

  showproject(id,name){
  	this.router.navigate(['/showproject/' + id + '/' + name]);
  }

  doRefresh(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  loadData(event:any){
  	this.start += this.limit;
  	setTimeout(() =>{
  	this.loadproject().then(()=>{
  		event.target.complete();
  	});
  	}, 500);
  }
  

  delproject(id){

  	let body = {
  			aksi : 'delete',
  			project_id : id
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			this.ionViewWillEnter();
  		});

  }

  loadproject(){
  	return new Promise(resolve => {
  		let body = {
  			aksi : 'getdata',
  			limit : this.limit,
        start : this.start,
        created_by: this.user_id
  		};
      console.log(this.user_id);
  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			for(let project of data.result){
  				this.projects.push(project);
  			}
  			resolve(true);
  		});
  	});
  }
  

  async processLogout(){
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'Sesión Finalizada.',
        duration: 3000
      });
    toast.present();
  }

  async confirmDelete(id) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      message: '¿Seguro que quieres borrar el proyecto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Borrar proyecto',
          handler: () => {
            this.delproject(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Desconexión',
      message: '¿Seguro que quieres desconectarte?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Desconectar',
          handler: () => {
            this.processLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  

}
