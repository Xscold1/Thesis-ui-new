import React, { useEffect } from 'react'

// Components
import DatasetsList from './DatasetsList';
import authenticate from '../../../utils/authenticate';

function ViewDatasets() {
    useEffect(()=>{
        authenticate();
    },[]);

    return (
        <div className="admin__large__content">
            <h1 className="header__title">View Datasets</h1>

            <h5 className="form__header">Disease Datasets</h5>

            <DatasetsList />
        </div>
    )
}

export default ViewDatasets