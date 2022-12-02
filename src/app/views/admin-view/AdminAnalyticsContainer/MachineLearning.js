import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import { render } from "react-dom";

// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Utils
import authenticate from '../../../utils/authenticate';


function MachineLearning() {
    useEffect(()=>{
    authenticate();
  },[]);

    const auth_token = localStorage.getItem('auth_token')
    
    const [svm, setSvm] = useState({
        cross: 0,
        train: 0,
        test: 0,
    });

    const [rfc, setRfc] = useState({
        cross: 0,
        train: 0,
        test: 0
    });

    const [regression, setRegression] = useState({
        cross: 0,
        train: 0,
        test: 0,
    });

    const [modelsAccuracy, setModelsAccuracy] = useState(0)

    const [datasetRatio, setDatasetRatio] = useState({
        trainCount: 0,
        trainPercentage: 0,
        testCount: 0,
        testPercentage: 0,
    })

    // const [accuracyPayload, setAccuracyPayload] = useState ({})
    // console.log('accuracyPayload', accuracyPayload)

    useEffect(() => {
        const fetchAccuracy = async () => {
        const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/symptom-checker/models-accuracy`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });
      
        const data = resultName.data.response;
    
        // console.log('data', data.accuracy_score.dataset.train.train_data_percentage);
        console.log('deyt', parseInt(datasetRatio.trainPercentage))

        setSvm({
            cross: (data.cross_validation_mean_score["SVM Classifier"]*100).toFixed(2),
            train: data.accuracy_score.models["SVM Classifier"].train_data_accuracy.toFixed(2),
            test: data.accuracy_score.models["SVM Classifier"].test_data_accuracy.toFixed(2),
        })

        setRfc({
            cross: (data.cross_validation_mean_score["Random Forest Classifier"]*100).toFixed(2),
            train: data.accuracy_score.models["Random Forest Classifier"].train_data_accuracy.toFixed(2),
            test: data.accuracy_score.models["Random Forest Classifier"].test_data_accuracy.toFixed(2),
        })

        setRegression({
            cross: (data.cross_validation_mean_score["Logistic Regression"]*100).toFixed(2),
            train: data.accuracy_score.models["Logistic Regression"].train_data_accuracy.toFixed(2),
            test: data.accuracy_score.models["Logistic Regression"].test_data_accuracy.toFixed(2),
        })

        setDatasetRatio({
            trainCount: data.accuracy_score.dataset.train.train_data_total,
            trainPercentage: parseInt(data.accuracy_score.dataset.train.train_data_percentage),
            testCount: data.accuracy_score.dataset.test.test_data_total,
            testPercentage: parseInt(data.accuracy_score.dataset.test.test_data_percentage),
            totalDataset: data.accuracy_score.dataset.total_number_of_dataset
        })

        setModelsAccuracy(data.combined_models_accuracy_score.toFixed(2));
    
        } 
    
        fetchAccuracy();
    }, [])

    const conditionalColor = (params) => params<50 ? "#ea5252" : "#4FBF26";

    return (
        <>

        {/* Third Row */}
        <br />
        <div className="admin__extended-row__content charts__div">
        <h1 className="header__title">Machine Learning</h1>
            <h5 className="chart__form__header">Dataset Train/Test Ratio</h5>
            <h6 className="chart__form__subheader">Total No. of Datasets: <span>{datasetRatio.totalDataset}</span></h6>

            <br /><br />
            <div className="chart__center__div">
                <div className="charts__row__div">
                    <div className="admin__large-chart__content">
                    <h6 className="category__header">Train</h6>
                        <h6 className="progress__name2">Train Data Percentage: <span>{`${datasetRatio.trainPercentage}%`}</span></h6>
                        <h6 className="progress__name">Train Data Count <span>{`${datasetRatio.trainCount}`}</span></h6>
                    {/* <div style={{width: '170px', height: '170px', marginLeft: '4rem', paddingTop: '1rem'}}> */}
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={datasetRatio.trainPercentage}
                            text={`${datasetRatio.trainPercentage}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: "#00B2C0",
                                pathColor: "#00B2C0",
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    {/* </div> */}
                    </div>

                    <div className="admin__large-chart__content">
                    <h6 className="category__header">Test</h6>
                    <h6 className="progress__name2">Test Data Percentage: <span>{`${datasetRatio.testPercentage}%`}</span></h6>
                        <h6 className="progress__name">Test Data Count <span>{`${datasetRatio.testCount}`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={datasetRatio.testPercentage}
                            text={`${datasetRatio.testPercentage}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: "#00B2C0",
                                pathColor: "#00B2C0",
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <br />

        {/* First Row */}
        <br />
        <div className="admin__chartbox__content">
            <h5 className="chart__form__header2">Accuracy Score by Train/Test</h5>
            <br /><br />
            <div className="chart__center__div">
                <div className="charts__row__div">
                    <div className="admin__chart__content">
                    <h6 className="category__header">SVM Classifier</h6>
                        <h6 className="progress__name">Train Data Accuracy: <span>{`${svm.train}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={svm.train}
                            text={`${Math.round(svm.train)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(svm.train)}`,
                                pathColor: `${conditionalColor(svm.train)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                    <div className="admin__chart__content">
                    <h6 className="category__header">Random Forest Classifier</h6>
                        <h6 className="progress__name">Train Data Accuracy: <span>{`${rfc.train}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={rfc.train}
                            text={`${Math.round(rfc.train)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(rfc.train)}`,
                                pathColor: `${conditionalColor(rfc.train)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>
                    
                    <div className="admin__chart__content">
                    <h6 className="category__header">Logistic Regression</h6>
                        <h6 className="progress__name">Train Data Accuracy: <span>{`${regression.train}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={regression.train}
                            text={`${Math.round(regression.train)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(regression.train)}`,
                                pathColor: `${conditionalColor(regression.train)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                </div>

                <div className="charts__row__div">
                    <div className="admin__chart__content">
                        <h6 className="progress__name">Test Data Accuracy: <span>{`${svm.test}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={svm.test}
                            text={`${Math.round(svm.test)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(svm.test)}`,
                                pathColor: `${conditionalColor(svm.test)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                    <div className="admin__chart__content">
                        <h6 className="progress__name">Test Data Accuracy: <span>{`${rfc.test}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={rfc.test}
                            text={`${Math.round(rfc.test)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(rfc.test)}`,
                                pathColor: `${conditionalColor(rfc.test)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>
                    
                    <div className="admin__chart__content">
                        <h6 className="progress__name">Test Data Accuracy: <span>{`${regression.test}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={regression.test}
                            text={`${Math.round(regression.test)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(regression.test)}`,
                                pathColor: `${conditionalColor(regression.test)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <br />
        {/* Second Row */}
        <br />
        <div className="admin__chartrow__content charts__div">
            <h5 className="chart__form__header2">Cross Validation Score</h5>

            <div className="chart__center__div">
                <div className="charts__row__div">
                    <div className="admin__chart__content">
                        <h6 className="progress__name">SVM Classifier: <span>{`${svm.cross}%`}</span></h6>
                    {/* <div style={{width: '170px', height: '170px', marginLeft: '4rem', paddingTop: '1rem'}}> */}
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={svm.cross}
                            text={`${Math.round(svm.cross)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(svm.cross)}`,
                                pathColor: `${conditionalColor(svm.cross)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    {/* </div> */}
                    </div>

                    <div className="admin__chart__content">
                        <h6 className="progress__name">Random Forest Classifier: <span>{`${rfc.cross}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={rfc.cross}
                            text={`${Math.round(rfc.cross)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(rfc.cross)}`,
                                pathColor: `${conditionalColor(rfc.cross)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>

                    <div className="admin__chart__content">
                        <h6 className="progress__name">Logistic Regression: <span>{`${regression.cross}%`}</span></h6>
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={regression.cross}
                            text={`${Math.round(regression.cross)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(regression.cross)}`,
                                pathColor: `${conditionalColor(regression.cross)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    </div>
                </div>
            </div>

        </div>

         {/* Fourth Row */}
         <br /><br />
        <div className="admin__chartrow__content charts__div">
            <h5 className="chart__form__header2">Combined Models Accuracy</h5>

            <div className="chart__center__div">
                <div className="charts__row__div">
                    <div className="admin__chart__content">
                        <h6 className="progress__name">Overall Accuracy: <span>{`${modelsAccuracy}%`}</span></h6>
                    {/* <div style={{width: '170px', height: '170px', marginLeft: '4rem', paddingTop: '1rem'}}> */}
                        <div className="admin__progress-circle">
                        <CircularProgressbar
                            value={modelsAccuracy}
                            text={`${Math.round(modelsAccuracy)}%`}
                            backgroundPadding={7}
                            strokeWidth={19}
                            styles={buildStyles({
                                textColor: `${conditionalColor(modelsAccuracy)}`,
                                pathColor: `${conditionalColor(modelsAccuracy)}`,
                                trailColor: "",
                                strokeLinecap: "butt"
                            })}
                        />
                        </div>
                    {/* </div> */}
                    </div>

                </div>
            </div>

        </div>
       
        <br /><br />


        </>
    )
}

export default MachineLearning