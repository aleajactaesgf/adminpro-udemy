export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string, // Al hacer opcional img, los siguientes deben ser opcionales, en el constructor el orden importar
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {  }
}
