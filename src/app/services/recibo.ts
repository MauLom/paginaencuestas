export class Recibo{
    constructor(
        public serie:number, 
        public totalSerie:number, 
        public vigenciaDe:Date,
        public vigenciaA:Date,
        public vence:Date,
        public primaNeta:number,
        public ajuste1:number,
        public ajuste2:number,
        public cargoExtra:number,
        public derecho:number,
        public financiamiento:number,
        public iva:number,
        public total:number
       ){}
}