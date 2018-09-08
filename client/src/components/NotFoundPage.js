import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return(
        <div className="row">
            <div className="col-md-8 mx-auto">
                <div className="card card-body">
                    <h1 className="card-title text-center mb-5">404 | Page Note Found</h1>
                    <Link to="/" className="btn btn-lg btn-info mt-5">Go Home</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;