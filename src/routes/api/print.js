import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import { readFileSync } from "fs";
import { resolve } from "path";

const mm = (size) => size * 2.83465;
const bill = readFileSync(resolve(process.cwd(), "static", "bill.svg"), { encoding: "utf-8" });
const type = resolve(process.cwd(), "static", "fonts", "OperatorMonoLig-Medium.ttf");

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

  doc.svg(bill, 0, 0, {
    width: mm(210),
    height: mm(297),
  });

  doc.font(type).fontSize(8);

  doc.text(data.num, mm(168), mm(31));
  doc.text(data.date, mm(168), mm(36));

  doc.text(data.for, mm(34.5), mm(66.7));
  doc.text(data.id, mm(163.5), mm(66.7));
  doc.text(data.address, mm(42), mm(74));
  doc.text(data.contact, mm(163.5), mm(74));

  let base = 0;
  for (let l = 0; l < data.lines.length; l++) {
    const line = data.lines[l];
    const jump = mm(5.5) * l;
    const with_dto = (line.price * line.dto) / 100;
    const line_total = line.price - with_dto * line.amount;

    doc.text(line.amount, mm(27), mm(97) + jump);
    doc.text(line.label, mm(38), mm(97) + jump);
    doc.text(`${line.dto}%`, mm(139), mm(97) + jump);
    doc.text(`${line.price.toFixed(2)}€`, mm(150), mm(97) + jump);
    doc.text(`${line_total.toFixed(2)}€`, mm(168), mm(97) + jump);

    base += line_total;
  }

  const ret = 1.15;
  const iva = 1.21;

  const with_ret = base / ret;
  const with_iva = base * iva;
  const total = base - with_ret + with_iva;

  doc.text(`${base.toFixed(2)}€`, mm(63.5), mm(238));
  doc.text(`-${with_ret.toFixed(2)}€`, mm(96), mm(238));
  doc.text(`${with_iva.toFixed(2)}€`, mm(128), mm(238));
  doc.fillColor("#fff").text(`${total.toFixed(2)}€`, mm(154), mm(238));

  doc.end();
}
