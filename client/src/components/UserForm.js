import React from 'react';
import classnames from 'classnames';
import isEmail from 'validator/lib/isEmail';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState(() => ({
                errors: nextProps.errors
            }));
        }
    };

    onEmailChange(e) {
        let email = e.target.value;
        this.setState(() => ({
            email
        }));
    };

    onPasswordChange(e) {
        let password = e.target.value;
        this.setState(() => ({
            password
        }));
    };

    onFormSubmit(e) {
        e.preventDefault();

        if (!this.state.email) {
            this.setState(() => ({
                errors: { email: 'Email Cannot Be Empty' }
            }));
            return;
        } else if (!isEmail(this.state.email)) {
            this.setState(() => ({
                errors: { email: 'Email is Invalid' }
            }));
        }
        if (!this.state.password) {
            this.setState(() => ({
                errors: { password: 'Password Cannot Be Empty' }
            }));
            return;
        } else if (this.state.password.length < 6) {
            this.setState(() => ({
                errors: { password: 'Password Must Be 6 Chars Long' }
            }));
            return;
        }

        this.props.onSubmit({
            email: this.state.email,
            password: this.state.password
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-sm-10 mx-auto">
                    <div className="card">
                        <div className="card-header">{this.props.formName}</div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className={classnames('form-control', {
                                            'is-invalid': this.state.errors.email
                                        })}
                                        value={this.state.email}
                                        onChange={this.onEmailChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.state.errors.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        className={classnames('form-control', {
                                            'is-invalid': this.state.errors.password
                                        })}
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.state.errors.password}
                                    </div>
                                </div>
                                <button className="btn btn-dark">{this.props.formName}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserForm;