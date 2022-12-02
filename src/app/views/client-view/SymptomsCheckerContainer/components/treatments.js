import React from 'react'

// Components
import TreatmentsPage1 from './TreatmentsPage1';
import TreatmentsPage2 from './TreatmentsPage2';
import TreatmentsPage3 from './TreatmentsPage3';

function Treatments() {
  const [breadcrumbProgress, setBreadcrumbProgress] = React.useState(
		JSON.parse(localStorage.getItem("breadcrumbProgress")) 
  );

  const firstRender = () => {
    setBreadcrumbProgress(prevInfo => ({
      ...prevInfo,
      twoQuarters: true,
			threeQuarters: true,
			fourQuarters: true,
		}));
	}
  
  const constant = 0;
  
  React.useEffect(() => {
    firstRender()
  }, [constant])
  
  React.useEffect(() => {
    localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])
  
  const [treatmentsPage, setTreatmentsPage] = React.useState(1);
  

  // Proceed to next page
  const nextPage = () => {
    const currentPage = treatmentsPage;
    setTreatmentsPage(currentPage => currentPage + 1)
  };

  // Go back to prev page
  const prevPage = () => {
    const currentPage = treatmentsPage;
    setTreatmentsPage(currentPage => currentPage - 1)
  };

  console.log('page', treatmentsPage);

  switch (treatmentsPage) {
    case 1:
      return (
        <center>
          <TreatmentsPage1 nextPage={nextPage} />

          {/* <a className='treatments__prev__page' href="conditions"><span>〈 </span> Previous</a> */}
        </center>
      );

    case 2:
      return (
        <center>
          <TreatmentsPage2 prevPage={prevPage} nextPage={nextPage} />

          {/* <a className='treatments__prev__page' href="conditions"><span>〈 </span> Previous</a> */}
        </center>
      );

    case 3:
      return (
        <center>
          <TreatmentsPage3 prevPage={prevPage} />

          {/* <a className='treatments__prev__page' href="conditions"><span>〈 </span> Previous</a> */}
        </center>
      );

    default:
      (console.log('This is a multi-page form built with React.'))
  }
      
}

export default Treatments