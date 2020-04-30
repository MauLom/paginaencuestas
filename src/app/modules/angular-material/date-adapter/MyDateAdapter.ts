import { NativeDateAdapter } from "@angular/material";

export class MyDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            return this._to2digit(day) + '/' + this._getMonthText(month) + '/' + year;
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    private _getMonthText(month){
        //let meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        let meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        return meses[month];
    }
}