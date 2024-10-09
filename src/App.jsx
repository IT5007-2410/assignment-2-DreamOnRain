/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555, email: 'jack@u.nus.edu',
    age: 25, passportNumber: 'A123456',
    bookingTime: new Date().toLocaleString(), bookingNumber: 'SG123', bookingSeat: '01A',
  },
  {
    id: 2, name: 'Rose', phone: 88884444, email: 'rose@u.nus.edu',
    age: 22, passportNumber: 'A456789',
    bookingTime: new Date().toLocaleString(), bookingNumber: 'SG234', bookingSeat: '02B',
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
    {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.age}</td>
      <td>{traveller.passportNumber}</td>
      <td>{traveller.bookingTime}</td>
      <td>{traveller.bookingNumber}</td>
      <td>{traveller.bookingSeat}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Age</th>
          <th>Passport Number</th>
          <th>Booking Time</th>
          <th>Booking Number</th>
          <th>Booking Seat</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers && travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}


class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    this.props.bookTraveller({
      name: form.travellerName.value,
      phone: form.travellerPhone.value,
      email: form.travellerEmail.value,
      age: form.travellerAge.value,
      passportNumber: form.travellerPassport.value,
      bookingTime: new Date().toLocaleString(),
      bookingNumber: form.travellerBookingNumber.value,
      bookingSeat: form.travellerBookingSeat.value,
    });
    form.travellerName.value = '';
    form.travellerPhone.value = '';
    form.travellerEmail.value = '';
    form.travellerAge.value = '';
    form.travellerPassport.value = '';
    form.travellerBookingNumber.value = '';
    form.travellerBookingSeat.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <label>Name: </label>
        <input type="text" name="travellerName"/>
        <br />
        <label>Phone: </label>
        <input type="text" name="travellerPhone"/>
        <br />
        <label>Email: </label>
        <input type="text" name="travellerEmail"/>
        <br />
        <label>Age: </label>
        <input type="text" name="travellerAge"/>
        <br />
        <label>Passport Number: </label>
        <input type="text" name="travellerPassport"/>
        <br />
        <label>Booking Number: </label>
        {/* <input type="select" name="travellerBookingNumber"/>*/}
        <select name="travellerBookingNumber">
          <option key="SG123" value="SG123">SG123</option>
          <option key="SG234" value="SG234">SG234</option>
          <option key="SG345" value="SG345">SG345</option>
        </select>
        <br />
        <label>Booking Seat: </label>
        <select name="travellerBookingSeat">
          {this.props.seats[0].seats.map((row, rowIndex) => (
            row.map((seat, colIndex) => (
              <option key={'0' + `${colIndex + 1}` + String.fromCharCode(65 + rowIndex)} value={'0' + `${colIndex + 1}` + String.fromCharCode(65 + rowIndex)}>
                {'0' + `${colIndex + 1}` + String.fromCharCode(65 + rowIndex)}
              </option>
            )))
          )}
        </select>
        <br />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deleteTraveller({
      name: form.travellerName.value,
      passportNumber: form.travellerPassport.value,
    });
    form.travellerName.value = '';
    form.travellerPassport.value = '';
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
      {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <label>Name: </label>
        <input type="text" name="travellerName"/>
        <br />
        <label>Passport Number: </label>
        <input type="text" name="travellerPassport"/>
        <br />
        <button>Delete</button>
      </form>
    );
  }
}


