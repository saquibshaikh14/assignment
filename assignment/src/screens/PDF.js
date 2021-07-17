/*
 * Created on Fri Jul 16 2021
 * Author: Saquib Shaikh
 * Github: https://github.com/saquibshaikh14
 * Email: mdsqb0786@gmail.com
 *
 */


import React, { useCallback, useState } from 'react';

import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import {  FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

import Dropzone from '../components/Dropzone';
import { func } from 'prop-types';



export default function PDF() {

  const [pdfFile, setFile] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(1);



  const navigatePage = (pageNumber) => {
    setActivePage(pageNumber);
  }


  const onDropAccepted = useCallback(acceptedFile=>{
    console.log(acceptedFile[0]);
    setFile(acceptedFile[0]);
  }, []);

  const onDropRejected = useCallback((fileRejected)=>{
    alert(fileRejected[0]?.errors[0]?.message);
  }, []);

  return (
    <div className="main">
      {
        pdfFile?
        //RENDER PDF
        (
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
          <div className="view-container pdf">
            <div className="pdf-nav">
              <div className=" bg-dark text-white">
                <button className="navigation-btn prev" disabled={activePage===1} onClick={()=>navigatePage(activePage - 1)}>
                  <FaChevronLeft/>
                </button>
                <button className="navigation-btn next" disabled={activePage===totalPage} onClick={()=>navigatePage(activePage + 1)}>
                  <FaChevronRight/>
                  </button>
                  <button className="navigation-btn close" onClick={()=>setFile(null)}>
                    <FaTimes/>
                  </button>
              </div>
            </div>
            <div className="pdf-view">
              <Document
                file={pdfFile}
                onLoadSuccess={({numPages})=>setTotalPage(numPages)}
                loading="Page loading"
                >
                  <Page pageNumber={activePage} />
                </Document>
                
            </div>
          </div>
        ):
        //drag n drop to select file
        (
          <Dropzone onDropAccepted={onDropAccepted} onDropRejected={onDropRejected} accept=".pdf" />
        )
      }
    </div>
  )
}
