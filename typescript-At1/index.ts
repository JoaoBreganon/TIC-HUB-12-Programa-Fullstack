import { User } from "./userbase.js";
import { Cart } from "./cartmodel.js";
import { ICategory, IProduct, Product,Category } from "./modelbase.js";
const catEletronicos = new Category(1, "Eletrônicos");
const mouse = new Product(101, "Mouse Sem Fio", 50.00, catEletronicos);
const teclado = new Product(102, "Teclado Mecânico", 150.00, catEletronicos);


const cliente = new User(1, "dev_user", "dev@email.com", "CUSTOMER");


const meuCarrinho = new Cart();

meuCarrinho.addItem(mouse, 2);   
meuCarrinho.addItem(teclado, 1); 
meuCarrinho.addItem(mouse, 3);   


console.log(`Usuário: ${cliente.username} (${cliente.role})`);
console.log("Total de itens no carrinho:", meuCarrinho.getTotalItems()); 
console.log("Valor total da compra: R$", meuCarrinho.getFinalPrice());  