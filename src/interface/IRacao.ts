export default interface IRacao{
    [x: string]: string | number | Date;
    nome: string,
    kgQuantidade: number,
    valorPago: number,
    dataCompra: string;
}
