export default interface AtualizarRacao{
    [x: string]: string | number | Date;
        id: number,
        nome: string,
        kgQuantidade: number,
        valorPago: number,
        dataCompra: string
    }
    