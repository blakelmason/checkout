class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: 'checkout',
      id: ''
    }
  }

  changeForm = value => this.setState({ form: value })

  next1 = data => {
    this.setState({ form: 'loading' }, () =>
      axios
        .post('/record', data)
        .then(res => this.setState({ form: 'form2', id: res.data.insertId }))
    )
  }

  next2 = data => {
    this.setState({ form: 'loading' }, () =>
      axios
        .put('/record', { data, id: this.state.id })
        .then(res => this.setState({ form: 'form3' }))
    )
  }

  submit = data => {
    this.setState({ form: 'loading' }, () =>
      axios
        .put('/record', { data, id: this.state.id })
        .then(res => this.setState({ form: 'checkout' }))
    )
  }

  render() {
    return (
      <div className="container-fluid my-5">
        {
          {
            loading: <Loading />,
            checkout: <Checkout changeForm={this.changeForm} />,
            form1: <Form1 next={this.next1} />,
            form2: <Form2 next={this.next2} />,
            form3: <Form3 submit={this.submit} />
          }[this.state.form]
        }
      </div>
    )
  }
}

//

function Loading() {
  return <div className="text-center h1">Loading</div>
}

//

class Checkout extends React.Component {
  state = {
    data: []
  }
  componentDidMount() {
    axios
      .get('/record')
      .then(({ data }) => this.setState({ data }))
      .catch(err => console.error(err))
  }

  deleteData = () =>
    axios
      .delete('/record')
      .then(() => this.setState({ data: '' }))
      .catch(err => console.error(err))

  render() {
    const { data } = this.state
    const { changeForm } = this.props
    return (
      <div className="text-center">
        <button
          className="btn-lg btn-primary mb-4"
          onClick={() => changeForm('form1')}
        >
          CHECKOUT
        </button>
        <div>
          <button className="btn-lg btn-danger mb-4" onClick={this.deleteData}>
            Delete Data
          </button>
        </div>
        {data.length > 0 && (
          <div>
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  {Object.keys(data[0]).map(key => (
                    <th key={'th' + key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={'tr' + i}>
                    {Object.keys(item).map((key, i2) => (
                      <td key={item + i + i2}>{item[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

//

class Form1 extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handler = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <div className="text-center h3">User Info</div>
        <hr />
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handler}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.next(this.state)}
          >
            Next
          </button>
        </form>
      </div>
    )
  }
}

//

class Form2 extends React.Component {
  state = {
    shipTo1: '',
    shipTo2: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  }

  handler = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <div className="text-center h3">Shipping Address</div>
        <hr />
        <form>
          <div className="form-group">
            <label>Line 1</label>
            <input
              type="text"
              className="form-control"
              name="shipTo1"
              value={this.state.shipTo1}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={this.state.city}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={this.state.state}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={this.state.zip}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={this.state.phone}
              onChange={this.handler}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.next(this.state)}
          >
            Next
          </button>
        </form>
      </div>
    )
  }
}

//

class Form3 extends React.Component {
  state = {
    creditCard: '',
    expDate: '',
    cvv: '',
    billingZip: ''
  }

  handler = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <div className="text-center h3">Credit Card</div>
        <hr />
        <form>
          <div className="form-group">
            <label>Credit Card #</label>
            <input
              type="text"
              className="form-control"
              name="creditCard"
              value={this.state.creditCard}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="date"
              className="form-control"
              name="expDate"
              value={this.state.expDate}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              className="form-control"
              name="cvv"
              value={this.state.cvv}
              onChange={this.handler}
            />
          </div>
          <div className="form-group">
            <label>Billing Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="billingZip"
              value={this.state.billingZip}
              onChange={this.handler}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.submit(this.state)}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
