export class Constant {
    URL: string;
    URLCliente: string;
    URLCatalogo: string;
    URLPolizas: string;
    URLEstructura: string;
    URLDataTransfer: string;
    URLQuattroAutos: string;
    public UPLOAD_URL_ADJUNTOS:string;
    S4_KEY: string;
    private snackBarTime:number=4000;
    private debug: boolean = false;
    public URLERRORES:string;
    public MESSAGING_SERVICE_ENDPOINT_AES: string;
    public URLPolizasLazy: string;

    
    constructor() {
        this.S4_KEY = "uLmdvb2dsZS5jb20vY2hhdC1kYXRhYmFzZS05NTdjMSIsIm5hbWUiOiJIZWJlc";
         // Servicios AES                                         
         switch(window.location.hostname) {
            case "localhost":
            this.UPLOAD_URL_ADJUNTOS = "https://file-upload-capp-aes-dot-quattrocrm-201805.appspot.com/"; // AES
            //this.URLQuattroAutos = "https://quattro-autos-ws-aes-dot-sio4-168120.appspot.com/";
            this.URLQuattroAutos = "https://quattro-autos-ws-aes-dot-quattrocrm-201805.appspot.com/";
            this.URLERRORES = "https://quattroqa.copsis.com:8181/sio4aestructura-new/Sio4CrmLogErroresAPI";
            this.MESSAGING_SERVICE_ENDPOINT_AES = " https://quattro-crm-notificaciones-aes-dot-quattro-firebase.appspot.com/";
            break;
            case "quattroqa.copsis.com":
            this.UPLOAD_URL_ADJUNTOS = "https://file-upload-capp-aes-dot-quattrocrm-201805.appspot.com/"; // AES
            this.URLQuattroAutos = "https://quattro-autos-ws-aes-dot-sio4-168120.appspot.com/";
            this.URLERRORES = "https://quattroqa.copsis.com:8181/sio4aestructura-new/Sio4CrmLogErroresAPI";
            this.MESSAGING_SERVICE_ENDPOINT_AES = " https://quattro-crm-notificaciones-aes-dot-quattro-firebase.appspot.com/";
            break;
            case "quattrocrm.copsis.com":
            this.UPLOAD_URL_ADJUNTOS = "https://file-upload-capp-aes-dot-quattrocrm-201805.appspot.com/"; // AES
            this.URLQuattroAutos = "https://quattro-autos-ws-aes-dot-sio4-168120.appspot.com/";
            this.URLERRORES = "https://quattroqa.copsis.com:8181/sio4aestructura-new/Sio4CrmLogErroresAPI";
            this.MESSAGING_SERVICE_ENDPOINT_AES = " https://quattro-crm-notificaciones-aes-dot-quattro-firebase.appspot.com/";
            break;
            default:
                // Producción(quattrocrm1.copsis.com, ...)
                this.UPLOAD_URL_ADJUNTOS = "https://file-upload-capp-aes-dot-quattrocrm-201805.appspot.com/"; // AES
                this.URLQuattroAutos = "https://quattro-autos-ws-aes-dot-quattrocrm-201805.appspot.com/";
                this.URLERRORES = "https://quattroqa.copsis.com:8181/sio4aestructura-new/Sio4CrmLogErroresAPI";
                this.MESSAGING_SERVICE_ENDPOINT_AES = " https://quattro-crm-notificaciones-aes-dot-quattro-firebase.appspot.com/";
            break;
        }
        
        switch (window.location.hostname) {
            case "quattrocrm1.copsis.com": // sio4-rd (QA)            
            this.URL = "https://quattrocrm1.copsis.com:8181/sio4apolizas-new/";
            this.URLCliente = "https://quattrocrm1.copsis.com:8181/sio4aclientes-new/";
            this.URLCatalogo = "https://quattrocrm1.copsis.com:8181/sio4acatalogos-new/";
            this.URLEstructura = "https://quattrocrm1.copsis.com:8181/sio4aestructura-new/";
            this.URLPolizas = "https://quattrocrm1.copsis.com:8181/sio4apolizas-new/";
            this.URLDataTransfer = "https://quattrocrm1.copsis.com:8181/data-transfer-api/";
            this.URLPolizasLazy = "https://quattrocrm1.copsis.com:8181/sio4apolizas-lazy-fetch/";
            break;
            case "quattroqa.copsis.com": // sio4-rd (QA)            
                this.URL = "https://quattroqa.copsis.com:8181/sio4apolizas-new/";
                this.URLCliente = "https://quattroqa.copsis.com:8181/sio4aclientes-new/";
                this.URLCatalogo = "https://quattroqa.copsis.com:8181/sio4acatalogos-new/";
                this.URLEstructura = "https://quattroqa.copsis.com:8181/sio4aestructura-new/";
                this.URLPolizas = "https://quattroqa.copsis.com:8181/sio4apolizas-new/";
                this.URLDataTransfer = "https://quattroqa.copsis.com:8181/data-transfer-api/";
                this.URLPolizasLazy = "https://quattroqa.copsis.com:8181/sio4apolizas-lazy-fetch/";
                break;
            case "quattrocrm.copsis.com": // quattrocrm (Produccion)
                this.URL = "https://kioscodeseguros.com:8181/sio4apolizas-new/";
                this.URLCliente = "https://kioscodeseguros:8181/sio4aclientes-new/";
                this.URLCatalogo = "https://kioscodeseguros.com:8181/sio4acatalogos-new/";
                this.URLEstructura = "https://kioscodeseguros.com:8181/sio4aestructura-new/";
                this.URLPolizas = "https://kioscodeseguros.com:8181/sio4apolizas-new/";
                this.URLDataTransfer = "https://quattroqa.copsis.com:8181/data-transfer-api/";
                this.URLPolizasLazy = "https://kioscodeseguros.com:8181/sio4apolizas-lazy-fetch/";
                break;
            case "localhost": // desarrollo (Local)
                 this.URL = "https://quattroqa.copsis.com:8181/sio4apolizas-new/";
                 this.URLCliente = "https://quattroqa.copsis.com:8181/sio4aclientes-new/";
                 this.URLCatalogo = "https://quattroqa.copsis.com:8181/sio4acatalogos-new/";
                 this.URLEstructura = "https://quattroqa.copsis.com:8181/sio4aestructura-new/";
                 this.URLPolizas = "https://quattroqa.copsis.com:8181/sio4apolizas-new/";
                 this.URLDataTransfer = "http://localhost:8080/data-transfer-api/";
                 this.URLPolizasLazy = "http://localhost:8080/sio4apolizas-lazy-fetch/";
               
                // this.URL = "http://localhost:8080/sio4apolizas-new/";
                // this.URLCliente = "http://localhost.com:8080/sio4aclientes-new/";
                // this.URLCatalogo = "http://localhost:8080/sio4acatalogos-new/";
                // this.URLEstructura = "http://localhost:8080/sio4aestructura-new/";
                // this.URLPolizas = "http://localhost:8080/sio4apolizas-new/";
                // this.URLDataTransfer = "http://localhost:8080/data-transfer-api/";
                // this.URLPolizasLazy = "http://localhost:8080/sio4apolizas-lazy-fetch/";
                                
                break;
            default:
                break;
        }
    }
    
