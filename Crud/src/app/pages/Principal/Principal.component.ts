import { Component, OnInit } from "@angular/core"
import { PeopleService } from "./services/people.service";

@Component({
    selector: 'app-Principal',
    templateUrl: './Principal.component.html',
    styleUrls: ['./Principal.component.css']
})

export class PrincipalComponent implements OnInit {
    public listPeople: any = [];
    private tempArray: any = []
    data: boolean = false;
    posicionActual: number = 0

    public inputCreate1: string = '';
    public inputCreate2: string = '';
    public inputCreate3: string = '';
    public inputCreate4: string = '';

    public manageInput1: string = '';
    public manageInput2: string = '';
    public manageInput3: string = '';
    public manageInput4: string = '';

    constructor(private peopleSvc: PeopleService) { }

    ngOnInit(): void {
        this.loadData();
    }

    //////////Metodos//////////

    //Cargar usuarios

    public loadData() {

        this.inputCreate1 = ""
        this.inputCreate2 = ""
        this.inputCreate3 = ""
        this.inputCreate4 = ""

        this.manageInput1 = ""
        this.manageInput2 = ""
        this.manageInput3 = ""
        this.manageInput4 = ""

        this.peopleSvc.get(`http://localhost:3000/api/data`).subscribe(res => {
            this.listPeople = res;
            console.log(res);
            this.data = res === null;
        });
    }

    //Crear usuarios

    public createData() {

        const createObject = {
            valor1: this.inputCreate1,
            valor2: this.inputCreate2,
            valor3: this.inputCreate3,
            valor4: this.inputCreate4
        };

        console.log('Objeto guardado:', createObject);

        this.peopleSvc.post('http://localhost:3000/api/send', createObject)
            .subscribe(res => {
                console.log("Cliente creado");
                this.loadData()
            });
    }

    //Actualizar usuarios

    public updateData() {

        let index = this.posicionActual

        const updateObject = {
            valor1: this.manageInput1,
            valor2: this.manageInput2,
            valor3: this.manageInput3,
            valor4: this.manageInput4
        };

        const apiUrl = `http://localhost:3000/api/update/${index}`;
        this.peopleSvc.put(apiUrl, updateObject).subscribe(
          (res) => {
            console.log('Persona actualizada con éxito', res);
            this.loadData()
          }
        );
      }

    //Eliminar usuarios

    public deleteData() {

        let index = this.posicionActual

        this.peopleSvc.delete(`http://localhost:3000/api/delete/${index}`).subscribe(() => {
            this.loadData()
        });
    }

    ////////Demas logica////////

    //Actualizar inputs

    public updateInputs(i: number) {
        this.posicionActual = i
        this.tempArray = ""
        this.tempArray = this.listPeople[i]
        this.manageInput1 = this.tempArray[0]
        this.manageInput2 = this.tempArray[1]
        this.manageInput3 = this.tempArray[2]
        this.manageInput4 = this.tempArray[3]
        this.posicionActual = i
    }
}
