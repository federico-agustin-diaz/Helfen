class Global {
    private myName:string = ''
    variableGlobalTipo: number = 0;
    variableGlobalId: number = 0;
    variableGlobalEmail: string = "";
    variableGlobalPrimerNombre: string = "";
    variableGlobalApellido: string = "";
    variableGlobalLatitude: number = 0;
    variableGlobalLongitude: number = 0;
    variableGlobalCuidadores: any = [];
    // you can define more variables
    public get_myName(){
        return this.myName;
    }

    public set_myName(new_name:string){
        this.myName = new_name;
    }

    public set_variableGlobalTipo(new_number:number){
        this.variableGlobalTipo = new_number;
    }
    public get_variableGlobalTipo(){
        return this.variableGlobalTipo;
    }

    public set_variableGlobalId(new_number:number){
        this.variableGlobalId = new_number;
    }
    public get_variableGlobalId(){
        return this.variableGlobalId;
    }

    public set_variableGlobalEmail(new_number:string){
        this.variableGlobalEmail = new_number;
    }
    public get_variableGlobalEmail(){
        return this.variableGlobalEmail;
    }

    public set_variableGlobalPrimerNombre(new_number:string){
        this.variableGlobalPrimerNombre = new_number;
    }
    public get_variableGlobalPrimerNombre(){
        return this.variableGlobalPrimerNombre;
    }

    public set_variableGlobalApellido(new_number:string){
        this.variableGlobalApellido = new_number;
    }
    public get_variableGlobalApellido(){
        return this.variableGlobalApellido;
    }

    public set_variableGlobalLatitude(new_number:number){
        this.variableGlobalLatitude = new_number;
    }
    public get_variableGlobalLatitude(){
        return this.variableGlobalLatitude;
    }

    public set_variableGlobalLongitude(new_number:number){
        this.variableGlobalLongitude = new_number;
    }
    public get_variableGlobalLongitude(){
        return this.variableGlobalLongitude;
    }

    public set_variableGlobalCuidadores(new_number:Array<any>){
        this.variableGlobalCuidadores = new_number;
    }
    public get_variableGlobalCuidadores(){
        return this.variableGlobalCuidadores;
    }
}

export default new Global()