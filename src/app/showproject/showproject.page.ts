import { Component, OnInit, Input } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-showproject',
  templateUrl: './showproject.page.html',
  styleUrls: ['./showproject.page.scss'],
})

export class ShowprojectPage implements OnInit {

  userhistory_name: string = "";
	userhistory_tableId: number = 0;
  name_table: string;
  name_project: string;
  desc_project: string;
  created_at: string;
  id: number;
  tables: any = [];
  tablesId: any = [];
  historys: any = [];
  historysOnTables: any = [];
  anggota: any;
  username: string;
  project_id: number;
  userhistory_projectId: number;
  tableId1: string = "";

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    private storage: Storage

  ) { }

  toProjects(){
    this.router.navigate(['/project']);
  }

  addTable(id,name){
    this.router.navigate(['showproject/' + id + '/' + name + '/addtable']);
  }

  addUserHistory(id,name){
    this.router.navigate(['showproject/' + id + '/' + name + '/adduserhistory']);
  }

  updateTable(idProject,nameProject,idTable,nameTable){
  	this.router.navigate(['showproject/' + idProject + '/' + nameProject + '/updatetable/' + idTable + '/' + nameTable]);
  }

  updateUserHistory(idProject,nameProject,idUserHistory,nameUserHistory){
    this.router.navigate(['showproject/' + idProject + '/' + nameProject + '/updateuserhistory/' + idUserHistory + '/' + nameUserHistory]);
  }

  ngOnInit() {
  	this.actRoute.params.subscribe((data: any) =>{
  		this.id = data.id;
      this.name_project = data.name;
      console.log(data);
    });
    
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      console.log(res);
    });

    this.tables = [];
    this.historys = [];
    this.loadTable();
    this.loadUserhistory();
    this.loadDataUserHistoryOnTables();
  }

  loadTable(){
  	return new Promise(resolve => {
  		let body = {
  			aksi : 'getdatatable',
        project_id : this.id
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			for(let table of data.result){
  				this.tables.push(table);
        }
        
        for (let index = 0; index < this.tables.length; index++) {
          this.tableId1 += parseInt(this.tables[index].table_id) + ",";
          
        }
        this.tableId1 = this.tableId1.slice(0, -1);

  			resolve(true);
  		});
  	});
  }


  loadUserhistory(){
  	return new Promise(resolve => {
  		let body = {
  			aksi : 'getdatauserhistory',
        userhistory_projectId : this.id,
        userhistory_tableId: this.userhistory_tableId
  		};
      console.log(body);
  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			for(let userhistory of data.result){
  				this.historys.push(userhistory);
        }
        console.log(this.historys)
  			resolve(true);
  		});
  	});
  }

  loadDataUserHistoryOnTables(){
  	setTimeout(() =>{
  	this.loadUserHistoryOnTables().then(()=>{
  	});
  	}, 500);
  }

  loadUserHistoryOnTables(){
  	return new Promise(resolve => {
  		let body = {
  			aksi : 'getdatauserhistoryontables',
        userhistory_projectId : this.id,
        userhistory_tableId : this.tableId1
  		};
      console.log(body);
  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			for(let userhistoryontable of data.result){
  				this.historys.push(userhistoryontable);
        }
        console.log(this.historysOnTables)
  			resolve(true);
  		});
  	});
  }

  doRefresh(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  doRefreshAfterUpdate(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  	}, 500);
  }

  delTable(id){

  	let body = {
  			aksi : 'deletetable',
  			table_id : id
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			this.ionViewWillEnter();
  		});

  }
  
  async confirmDelete(id) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      message: '¿Seguro que quieres borrar la tabla?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Borrar tabla',
          handler: () => {
            this.delTable(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deluserhistory(id){

  	let body = {
  			aksi : 'deleteuserhistory',
  			userhistory_id : id
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			this.ionViewWillEnter();
  		});

  }
  
  async confirmDeleteUserHistory(id) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      message: '¿Seguro que quieres borrar la historia de usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Borrar historia de usuario',
          handler: () => {
            this.deluserhistory(id);
          }
        }
      ]
    });

    await alert.present();
  }

  onDrop(userhistory_tableId, userhistory_id, ev) {

    console.log(userhistory_tableId, userhistory_id,ev);

      return new Promise(resolve => {
        let body = {
          aksi: 'updateuserhistorykanbas',
          userhistory_id: userhistory_id,
          userhistory_tableId: userhistory_tableId
        };
        console.log(body);
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          this.doRefreshAfterUpdate(ev);
          console.log('OK');
        });
  
      });
    
  } 

}
