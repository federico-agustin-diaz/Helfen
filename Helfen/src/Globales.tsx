class Global {
    private myName:string = ''
    variableGlobalTipo: number = 0;
    variableGlobalId: number = 0;
    variableGlobalIdUserParaMandarUbicacion: number = 0;
    variableGlobalEmail: string = "";
    variableGlobalPrimerNombre: string = "";
    variableGlobalApellido: string = "";
    variableGlobalLatitude: number = 0;
    variableGlobalLongitude: number = 0;
    variableGlobalCuidadores: any = [];
    variableGlobalEventStart: any = "";
    variableGlobalEventFinish: any = "";
    variableGlobalEventid: any = [];
    variableGlobalEventName: any = "";
    variableGlobalEventHoraFinish: any = "";
    variableGlobalEventHoraStart: any = "";
    variableGlobalFamiliaresPendientes: any = [];
    variableGlobalFamiliaresConfirmados: any = [];
    variableGlobalCuidadoresPendientes: any = [];
    variableGlobalCuidadoresConfirmados: any = [];
    variableGlobalEventosCalendario: any = [];
    variableGlobalEventResume: string = "";
    variableGlobalMostrandoModal: boolean = false;
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

    public set_variableGlobalIdUserParaMandarUbicacion(new_number:number){
        this.variableGlobalIdUserParaMandarUbicacion = new_number;
    }
    public get_variableGlobalIdUserParaMandarUbicacion(){
        return this.variableGlobalIdUserParaMandarUbicacion;
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

    public set_variableGlobalFamiliaresPendientes(new_number:Array<any>){
        this.variableGlobalFamiliaresPendientes = new_number;
    }
    public get_variableGlobalFamiliaresPendientes(){
        return this.variableGlobalFamiliaresPendientes;
    }

    public set_variableGlobalCuidadoresPendientes(new_number:Array<any>){
        this.variableGlobalCuidadoresPendientes = new_number;
    }
    public get_variableGlobalCuidadoresPendientes(){
        return this.variableGlobalCuidadoresPendientes;
    }

    public set_variableGlobalFamiliaresConfirmados(new_number:Array<any>){
        this.variableGlobalFamiliaresConfirmados = new_number;
    }
    public get_variableGlobalFamiliaresConfirmados(){
        return this.variableGlobalFamiliaresConfirmados;
    }

    public set_variableGlobalCuidadoresConfirmados(new_number:Array<any>){
        this.variableGlobalCuidadoresConfirmados = new_number;
    }
    public get_variableGlobalCuidadoresConfirmados(){
        return this.variableGlobalCuidadoresConfirmados;
    }
    public get_variableGlobalEventStart(){
        return this.get_variableGlobalEventStart;
    }
    public set_variableGlobalEventStart(new_number:string){
        this.variableGlobalEventStart = new_number;
    }
    public get_variableGlobalEventFinish(){
        return this.variableGlobalEventFinish;
    }
    public set_variableGlobalEventFinish(new_number:string){
        this.variableGlobalEventFinish = new_number;
    }
    public get_variableGlobalEventHoraStart(){
        return this.get_variableGlobalEventHoraStart;
    }
    public set_variableGlobalEventHoraStart(new_number:string){
        this.variableGlobalEventHoraStart = new_number;
    }
    public get_variableGlobalEventHoraFinish(){
        return this.variableGlobalEventHoraFinish;
    }
    public set_variableGlobalEventHoraFinish(new_number:string){
        this.variableGlobalEventHoraFinish = new_number;
    }
    public get_variableGlobalEventid(){
        return this.variableGlobalEventid;
    }
    public set_variableGlobalEventid(new_number:Array<any>){
        this.variableGlobalEventid = new_number;
    }
    public get_variableGlobalEventName(){
        return this.variableGlobalEventName;
    }
    public set_variableGlobalEventName(new_number:string){
        this.variableGlobalEventName = new_number;
    }
    public get_variableGlobalEventResume(){
        return this.variableGlobalEventResume;
    }
    public set_variableGlobalEventResume(new_number:string){
        this.variableGlobalEventResume = new_number;
    }
    public get_variableGlobalMostrandoModal(){
        return this.variableGlobalMostrandoModal;
    }
    public set_variableGlobalMostrandoModal(new_number:boolean){
        this.variableGlobalMostrandoModal = new_number;
    }
}

export default new Global()