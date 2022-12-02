import React from 'react'

// JSON Libraries
import RegionIII from '../../Components/Region-III.json';

function PatientStep3(props) {
    const proceed = e => {
        e.preventDefault();
        props.nextStep();
    };

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

        const { values, handleAddress } = props;

        const addressArr = values.address.split(', ');

        // console.log('addressArr[2]', addressArr[2])
        // console.log('addressArr[1]', addressArr[1])
        // console.log('addressArr[0]', addressArr[0])

        const [province, setProvince] = React.useState(addressArr[2] || 'PAMPANGA');
        const [municipality, setMunicipality] = React.useState(addressArr[1] || 'FLORIDABLANCA')
        const [barangay, setBarangay] = React.useState(addressArr[0] || '')


        const handleProvince = e => {
            setProvince(e.target.value)
            setMunicipality('')
            setBarangay('')
        }

        const handleMunicipality = e => {
            setMunicipality(e.target.value)
            setBarangay('')
        }

        const handleBarangay = e => {
            setBarangay(e.target.value)
        }

        let fullAddress = `${barangay}, ${municipality}, ${province}`;
        // console.log('fullAddress:', fullAddress)

        const provinces = Object.keys(RegionIII);
        const provinceList = provinces.map(provinceName => {
            return (
                <option key={provinceName} id={provinceName} value={provinceName} selected={provinceName === addressArr[2]}>{provinceName}</option>
            )
        })

        const municipalities = province ? Object.keys(RegionIII[province].municipality_list) : [];
        const municipalityList = municipalities.map(municipalityName => {
            return (
                <option key={municipalityName}>{municipalityName}</option>
            )
        })

        const barangays = municipality ? RegionIII[province].municipality_list[municipality].barangay_list : [];
        const barangayList = barangays.map(barangayName => {
            return (
                <option key={barangayName}>{barangayName}</option>
            )
        })

        // Checkbox state for address
        const [isChecked, setIsChecked] = React.useState(province !== '' && municipality !== '' && barangay !== '' ? true : false);

        function handleChecked() {
            setIsChecked(prevState => prevState = !prevState);
        }
       
        return (
            <center>
            <div className="main__content">
                <p className="step__indicator">Step 3/5</p>

                <label className="age__label">Enter Adress:</label>
                {/* <br /><br /> */}
                <p className="address__subtitle">[Region III]</p>

                <div className="address__div">
                    <select className="address__dropdown no__arrow" disabled name="province" id="province" onChange={handleProvince}>
                        <option value={province} hidden disabled="disabled" selected>{province}</option>
                        {/* {provinceList} */}
                    </select>

                    <select className="address__dropdown no__arrow" disabled name="municipality" id="municipality" onChange={handleMunicipality} value={municipality}>
                        <option value={municipality} hidden disabled="disabled" selected>{municipality}</option>
                        {/* {municipalityList} */}
                    </select>

                    <select className="address__dropdown" name="barangay" id="barangay" disabled={municipality ? '' : 'disabled'} onChange={handleBarangay} onClick={() => handleAddress(fullAddress)} value={barangay}>
                        <option value="" hidden disabled="disabled" selected>Enter Barangay</option>
                        {barangayList}
                    </select>


                    {/* <input onChange={handleChange('address')} value={`${barangay}, ${municipality}, ${province}`}></input> */}
                </div>
                
                {/* <p className="address__terms"> By proceeding, you agree to the <span>terms and conditions</span></p> */}
                <label htmlFor="addressCheckbox" className="address__terms"><input checked={isChecked} onClick={handleChecked} className="form-check-input address__checkbox" type="checkbox" id="addressCheckbox" name="addressCheckbox" value="agreeCheck" /> I agree to <span>share my address information</span></label>
            </div>

            <div className="patient-info__buttons">
                <a className="patient-info__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="patient-info__next" disabled={province !== '' && municipality !== '' && barangay !== '' && isChecked ? '' : 'disabled'} onClick={proceed}>Next</button> 
                {/* <button className="patient-info__next" disabled={province !== '' && municipality !== '' && barangay !== '' ? '' : 'disabled'} onClick={() => handleAddress(fullAddress)}>Change</button>  */}
            </div>
            </center>
        );
}

export default PatientStep3