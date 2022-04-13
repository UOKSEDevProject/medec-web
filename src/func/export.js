import jsPDF from "jspdf";
import Logo from "../assets/images/MEDEC logo  nav.png";

export const exportPdf = (imgUrl) => {
    const img = new Image();
    const logoWidth = 312;
    const logoHeight = 80;
    const pageHeaderPct = 0.08;
    const pageFooterPct = 0.03;

    img.src = imgUrl;

    img.onload = () => {
        const doc = new jsPDF({orientation: "portrait", unit: 'px', format: 'letter', hotfixes: ['px_scaling'], compress: true});
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageHeaderHeight = pageHeight * pageHeaderPct;
        const pageFooterHeight = pageHeight * pageFooterPct;
        const originalImgWidth = img.width;
        const originalImgHeight = img.height;
        const imgRatio = originalImgWidth / originalImgHeight;

        let date = new Date();
        const currentTime = `${date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})}-${date.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2})}-${date.getFullYear()} ${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2})}`;

        // Header
        doc.setFillColor('#2d4a57');
        doc.rect(0, 0, pageWidth, pageHeaderHeight, 'F');
        doc.addImage(Logo, 'PNG', (pageWidth - logoWidth) / 2, 0, logoWidth, logoHeight);

        // body
        doc.setFontSize(12);
        doc.setFont("courier", "normal");
        doc.text(`Name: Chanaka Herath`, 10, pageHeaderHeight + 20);
        doc.text(`Doctor Name: Thilina PahalaGedara`, 10, pageHeaderHeight + 35);
        doc.text(`Laboratory: Asiri Lab`, 10, pageHeaderHeight + 50);
        doc.text(`Date: ${currentTime}`, 10, pageHeaderHeight + 65);
        doc.setFont("helvetica", "bold");
        doc.text(`Report`, pageWidth / 2, pageHeaderHeight + 80, {align: 'center'});

        let pdfImageHeight = pageHeight - pageHeaderHeight - pageFooterHeight - 90;
        let pdfImageWidth = pdfImageHeight * imgRatio;

        // when landscape image
        if (pdfImageWidth > pageWidth) {
            pdfImageWidth = pageWidth - 20;
            pdfImageHeight = pdfImageWidth / imgRatio;
        }

        doc.addImage(img, 'PNG', (pageWidth - pdfImageWidth) / 2, pageHeaderHeight + 90, pdfImageWidth, pdfImageHeight);

        // Footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const totalPages = doc.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.text(`Pages ${i} | ${totalPages}`, 10, pageHeight - pageFooterHeight + 20);
            doc.text(currentTime, pageWidth - 10, pageHeight - pageFooterHeight + 20, {align: 'right'});
        }

        const fileName = `Medec-Report ${currentTime}.pdf`
        doc.save(fileName);

        //window.open(doc.output('bloburl'), '_blank');
    }
}