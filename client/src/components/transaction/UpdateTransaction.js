import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { updateTransaction } from '../../store/actions/transactionActions'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

class UpdateTransaction extends Component {

    state = {
        amount: 0,
        note: ''
    }

    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note
        })
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.updateTransaction(this.props.transaction._id, this.state)
        this.props.close()
    }

    render() {
        let { amount, note } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h3>Add New Transaction</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            placeholder="Enter your amount"
                            name="amount"
                            id="amount"
                            value={amount}
                            className='form-control'
                            onChange={this.changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="note">Note:</label>
                        <textarea
                            placeholder="Enter your note"
                            name="note"
                            id="note"
                            value={note}
                            className='form-control'
                            onChange={this.changeHandler}
                        />
                    </div>
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </Modal>
        )
    }
}
export default connect(null, { updateTransaction })(UpdateTransaction)