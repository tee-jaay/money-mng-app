import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTransactions } from '../store/actions/transactionActions'
import CreateTransaction from '../components/transaction/CreateTransaction'

class Dashboard extends Component {

    state = {
        createModalOpen: false
    }

    componentDidMount() {
        this.props.loadTransactions()
    }

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    render() {
        let { auth, transactions } = this.props
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name}</h1>
                    <p>Your email is {auth.user.email}</p>

                    <button
                        className='btn btn-primary my-2'
                        onClick={this.openCreateModal}
                    >
                        Create New Transaction
                    </button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />

                    <br />
                    <h2>Transactions</h2>
                    <ul className="list-group">
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className="list-group-item">
                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions })(Dashboard)