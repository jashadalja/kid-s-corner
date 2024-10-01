import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../assets/story3.pdf';
import React, { useState, useEffect } from 'react';
import './Story1.css'; // Import the external CSS file for styles

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <h1 className="page-header"></h1>
            <p>{props.children}</p>
            <p className="page-number">Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = "Pages";

function Story3() {
    const [numPages, setNumPages] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="flipbook-container">
            <h1 className='storyHeading'>Story : The Lion And The Mouse</h1>
            <div className="back-button" onClick={() => window.history.back()}>&#129136;</div>
            <HTMLFlipBook width={450} height={528} >
                {
                    [...Array(numPages).keys()].map((pg) => (
                        <Pages key={pg} number={pg + 1}>
                            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pg} width={400} />
                            </Document>
                            <p>Page {pg + 1} of {numPages}</p>
                        </Pages>
                    ))
                }
            </HTMLFlipBook>
        </div>
    );
}

export default Story3;
