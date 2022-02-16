import React from 'react'
import { pages } from '../../constants/url';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/App.css';
import { browserHistory } from 'react-router';
import { createUser } from '../../services/UserService'
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../../components/Loader';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                name: '',
                mobile: '',
                file: ''
            },
            data: {
                name: '',
                mobile: '',
                file: []
            },
            open: false,
            errMessage: '',
            submit: 'Submit'
        }
    }

    onNameChange = (e) => {
        const { target: { value } } = e;
        const { errors, data } = this.state;
        errors.name = '';
        data.name = value;
        this.setState({
            data, errors
        });
    }

    onMobileChange = (e) => {
        const { target: { value } } = e;
        if (!isNaN(+value)) {
            const { errors, data } = this.state;
            errors.mobile = '';
            data.mobile = value;
            this.setState({
                data, errors
            });
        }
    }

    imputFileChange(event) {
        const { target: { value } } = event;
        const { errors, data } = this.state;
        errors.file = '';
        data.file = event.target.files;

        this.setState({
            data, errors
        });
    }

    usernameIsValid = (username) => {
        return /^[A-Za-z\s]+$/.test(username);
    }

    verify() {
        const { errors, data } = this.state;
        let ver = true;

        if (data.name.trim() == '') {
            errors.name = 'Name is required';
            ver = false;
        }

        if (data.name.trim().length > 0 && !this.usernameIsValid(data.name.trim())) {
            errors.name = 'Please enter valid name.';
            ver = false;
        }

        if (data.mobile.trim() == '') {
            errors.mobile = 'Mobile number is required';
            ver = false;
        }

        if (data.mobile.trim().length > 0 && data.mobile.trim().length != 10) {
            errors.mobile = 'Please enter valid mobile number.';
            ver = false;
        }

        if (data.file.length === 0) {
            errors.file = 'Picture is required';
            ver = false;
        }

        this.setState({ errors });
        return ver;
    }

    onSubmitCallback = (response) => {
        if (response.data.status === 200) {
            browserHistory.push(pages.userDetails);
        }
        this.setState({
            submit: 'Submit',
            open: true,
            errMessage: response.data.error
        })
    }

    onSubmit = () => {
        if (this.verify()) {
            const { data } = this.state;

            const formData = new FormData()
            formData.append('name', data.name);
            formData.append('mobile', data.mobile);

            for (var x = 0; x < data.file.length; x++) {
                formData.append('file_name', data.file[x].name);
                formData.append('photo', data.file[x]);
            }
            this.setState({
                submit: <Loader />
            })
            createUser(formData, this.onSubmitCallback);
        }
    }

    msgHide = () => {
        this.setState({ errMessage: '', open: false })
    }

    render() {
        const { errors, data, submit, open, errMessage } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7 mrgnbtm">
                        <div className="form">
                            <h3>ADD USER DETAILS</h3>
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <input type="text" maxLength="50" onChange={(e) => this.onNameChange(e)} value={data.name} className="form-control" name="name" id="name" aria-describedby="mobileHelp" placeholder="Enter Name" />
                                        <p style={{ color: 'red', fontSize: 'small' }}>{errors.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <input type="text" maxLength="10" value={data.mobile} onChange={(e) => this.onMobileChange(e)} className="form-control" name="mobile" id="mobile" aria-describedby="mobileHelp" placeholder="Enter Mobile Number eg. 9650507596" />
                                        <p style={{ color: 'red', fontSize: 'small' }}>{errors.mobile}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <input id="myInput" name="myInput" type="file" accept="image/png, image/gif, image/jpeg" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={e => this.imputFileChange(e)} />
                                        <button type="button" onClick={(e) => this.myInput.click()} className="btn btn-file">Upload Picture</button>
                                    </div>
                                    <div className="form-group col-md-12" style={{ marginTop: 23 }}>
                                        {data.file.length > 0 &&
                                            <p style={{ fontSize: 'small' }}>{data.file.length} picture selected</p>
                                        }
                                        <p style={{ color: 'red', fontSize: 'small' }}>{errors.file}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <button type="button" onClick={() => this.onSubmit()} onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                this.onSubmit()
                                            }
                                        }} className="btn btn-submit">{submit}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    onClose={this.msgHide}
                    autoHideDuration={5000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{errMessage}</span>}
                />
            </div>
        )
    }
}

export default CreateUser