    getDebug(): boolean {
        return this.debug;
    }

    getSnackBarTime(){
        return this.snackBarTime;
    }

    public setLocalStorage(letrab: string) {
        if (window.location.hostname == "localhost") {
            localStorage.setItem("w", letrab); console.error("el storage local");
        }
    }
}

export class EncryptConstants {
    public ZERO: string;
    public UNO: string;
    public DOS: string;
    public TRES: string;
    public CUATRO: string;
    public CINCO: string;
    public SEIS: string;
    public SIETE: string;
    public OCHO: string;
    public NUEVE: string;
    public DIEZ: string;
    public ONCE: string;
    public DOCE: string;
    public TRECE: string;
    public CATORCE: string;
    public QUINCE: string;
    public DIESICEIS: string;
    public DIESICIETE: string;
    public DIESIOCHO: string;
    public DIESINUEVE: string;
    public VEINTE: string;
    public VEITIUNO:string;
    public VEITIDOS:string;

    constructor() {
        this.ZERO = "l66xHtlkmi56Uqz3MEYuqw==";
        this.UNO = "94c3qaBTlOBbdUWPBkxEmg==";
        this.DOS = "f917Va5WwTC+2N4o3l4+BA==";
        this.TRES = "Iq11nyEuKhO2atPO7zevuw==";
        this.CUATRO = "EqCZqGFttusLNojjyxsIBQ==";
        this.CINCO = "DkxlYDgr8ppqraux+geoWQ==";
        this.SEIS = "NrJZ2eu8864dVTrtvx+UWQ==";
        this.SIETE = "yvzHgyDWbKBDnl9x3vHpyw==";
        this.OCHO = "HPprvkjaW3dEDhHb4rMbUw==";
        this.NUEVE = "G3qKOv/JCLtcizqrY/DUUg==";
        this.DIEZ = "BZkFTQl+/ypfyS8ecK8cDQ==";
        this.ONCE = "BHj2Q7IqI3UAMAvoFTMpHg==";
        this.DOCE = "PYYCJxaUzGWcuzoy4aVrEw==";
        this.TRECE = "q5pNsocdNEy34aRW1AXEkQ==";
        this.CATORCE = "NOwi9GtnliNcum4Bsam09Q==";
        this.QUINCE = "8CgddnXyqkVSMum/oKjifg==";
        this.DIESICEIS = "YcOJ/i++O0aZ37B7J8KRGg==";
        this.DIESICIETE = "H/QTfZ6fL66wuho1zdnzSg==";
        this.DIESIOCHO = "/k9PiRJ01NnBnN4pcfPzQQ==";
        this.DIESINUEVE = "UbOxuPNiFuGGuLxKgMMFPg==";
        this.VEINTE = "vr0Iqzix9uaS9cyiQF490w==";
        this.VEITIUNO ="s6AlIo/7ITm5aqHXfmJDBQ==";
        this.VEITIDOS ="qS0T0zyrYPon/Z9j6k56pA==";
    }
}