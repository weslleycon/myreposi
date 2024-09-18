export default interface ListarRacao{
    [x: string]: any;
        id: number,
        nome: string,
        kgQuantidade: number,
        valorPago: number,
        dataCompra: string;
    }