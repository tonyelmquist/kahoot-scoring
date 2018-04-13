import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import LetterButton from "../components/LetterButton";
import TinyButton from "../components/TinyButton";
import Logo from "../components/Logo";

import items from "../constants/items";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      bonus: 0,
      total: 0
    };
    this.incrementTally = this.incrementTally.bind(this);
  }

  renderItemRows = items => {
    return items
      .filter(item => item.tally > 0)
      .map(item => this.renderItemRow(item));
  };

  renderItemRow = item => {
    return (
      <tr key={item.name}>
        <td><TinyButton name={item.name} /></td>
        <td>{item.tally}</td>
        <td>{this.returnPoints(item)}</td>
      </tr>
    );
  };

  renderItemButtons = items => {
    return items.map(item => this.renderItemButton(item));
  };

  renderItemButton = item => {
    return <LetterButton key={item.name} item={item} incrementTally={this.incrementTally} />;
  };

  returnPoints = item => {
    if (item.bonusInterval > 0) {
      const bonuses = parseInt(item.tally / item.bonusInterval, 10);
      const plainPoints = item.tally - bonuses * item.bonusInterval;
      return bonuses * item.bonusValue + plainPoints * item.value;
    }
    return item.tally * item.value;
  };

  incrementTally = itemToIncrement => {
    const items = this.state.items;
    const newItems = items.map(item => {
      return item.name !== itemToIncrement
        ? item
        : { ...item, tally: item.tally + 1 };
    });
    this.setState({ items: newItems });
  };

  resetItems = () => {
    this.setState({ items: items, bonus: 0, total: 0 });
  };

  returnTotal = items => {
    let total = 0;
    items.map(item => {
      total = total + this.returnPoints(item);
    });
    return total;
  };

  returnBonus = item => {
    const bonuses = parseInt(item.tally / item.bonusInterval, 10);
    return bonuses * item.bonusValue;
  };

  returnBonuses = items => {
    let bonuses = 0;
    items.map(item => {
      if (item.bonusInterval > 0) {
        bonuses = bonuses + this.returnBonus(item);
      }
    });
    return bonuses;
  };

  render() {
    const items = this.state.items;

    return (
      <div className="App">
        <div className="letter-tile-area">
          <header className="App-header">
            <Logo color={"#864CBF"} />
            <h1 className="App-title">POINTS</h1>
          </header>
         
          <h2 className="items-header">ITEMS</h2>
           <div className="items-area">
          {this.renderItemButtons(items)}
          </div>
        </div>
        <div className="scoring-area">
          <header className="scoring-header">
            <h1 className="scoring-title">PLAYER ITEMS</h1>
          </header>
          <table className="points-table">
            <tbody>
              <tr className="scoring-table-header">
                <th>Item</th>
                <th>Quantity</th>
                <th>Points</th>
              </tr>
              {this.renderItemRows(items)}
            </tbody>
          </table>
          <div className="bonus">Bonus: <span className="bonus-value">{this.returnBonuses(items)}</span></div>
          <div className="totals">
            <div className="total-column">
            <div>
            Total: 
            </div>
            <div className="total">{this.returnTotal(items)}
              </div>
              </div>
              
            <AwesomeButton action={() => this.resetItems()} className="reset-button">
              NEW GAME
            </AwesomeButton>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