class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        {this.props.seats.map((ride, rideIndex) => {
        const count = ride.seats.reduce((total, row) => {
          return total + row.filter((seat) => seat === 'unreserved').length;
        }, 0);

        return (
          <div key={rideIndex} style={{ marginBottom: '20px' }}>
            <hr />
            <h3>Ride Number: {ride.rideNumber}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ride.seats.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                  {row.map((seat, colIndex) => (
                    <div
                      key={colIndex}
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '5px',
                        backgroundColor: seat === 'unreserved' ? 'green' : 'grey',
                        border: '1px solid black',
                        display: 'flex',
                      }}
                    >
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <h4>Unreserved Seats: {count} / 10</h4>
          </div>
        );
        })}
        <hr />
        <div className="flex">
        <div
          key="label_unreserved"
          style={{
            width: '40px',
            height: '40px',
            margin: '5px',
            backgroundColor: 'green',
            border: '1px solid black',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
        </div>
        <span>Unreserved</span>
        <div
          key="label_reserved"
          style={{
            width: '40px',
            height: '40px',
            margin: '5px',
            backgroundColor: 'grey',
            border: '1px solid black',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
        </div>
        <span>Reserved</span>
        </div>
    </div>);
  }
}


class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.emptySeats = [
      {
        rideNumber: 'SG123',
        seats: Array(2).fill().map(() => Array(5).fill('unreserved'))
      },
      {
        rideNumber: 'SG234',
        seats: Array(2).fill().map(() => Array(5).fill('unreserved'))
      },
      {
        rideNumber: 'SG345',
        seats: Array(2).fill().map(() => Array(5).fill('unreserved'))
      }
    ];
    this.state = { seats: this.emptySeats };
  }

  setSelector(value)
  {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    if (value === 1) {
      this.setState({selector: 1});
    }
    if (value === 2) {
      this.setState({selector: 2});
    }
    if (value === 3) {
      this.setState({selector: 3});
    }
    if (value === 4) {
      this.setState({selector: 4});
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
    initialTravellers.forEach((traveller) => {
      this.updateSeats(traveller, 'add');
    }
    );
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    if (newTravellers.some(traveller => passenger.bookingNumber === traveller.bookingNumber && passenger.bookingSeat === traveller.bookingSeat)) {
      alert('Seat is reserved');
      return;
    }
    newTravellers.push({
      id: this.state.travellers.length + 1,
      name: passenger.name,
      phone: passenger.phone,
      email: passenger.email,
      age: passenger.age,
      passportNumber: passenger.passportNumber,
      bookingTime: passenger.bookingTime,
      bookingNumber: passenger.bookingNumber,
      bookingSeat: passenger.bookingSeat,
    });
    this.setState({travellers: newTravellers});
    this.updateSeats(passenger, 'add');
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    const index = newTravellers.findIndex(traveller => traveller.name === passenger.name && traveller.passportNumber === passenger.passportNumber);
    if (index < 0) {
      alert('Traveller not found');
      return;
    }
    newTravellers.splice(index, 1);
    this.setState({travellers: newTravellers});
    passenger.bookingNumber = this.state.travellers[index].bookingNumber;
    passenger.bookingSeat = this.state.travellers[index].bookingSeat;
    this.updateSeats(passenger, 'delete');
  }

  updateSeats(passenger, type) {
    const curSeat = passenger.bookingSeat;
    const row = curSeat.charCodeAt(2) - 65;
    const col = parseInt(curSeat[1]) - 1;
    const newSeats = this.state.seats;
    const rideIndex = newSeats.findIndex(ride => ride.rideNumber === passenger.bookingNumber);
    newSeats[rideIndex].seats[row][col] = type === 'add' ? 'reserved' : 'unreserved';
    this.setState({ seats: newSeats });
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
      <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(1)}>Homepage</button>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(2)}>Display</button>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(3)}>Add</button>
            <button onClick={() => this.setSelector(4)}>Delete</button>
          </nav>
      </div>
      <div>
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
        {this.state.selector === 1 && <Homepage seats={this.state.seats}/>}
        {/*Q3. Code to call component that Displays Travellers.*/}
        {this.state.selector === 2 && <Display travellers={this.state.travellers}/>}
        {/*Q4. Code to call the component that adds a traveller.*/}
        {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} seats={this.state.seats}/>}
        {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller}/>}
      </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
