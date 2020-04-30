export class DialogSioRef {
    private windowOrigen = (localStorage.getItem("windowOrigen"))?localStorage.getItem("windowOrigen"):'';
    private keyCode = "";
    private projectName = "quattroCRM";

   constructor(router?: any, private pName?: any) {
       if(router){
           router.queryParams.subscribe(result => {
               if(result.fo){
                   this.windowOrigen = result.fo;  
                   localStorage.setItem("windowOrigen", result.fo);
               }
               if(result.kc) {
                   this.keyCode = result.kc;
               }
               if(pName) {      
                   this.projectName = pName; 
               }
           });
       }else{
           console.error("DialogSioRef", "No cuenta con los flags suficientes");
       }
   }

   public closeDialogSio(response?: any) {
       if(this.windowOrigen != "" && this.keyCode != ""){
           if(response){
               response.key = this.keyCode;
               window.parent.window.postMessage(response, this.windowOrigen);
           }else{
               window.parent.window.postMessage({key: this.keyCode}, this.windowOrigen);
           }
       }else{
           console.error("closeDialogSio", "No se puede realizar la comunicación");
       }
   }

   public windowLocationSio(pathSrc:string){
       if(pathSrc != "" && this.windowOrigen != ""){
           let data = {
               projectName: this.projectName,
               src: pathSrc
           }; 
           window.parent.postMessage(data, this.windowOrigen);
       }else{
           console.error("windowLocationSio", "No se puede realizar la comunicación");
       }
   }
}