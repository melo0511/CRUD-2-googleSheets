import { Component, OnInit } from "@angular/core"
import { PeopleService } from "./services/people.service";
import { tap } from "rxjs";

@Component({
    selector: 'app-Principal',
    templateUrl: './Principal.component.html',
    styleUrls: ['./Principal.component.css']
})

export class PrincipalComponent implements OnInit {
    public listPeople: any = [];
    data: boolean = false;

    public inputValue1: string = '';
    public inputValue2: string = '';
    public inputValue3: string = '';
    public inputValue4: string = '';

    constructor(private peopleSvc: PeopleService) { }

    ngOnInit(): void {
        this.loadData();
    }

    //Cargar usuarios

    public loadData() {
        this.peopleSvc.get(`http://localhost:3000/api/data`).subscribe(res => {
            this.listPeople = res;
            console.log(res);
            this.data = res === null;
        });
    }

    //Crear usuarios

    public createData() {

        const objetoGuardado = {
            valor1: this.inputValue1,
            valor2: this.inputValue2,
            valor3: this.inputValue3,
            valor4: this.inputValue4
        };

        console.log('Objeto guardado:', objetoGuardado);

        this.peopleSvc.post('http://localhost:3000/api/send', objetoGuardado)
            .subscribe(res => {
                console.log("Cliente creado");
                this.loadData()
            });
    }

    //Actualizar usuarios

    //Eliminar usuarios
    
    public deletePerson(index: number) {

        this.peopleSvc.delete(`http://localhost:3000/api/delete/${index}`).subscribe(() => {
            this.loadData()
        });
    }
}
