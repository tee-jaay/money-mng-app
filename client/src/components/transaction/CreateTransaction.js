import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { addNewTransaction } from '../../store/actions/transactionActions'

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

class CreateTransaction extends Component {

    state = {
        amount: 0,
        type: '',
        note: ''
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.addNewTransaction(this.state)
        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
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
                        <label htmlFor="type">Type:</label>
                        <select
                            className="form-control"
                            onChange={this.changeHandler}
                            name="type"
                        >
                            <option>Select Type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
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
export default connect(null, { addNewTransaction })(CreateTransaction)