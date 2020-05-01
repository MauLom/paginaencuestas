export class fakesClass {

    public arrRamos = [
        'Autos', 'Flotillas', 'Gastos Medicos Individuales', 'Gastos Medicos Grupos',
        'Vida Inidividual', 'Vida Grupo', 'Diversos Individuales', 'Diversos Grupos',
        'Fianzas'
    ];
    public arrFunciones = [
        'Ventas', 'Cotizaciones', 'Emisiones', 'Cobranza', 'Renovacones', 'Siniestros', 'Conciliaciones', 'Adm. General', 'Fianzas'
    ];
    public arrMediosComunicacion = [
        'e-Mail', 'Telefono', 'Hangouts', 'Skype', 'Otro'
    ];

    public inicio: any = {
        'tipo': '0',
        'banner': '',
        'contenido': '',
        'textoBoton': '',
        'opciones': ''
    }
    public preguntas: any
    public textInput: any = {
        'tipo': '2',
        'titulo': '',
        'textoBoton': '',
        'opciones': ''
    }
    public calificacion: any = {
        'tipo': '3',
        'pregunta': '',
        'textoBoton': '',
        'opciones': ''
    }
    public selects: any = {
        'tipo': '4',
        'contenido': '',
        'textoBoton': '',
        'opciones': ''
    }

    public agradecimientos: any = {
        'tipo': '5',
        'contenido': '',
    }

    generaObjetoPagina(tipo) {
        let resultado = {};
        switch (tipo) {
            case 0: // Es inicio
                break;
            case 1: //Son preguntas
                let arrPreguntas = ['¿Como esta el clima hoy?', '¿Ya tomaste suficiente agua?', '¿Se ve bien este texto?', 'Sonrie marico, lo estas logrando. ']
                resultado = {
                    'tipo': 1,
                    'box': this.getRandomInt(0, 1),
                    'titulo': arrPreguntas[this.getRandomInt(0, (arrPreguntas.length - 1))],
                    'textoBoton': 'Soy un boton ¿Qué esperas que diga?',
                    'opciones': this.selecionaOpcionesDeArrays(this.getRandomInt(0,2))
                }
                break
        }
        return resultado    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    
    }


    selecionaOpcionesDeArrays(arrSelecionada) {
        let arreglo = [];
        let opciones =[];
        switch (arrSelecionada) {
            case 0: ///Ramos
                arreglo = this.arrRamos;
                break;
            case 1: ///Funciones
                arreglo = this.arrFunciones;
                break;
            case 2: //Medios
                arreglo = this.arrMediosComunicacion;
                break;
        }
        for(let i = 0; i < this.getRandomInt(0, (arreglo.length -1)); i++ ) {
            let objeto = {
                't': arreglo[this.getRandomInt(0,(arreglo.length -1))],
                'v': 'EstoDebeSerUnIdPeroLoPuedesIgnorar',
            }
            opciones.push(objeto);
        }
        return opciones;
    }
}