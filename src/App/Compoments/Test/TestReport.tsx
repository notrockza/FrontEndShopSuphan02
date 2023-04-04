import { useReactToPrint } from "react-to-print";
import { forwardRef, MutableRefObject, useRef } from "react";



export const TestReport = () => {
    
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp0data',
  });


  const PrintWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div ref={ref}>
      {children}
    </div>
  );
});



  return (
    <div>
    <PrintWrapper ref={componentRef}>
        {/* Your content here */}
        test
        
      </PrintWrapper>
        {/* <div ref={componentRef}>test</div> */}
    
        <button onClick={handlePrint}>Print 1</button>

    </div>
  );
};
