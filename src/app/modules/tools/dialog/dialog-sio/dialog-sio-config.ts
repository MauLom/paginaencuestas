export class SioDialogConfig {
    /** Width of the dialog. */
    width?: string;
    /** Height of the dialog. */
    height?: string;
    /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;
    /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;
    /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
    maxWidth?: number | string;
    /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;
    /** Title of the dialog. */
    title?: string;
    /** Disabled Title of the dialog. */
    dialogTitle?: boolean;
    /** Disabled Actions of the dialog. */
    dialogAction?: boolean;
    /** Absolute Title of the dialog. */
    titleAbsolute?: boolean;
    /**Button close style float-right*/
    closeRight?:boolean;
}


export class KeyCodeRandom {
    getKeyCode(number?:number) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var longitud = 5;
        if(number){
            longitud = number;
        }
        var textKey = "";
        for (var i = 0; i < longitud; i++)
        textKey += possible.charAt(Math.floor(Math.random() * possible.length));

        return textKey;
    }
}
