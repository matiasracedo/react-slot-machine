import React from 'react';
import moment from 'moment';
const { createRef , Component } = React;

class Slots extends Component {
  static defaultProps = {
    slots: ["7", "2", "3", "4", "5", "6", "7", "8", "9", "1"]
  };

  constructor(props) {
    super(props);
    this.state = { slot1: "", slot2: "", slot3: "", rolling: false, id: -1 };

    // get ref of dic on which elements will roll
    this.slotRef = [createRef(), createRef(), createRef()];
  }
  restart = () => {
    this.props.setBalance(99.99)
    this.props.setRows([])
        this.setState({ slot1: "", slot2: "", slot3: "", rolling: false, id: -1 })    
  }
  // to trigger roolling and maintain state
  roll = () => {
    this.props.setBalance(prev => prev - 1) 
    this.setState({
      rolling: true,
      id: this.state.id + 1  
    });
    setTimeout(() => {
      this.setState({ rolling: false });
    }, 700);

    // looping through all 3 slots to start rolling
    this.slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = this.triggerSlotRotation(slot.current);
      this.setState({ [`slot${i + 1}`]: selected });
    });
    setTimeout(() => {
        this.props.setRows(this.props.rows.concat({ 
            id: (this.state.id + 1), 
            slot1: this.state.slot1, 
            slot2: this.state.slot2, 
            slot3: this.state.slot3, 
            date: moment().format("ddd, MMM Do YYYY, h:mm:ss a") }))
      }, 200);
      
      setTimeout(() => {
        this.props.setBalance(prev => {
            const {slot1, slot2, slot3} = this.state;
            if(slot1 === 7 && slot1 === slot2 === slot3) {
                return prev + 10;
            }
            else if(slot1 === slot2 === slot3) {
                return prev + 5;
            }
            else if(slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
                return prev + 0.5;
            }
            else return prev;
        })
      }, 200);

  };

  // this will create a rolling effect and return random selected option
  triggerSlotRotation = ref => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * Slots.defaultProps.slots.length
    );
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return Slots.defaultProps.slots[randomOption];
  };

  render() {
    return (
      <div className="SlotMachine">
        <div className="slot">
          <section>
            <div className="container" ref={this.slotRef[0]}>
              {Slots.defaultProps.slots.map((fruit, i) => (
                <div key={i}>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="slot">
          <section>
            <div className="container" ref={this.slotRef[1]}>
              {Slots.defaultProps.slots.map(fruit => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="slot">
          <section>
            <div className="container" ref={this.slotRef[2]}>
              {Slots.defaultProps.slots.map(fruit => (
                <div>
                  <span>{fruit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div
          className={!this.state.rolling ? "roll rolling" : "roll"}
          onClick={!this.state.rolling && this.roll}
          disabled={this.state.rolling}
        >
          {this.state.rolling ? "Rolling..." : "ROLL"}
        </div>
        <div
          className={"restart"}
          onClick={this.restart}
        >
          Restart
        </div>
      </div>
    );
  }
}

export default Slots;