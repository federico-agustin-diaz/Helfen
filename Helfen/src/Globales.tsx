class Global {
    private myName:string = ''
    variableGlobalTipo: number = 0;
    variableGlobalId: number = 0;
    variableGlobalEmail: string = "";
    variableGlobalNombre: string = "";
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

    public set_variableGlobalNombre(new_number:string){
        this.variableGlobalNombre = new_number;
    }
    public get_variableGlobalNombre(){
        return this.variableGlobalNombre;
    }
}

export default new Global()