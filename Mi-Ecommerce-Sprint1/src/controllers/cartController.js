const productModel = require('../models/productModel');

//VER CARRITO
exports.index = (req, res) => {
  const cartSession = req.session.cart || [];
  
  const detailedCart = cartSession.map(item => {
    const productDetail = productModel.getProductById(item.productId);
    
    //Si el producto no existe, devolvemos null para no romper nada
    if (!productDetail) {
        return null;
    }
    return {
      id: productDetail.id,
      name: productDetail.name,
      price: productDetail.price,
      image: productDetail.image,
      quantity: item.quantity,
      subtotal: productDetail.price * item.quantity
    };
  }).filter(item => item !== null); // Aquí borramos los productos que no se encontraron

  const total = detailedCart.reduce((acc, item) => acc + item.subtotal, 0);

  res.render('pages/cart', { cart: detailedCart, total: total });
};

//VER EL CHECKOUT
exports.getCheckout = (req, res) => { //
  const cartSession = req.session.cart || []; 
  const detailedCart = cartSession.map(item => {
    const product = productModel.getProductById(item.productId);
    return { ...product, quantity: item.quantity, subtotal: product.price * item.quantity };
  });
  const total = detailedCart.reduce((acc, item) => acc + item.subtotal, 0);
  
  //Renderiza la vista del checkout, pasando los detalles del carrito y el total para que se muestren en la página de pago.
  res.render('pages/checkout', { cart: detailedCart, total: total });
};

//AGREGAR PRODUCTO AL CARRITO
exports.addToCart = (req, res) => {
  const productId = parseInt(req.params.id); //Obtiene el ID del producto desde los parámetros de la URL.
  if (!req.session.cart) req.session.cart = []; //Si el carrito no existe en la sesión, lo inicializa como un array vacío.

  const itemIndex = req.session.cart.findIndex(i => i.productId == productId); //Busca si el producto ya está en el carrito.
  //Si el producto ya está en el carrito, incrementa su cantidad. Si no, lo agrega al carrito con una cantidad inicial de 1.
  if (itemIndex > -1) {
        req.session.cart[itemIndex].quantity++;
    } else {
        req.session.cart.push({ productId: productId, quantity: 1 });
    }
    res.redirect('/cart');
};

//ELIMINAR PRODUCTO DEL CARRITO
exports.updateQuantity = (req, res) => {
  const { id, action } = req.params;
  const item = req.session.cart.find(i => i.productId == id);

  //Si el producto existe en el carrito, dependiendo de la acción (aumentar o disminuir), se ajusta la cantidad.
  if (item) {
    if (action === 'increase') item.quantity++; //Si la acción es "aumentar", incrementa la cantidad del producto en el carrito.
        else if (action === 'decrease') item.quantity--; //Si la acción es "disminuir", decrementa la cantidad del producto en el carrito.
        
        if (item.quantity <= 0) { //Si la cantidad del producto es cero o menos, se elimina del carrito.
          req.session.cart = req.session.cart.filter(i => i.productId != id); //Actualiza el carrito en la sesión para eliminar el producto cuyo ID coincide con el ID proporcionado.
        }
    }
    res.redirect('/cart'); //Después de modificar el carrito, redirige al usuario a la página del carrito para que pueda ver los cambios realizados.
};

//VACIAR CARRITO
exports.clearCart = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
};