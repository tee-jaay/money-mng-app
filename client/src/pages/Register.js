import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../store/actions/authActions'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }

    static getDrivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }
        return null
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        let { name, email, password, confirmPassword } = this.state
        this.props.register({ name, email, password, confirmPassword }, this.props.history)
    }

    render() {
        let { name, email, password, confirmPassword, error } = this.state
        // console.log(this.props)
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">
                        Registration
                    </h1>

                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                id="name"
                                value={name}
                                className={error.name ? 'form-control is-invalid' : 'form-control'}
                                onChange={this.changeHandler}
                            />
                            {error.name && <div className='invalid-feedback'>
                                {error.name}
                            </div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                id="email"
                                value={email}
                                className={error.email ? 'form-control is-invalid' : 'form-control'}
                                onChange={this.changeHandler}
                            />
                            {error.email && <div className='invalid-feedback'>
                                {error.email}
                            </div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                id="password"
                                value={password}
                                className={error.password ? 'form-control is-invalid' : 'form-control'}
                                onChange={this.changeHandler}
                            />
                            {error.password && <div className='invalid-feedback'>
                                {error.password}
                            </div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm your Password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                onChange={this.changeHandler}
                            />
                            {error.confirmPassword && <div className='invalid-feedback'>
                                {error.confirmPassword}
                            </div>}
                        </div>

                        <Link to='/login'>Already have an Account? Login here</Link>

                        <button className="btn btn-primary my-3 d-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { register })(Register)