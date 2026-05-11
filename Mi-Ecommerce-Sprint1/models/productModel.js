const products = [
  {
    id: 1,
    name: "Jack Daniel's Tennessee Honey",
    price: 9900,
    image: "/imagenes-productos/Jack Daniels.jpg"
  },
  {
    id: 2,
    name: "Combo Hamburguesa",
    price: 5000,
    image: "/imagenes-productos/combo-hamburguesa.png"
  },
  {
    id: 3,
    name: "Coca Cola lata 220ml x8",
    price: 1520,
    image: "/imagenes-productos/lata-cocacola.png"
  }
];

//Funciones para usar los datos.
exports.getAllProducts = () => products; //Retorna el array completo de productos.

//Recibe el identificador único del producto que quieres buscar (por ejemplo, un número o un string).
//Es un método de los arrays en JavaScript. Recorre la lista de productos uno por uno.
//p representa cada producto individual mientras el método busca.
//La función se detiene y devuelve el primer producto donde el ID del objeto (p.id) coincida con el ID que se le paso a la función.
//La variable products es la que recorres con el <% cart.forEach(...) %>.
exports.getProductById = (id) => {
  return products.find(p => p.id == id);
};