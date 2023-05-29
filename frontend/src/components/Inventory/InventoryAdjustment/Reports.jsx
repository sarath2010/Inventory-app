import axios from 'axios'
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const Reports = () => {

    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();

    const getReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/adjust-reports');
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSpecificDate = async (e) => {
        e.preventDefault();
        await getDateRangeReports();
    };

    const reset = async (e) => {
        e.preventDefault();
        setStartDate(new Date());
        setEndDate(new Date());
        await getReports();
    }

    const getDateRangeReports = async () => {
        try {
            const start = startDate.toISOString();
            const end = endDate.toISOString();
            const response = await axios.post(`http://localhost:5000/date-range-reports/${start}/${end}`);
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);;
        }
    }

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    useEffect(() => {
        getReports();
    }, [])


    return (
        <>
            <Navbar />
            
            <div className="col-sm-12 col-lg-2 d-flex align-items-center mb-3">
                <div className="form-group mr-3 ms-3">
                    <label htmlFor="startDate" className="mr-2"> <h5>Start Date:</h5> </label>
                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => { setStartDate(date) }} shouldCloseOnSelect={true} />
                </div>
            </div>

            <div className="col-sm-12 col-lg-2 d-flex align-items-center mb-3">
                <div className="form-group mr-3 ms-3">
                    <label htmlFor="endDate" className="mr-2 analysis-label"> <h5>End Date:</h5> </label>
                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => { setEndDate(date) }} shouldCloseOnSelect={true} />
                </div>
            </div>

            <div className="col-sm-12 col-lg-2">
                <button onClick={handleSpecificDate} className="btn btn-primary mt-4 ms-3">Filter</button>
            </div>

            <div className="col-sm-12 col-lg-2">
                <button onClick={reset} className="btn btn-primary mt-4 ms-3">Reset</button>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Mode of Adjustment</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Value</th>
                            <th scope="col">Reference Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.item_name}</td>
                                    <td>{value.mode_of_adjustment}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.value}</td>
                                    <td>{value.reference_number}</td>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.reason}</td>
                                    <td>{value.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Reports