import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Cart from "../cart/cart.model.js";
import Bill from "../bill/bill.model.js";

export const generarBillUser = async (req, res) => {
  try {
    const { idCart } = req.params;
    const { name, nit, date } = req.body;

    // Validación de datos
    if (!nit || nit.length < 5) {
      return res.status(400).json({ success: false, message: "NIT inválido." });
    }

    if (!date || isNaN(new Date(date))) {
      return res.status(400).json({ success: false, message: "Fecha inválida." });
    }

    // Buscar el carrito y los productos
    const cart = await Cart.findById(idCart).populate("products.product");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const products = cart.products.map(item => {
      const product = item.product;
      const totalPrice = product.price * item.quantity;
      totalAmount += totalPrice;
      return {
        name: product.name,
        quantity: item.quantity,
        totalPrice
      };
    });

    // factura en la base de datos
    const newInvoice = new Bill({
      customerName: name,
      taxId: nit,
      invoiceDate: new Date(date),
      shoppingCart: cart._id,
      items: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount
    });

    await newInvoice.save();

    // PDF con pdfkit
    const doc = new PDFDocument();
    const billFolder = path.join(process.cwd(), "Bill");

    if (!fs.existsSync(billFolder)) {
      fs.mkdirSync(billFolder);
    }

    const fileName = `Factura_${newInvoice._id}_${uuidv4()}.pdf`;
    const filePath = path.join(billFolder, fileName);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    //titulode la factura
    doc.fontSize(18).text("Factura", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Nombre: ${newInvoice.customerName}`);
    doc.text(`NIT: ${newInvoice.taxId}`);
    doc.text(`Fecha: ${new Date(newInvoice.invoiceDate).toLocaleDateString()}`);
    doc.moveDown();
    
    // Productos
    doc.fontSize(14).text("Productos:");
    products.forEach((product) => {
      doc.text(`${product.name} - Cantidad: ${product.quantity} - Precio Total: $${product.totalPrice.toFixed(2)}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total a pagar: $${totalAmount.toFixed(2)}`, { bold: true });

    doc.end();

    stream.on("finish", () => {
      return res.status(200).json({
        success: true,
        message: "Factura generada y guardada con éxito.",
        invoice: newInvoice,
        filePath
      });
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al generar la factura",
      error: err.message
    });
  }
};

export default generarBillUser;

export const getBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate("shoppingCart") 
            .populate("items.product");

        if (!bills || bills.length === 0) {
            return res.status(404).json({ success: false, message: "No se encontraron facturas." });
        }

        return res.status(200).json({
            success: true,
            message: "Facturas obtenidas con éxito.",
            bills
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las facturas.",
            error: err.message
        });
    }
};