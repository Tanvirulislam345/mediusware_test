import React, { useState } from 'react';
import { useEffect } from 'react';

const Problem1 = () => {

    const [data, setData] = useState({ name: "", status: "" });
    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [show, setShow] = useState('all');



    const handleSubmit = (e) => {
        e.preventDefault();
        setAllData(pre => [...pre, data])
        setFilterData(pre => [...pre, data])
        setData({ name: "", status: "" })
    }

    const handleClick = (val) => {
        setShow(val);
    };

    useEffect(() => {
        if (show === "all") {
            const data1 = allData.filter(data => data.status == "active")
            const data2 = allData.filter(data => data.status === "completed")
            const data3 = allData.filter(data => data.status !== "active" && data.status !== "completed")
            setFilterData([...data1, ...data2, ...data3])
        } else if (show === "active") {
            const data = allData.filter(data => data.status === show)
            setFilterData(data)
        } else if (show === "completed") {
            const data = allData.filter(data => data.status === show)
            setFilterData(data)
        }
    }, [show])


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text"
                                className="form-control"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </div>
                        <div className="col-auto">
                            <input type="text"
                                className="form-control"
                                placeholder="Status"
                                value={data.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterData.map((data, index) => <tr key={index}>
                                <td scope="col">{data.name}</td>
                                <td scope="col">{data.status}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;