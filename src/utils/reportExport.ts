type ReportSection = {
  heading: string;
  lines: string[];
};

type ReportExportOptions = {
  fileName: string;
  title: string;
  subtitle?: string;
  metadata?: string[];
  sections: ReportSection[];
};

const toPdfFileName = (fileName: string) => {
  const normalized = fileName.trim().toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/-+/g, '-');
  return normalized.endsWith('.pdf') ? normalized : `${normalized}.pdf`;
};

export function downloadReportPdf({
  fileName,
  title,
  subtitle,
  metadata = [],
  sections
}: ReportExportOptions) {
  void createPdf({ fileName, title, subtitle, metadata, sections }).catch((error) => {
    console.error('[ReportExport] Failed to generate PDF', error);
  });
}

async function createPdf({
  fileName,
  title,
  subtitle,
  metadata = [],
  sections
}: ReportExportOptions) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const marginY = 56;
  const contentWidth = pageWidth - marginX * 2;
  const footerLimit = pageHeight - marginY;

  let cursorY = marginY;

  const ensureSpace = (height: number) => {
    if (cursorY + height <= footerLimit) return;
    doc.addPage();
    cursorY = marginY;
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(118, 38, 198);
  doc.text(title, marginX, cursorY);
  cursorY += 24;

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(55, 65, 81);
    const wrappedSubtitle = doc.splitTextToSize(subtitle, contentWidth);
    wrappedSubtitle.forEach((line: string) => {
      ensureSpace(16);
      doc.text(line, marginX, cursorY);
      cursorY += 16;
    });
    cursorY += 2;
  }

  const generatedAt = `Generated: ${new Date().toLocaleString()}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  [generatedAt, ...metadata].forEach((item) => {
    const wrapped = doc.splitTextToSize(item, contentWidth);
    wrapped.forEach((line: string) => {
      ensureSpace(14);
      doc.text(line, marginX, cursorY);
      cursorY += 14;
    });
  });

  cursorY += 8;
  ensureSpace(1);
  doc.setDrawColor(203, 213, 225);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 18;

  sections.forEach((section) => {
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(31, 41, 55);
    doc.text(section.heading, marginX, cursorY);
    cursorY += 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);

    section.lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(`- ${line}`, contentWidth - 8);
      wrapped.forEach((wrappedLine: string) => {
        ensureSpace(14);
        doc.text(wrappedLine, marginX + 8, cursorY);
        cursorY += 14;
      });
    });

    cursorY += 10;
  });

  doc.save(toPdfFileName(fileName));
}
