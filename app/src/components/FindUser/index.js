import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/App.css';
import { getUsersCount, getUser } from '../../services/UserService'
import Loader from '../../components/Loader';
import { serverURL } from '../../constants/url';

class FindUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {
                mobile: ''
            },
            data: {
                mobile: ''
            },
            user: '',
            numberOfUsers: 0,
            open: false,
            errMessage: '',
            submit: 'Submit'
        }
    }
    getUsersCountCallback = (response) => {
        if (response.data.status === 200) {
            response.data.data.length > 0 && this.setState({ numberOfUsers: response.data.data[0].userCount })
        }
        else {
            this.setState({
                open: true,
                errMessage: response.data.error
            })
        }
    }

    componentDidMount() {
        getUsersCount(this.getUsersCountCallback);
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

    verify() {
        const { errors, data } = this.state;
        let ver = true;

        if (data.mobile.trim() == '') {
            errors.mobile = 'Mobile number is required';
            ver = false;
        }

        if (data.mobile.trim().length > 0 && data.mobile.trim().length != 10) {
            errors.mobile = 'Please enter valid mobile number.';
            ver = false;
        }

        this.setState({ errors });
        return ver;
    }

    getUserCallback = (response) => {
        if (response.data.status === 200) {
            if (response.data.data.length > 0)
                this.setState({ user: response.data.data[0], submit: 'Submit' })
            else {
                this.setState({
                    user: '', submit: 'Submit', open: true,
                    errMessage: response.data.error
                })
            }
        }
        else {
            this.setState({
                submit: 'Submit',
                open: true,
                errMessage: response.data.error
            })
        }
    }

    onSubmit = () => {
        if (this.verify()) {
            this.setState({
                submit: <Loader />
            })
            getUser(this.state.data, this.getUserCallback)
        }
    }

    msgHide = () => {
        this.setState({ errMessage: '', open: false })
    }

    render() {
        const { user, errors, data, numberOfUsers, submit, open, errMessage, server_url } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7 mrgnbtm">
                        <div className="form">
                            <h6>TOTAL USERS: {numberOfUsers}</h6>
                            <h3 style={{ marginTop: '40px' }}>FIND USER DETAILS</h3>
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <input type="text" maxLength="10" value={data.mobile}
                                            onChange={(e) => this.onMobileChange(e)} className="form-control"
                                            name="mobile" id="mobile" placeholder="Enter Mobile Number eg. 9650507596" />
                                        <p style={{ color: 'red', fontSize: 'small' }}>{errors.mobile}</p>
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
                                {user &&
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <p>NAME: {user.name}</p>
                                            <p>MOBILE NUMBER: {user.mobile_no}</p>
                                            <p>DATE OF REGISTRATION: {user.dtti_created}</p>
                                            <p style={{ textAlign: 'center' }}>PHOTO</p>
                                            <p style={{ textAlign: 'center' }}><img className="img-avatar" style={{ width: '250px'}} src={serverURL.url + user.image_path} alt="" /></p>
                                        </div>
                                    </div>
                                }
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

export default FindUser