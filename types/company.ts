export interface Company {
    _id?: string;
    id?: string;
    name?: string;
    description?: string;
    email?: string;
    phone?: string;
    rif?: string;
    address?: string;
    banner?: string;
    currencySymbol?: string;
    iva?: number;
    logo?: string;
    logoAlpha?: string;
    configMail?: ConfigMail;
    configPdf?: ConfigPDF;
}

export interface ConfigMail {
    colors: Colors;
}

export interface Colors {
    background: string;
    primary: string;
    secundary: string;
    title: string;
}

export interface ConfigPDF {
    logo: Logo;
    logoAlpha: Logo;
}

export interface Logo {
    width: number;
    x: number;
    y: number;
}

export interface Image {
    image: any,
    imageType: string
}