import { jsPDF } from 'jspdf'

const ORANGE = [237, 153, 64], TOASTED = [227, 118, 52], CHOC = [51, 37, 34], CREAM = [249, 240, 226]

const loadImage = (src) => new Promise((resolve) => {
  const img = new Image()
  img.onload = () => {
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    c.getContext('2d').drawImage(img, 0, 0); resolve(c.toDataURL('image/png'))
  }
  img.onerror = () => resolve(null)
  img.src = src
})

// groups: [{ title, items: [{ name, note }] }], breakfasts: [{ day, name }]
export async function downloadShoppingList({ title, subtitle, groups, breakfastsTitle, breakfasts, slogan, fileName }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, M = 18
  let y = 0

  doc.setFillColor(...ORANGE); doc.rect(0, 0, W, 38, 'F')
  const logo = await loadImage('./logo.png')
  if (logo) doc.addImage(logo, 'PNG', M, 7, 24, 24)
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(22)
  doc.text(title, M + 30, 18)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11)
  doc.text(`Your Ideal Breakfast  |  ${subtitle}`, M + 30, 26)
  y = 50

  const ensure = (h) => { if (y + h > 280) { doc.addPage(); y = 20 } }

  for (const g of groups) {
    ensure(16)
    doc.setTextColor(...TOASTED); doc.setFont('helvetica', 'bold'); doc.setFontSize(13)
    doc.text(g.title, M, y); y += 3
    doc.setDrawColor(...TOASTED); doc.setLineWidth(0.4); doc.line(M, y, W - M, y); y += 7
    for (const it of g.items) {
      ensure(9)
      doc.setDrawColor(...CHOC); doc.setLineWidth(0.4); doc.roundedRect(M, y - 4, 4.5, 4.5, 0.8, 0.8)
      doc.setTextColor(...CHOC); doc.setFont('helvetica', 'normal'); doc.setFontSize(12)
      doc.text(it.name, M + 8, y)
      doc.setTextColor(140, 120, 110); doc.setFontSize(10)
      doc.text(it.note, W - M, y, { align: 'right' })
      y += 8
    }
    y += 4
  }

  ensure(20 + breakfasts.length * 7)
  doc.setFillColor(...CREAM); doc.roundedRect(M - 4, y - 6, W - 2 * M + 8, 14 + breakfasts.length * 7, 3, 3, 'F')
  doc.setTextColor(...CHOC); doc.setFont('helvetica', 'bold'); doc.setFontSize(13)
  doc.text(breakfastsTitle, M, y + 2); y += 10
  doc.setFontSize(11)
  for (const b of breakfasts) {
    doc.setFont('helvetica', 'bold'); doc.text(b.day, M, y)
    doc.setFont('helvetica', 'normal'); doc.text(b.name, M + 42, y)
    y += 7
  }

  doc.setTextColor(...TOASTED); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text(slogan, W / 2, 290, { align: 'center' })
  doc.save(`${fileName}.pdf`)
}
