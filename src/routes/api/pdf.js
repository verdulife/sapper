import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
const mm = (size) => size * 2.83465;

PDFDocument.prototype.svg = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

export function post(req, res, next) {
  const data = req.body;
  const doc = new PDFDocument({
    size: [mm(210), mm(297)],
    margin: 0,
    info: {
      Title: `Factura - ${data.msg}`,
    },
  });

  res.statusCode = 200;
  res.setHeader("Content-type", "application/pdf");
  res.setHeader("Content-disposition", "attachment; filename=file.pdf");

  doc.pipe(res);

  doc.text(data.msg);

  /* doc.svg(bill, 0, 0, {
    width: mm(210),
    height: mm(297),
  }); */

  doc.end();
}
