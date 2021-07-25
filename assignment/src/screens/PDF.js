/*
 * Created on Fri Jul 16 2021
 * Author: Saquib Shaikh
 * Github: https://github.com/saquibshaikh14
 * Email: mdsqb0786@gmail.com
 *
 */

import React, { useCallback, useState } from "react";

import { pdfjs,Document, Page } from "react-pdf";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import Dropzone from "../components/Dropzone";
import styles from "../styles/pdf.module.css";


//manually loading workerSrc as stated in documentation
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDF() {
  const [pdfFile, setFile] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const navigatePage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const onDropAccepted = useCallback((acceptedFile) => {
    setFile(acceptedFile[0]);
  }, []);

  const onDropRejected = useCallback((fileRejected) => {
    alert(fileRejected[0]?.errors[0]?.message);
  }, []);

  return (
    <div className="main">
      {pdfFile ? (
        //RENDER PDF
        // <div className="pdf-view">
        //   <Document
        //     file={pdfFile}
        //     onLoadSuccess={({numPages})=>console.log(numPages)}
        //     loading="Page loading"
        //     >
        //       <Page pageNumber={1}
        //       renderTextLayer/>
        //     </Document>
        // </div>
        <div className={`${styles.viewContainer} ${styles.pdf}`}>
          {/* actions */}
          <div className={styles.pdfNav}>
            <div className=" bg-dark text-white">
              <button
                className={styles.navigationBtn}
                disabled={activePage === 1}
                onClick={() => navigatePage(activePage - 1)}
              >
                <FaChevronLeft />
              </button>
              <button
                className={styles.navigationBtn}
                disabled={activePage === totalPage}
                onClick={() => navigatePage(activePage + 1)}
              >
                <FaChevronRight />
              </button>
              <button
                className={styles.navigationBtn}
                onClick={() => {
                  setFile(null);
                  setActivePage(1);
                  setTotalPage(0);
                }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* preview */}
          <div className={styles.pdfView}>
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages }) => setTotalPage(numPages)}
              loading="Page loading"
              renderMode="svg"
            >
              <Page pageNumber={activePage} renderTextLayer={false} />
            </Document>
          </div>
        </div>
      ) : (
        //drag n drop to select file
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept=".pdf"
        />
      )}
    </div>
  );
}
