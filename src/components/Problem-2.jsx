import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Problem2 = () => {
    const [data, setData] = useState(null);
    const [clicked1, setClicked1] = useState("");
    const [show, setShow] = useState(false);
    const [toggle, setToogle] = useState(false);
    console.log(toggle)


    const handleClose = () => setShow(false);

    const handleShow = (modal) => {
        setClicked1(modal)
        setShow(true)
    };

    const handleAll = (modal) => {
        if (modal === "modala") {
            setClicked1("modala")
            setShow(true)
            axios.get('https://contact.mediusware.com/api/contacts/')
                .then(res => setData(res.data.results))
        } else if (modal === "modalb") {
            setClicked1("modalb")
            setShow(true)
            axios.get('https://contact.mediusware.com/api/country-contacts/United%20States/')
                .then(res => setData(res.data.results))
        }

    }
    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={() => handleShow("modala")}
                    >All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button"
                        onClick={() => handleShow("modalb")}
                    > US Contacts</button>
                    {clicked1 === "modala" && <ModalA show={show} handleClose={handleClose}
                        handleAll={handleAll} data={data} toggle={toggle} setToogle={setToogle} />}
                    {clicked1 === "modalb" && <ModalB show={show} handleClose={handleClose} handleAll={handleAll} data={data} />}

                </div>

            </div>
        </div >
    );
};

export default Problem2;


function ModalA({ show, handleClose, data, handleAll, toggle, setToogle }) {


    return (

        <Modal show={show}>
            <Modal.Header closeButton className="d-flex justify-content-center flex-column gap-3">
                <input type="text" />
                <Button variant="primary" style={{ color: "#46139f", background: "white" }} onClick={() => handleAll("modala")}>
                    All Contacts
                </Button>
                <Button variant="primary" onClick={() => handleAll("modalb")}>
                    US Contacts
                </Button>
                <Button variant="primary" onClick={handleClose} style={{ border: "1px solid #46139f", background: "white", color: "black" }}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                {

                    data?.map(count => <Modals3 key={count.id} count={count}> </Modals3>)
                }

            </Modal.Body>

            <Modal.Footer>
                <input type="checkbox" onChange={() => setToogle(!toggle)} /> <label>Only Even</label>
            </Modal.Footer>
        </Modal>

    );
}
function ModalB({ show, handleClose, data, handleAll }) {



    return (
        <Modal show={show}>
            <Modal.Header closeButton className="d-flex  justify-content-center flex-column gap-3">
                <input type="text" />
                <Button variant="primary" style={{ color: "#46139f", background: "white" }} onClick={() => handleAll("modala")}>
                    All Contacts
                </Button>
                <Button variant="primary" style={{ color: "#ff7f50" }} onClick={() => handleAll("modalb")}>
                    Us Contacts
                </Button>
                <Button variant="primary" onClick={handleClose} style={{ border: "1px solid #46139f", background: "white", color: "black" }}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                {
                    data?.map(count => <Modals3 key={count.id} count={count}> </Modals3>)
                }

            </Modal.Body>
            <Modal.Footer>
                <input type="checkbox" /> <label>Only Even</label>
            </Modal.Footer>
        </Modal>

    );
}

function Modals3({ count }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <p onClick={handleShow} style={{ border: "1px solid red", margin: "2px" }}>
                {count.phone}
            </p>

            <Modal show={show} onHide={handleClose} animation={false}>

                <Modal.Body>
                    {count?.country.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}





