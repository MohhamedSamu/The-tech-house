export interface Pedido {
    id?: number;
    cliente?: string;
    fecha?: string;
    subTotal?: number;
    servicios: number;
    precioFinal?: number;
    items?: number;
}

export interface Solicitudes {
    idSolicitud?: number;
    idPedido?: number;
    idProducto?: number;
    cantidad?: number;
    subTotal?: number;
    fotos?: any;
    nombre?: string;
    precio?: number;
}

export interface Productos {
    idProducto?: number;
    nombre?: string;
    precio?: number;
}