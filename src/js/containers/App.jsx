import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "../../css/App.css";
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
      <tr>
        <td>{item.name}</td>
        <td>{item.tally}</td>
        <td>{this.returnPoints(item)}</td>
      </tr>
    );
  };

  renderItemButtons = items => {
    return items.map(item => this.renderItemButton(item));
  };

  renderItemButton = item => {
    return (
      <AwesomeButton
        className="letter-button"
        action={() => {
          this.incrementTally(item.name);
        }}
      >
        {item.name}
      </AwesomeButton>
    );
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
    console.log(newItems);
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
            <svg
              width="146"
              height="50"
              viewBox="0 0 88 30"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="kahoot-logo"
            >
              <title>Kahoot!</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path
                  d="M59.4563337,25.5366087 C55.5222657,25.9279665 52.3340315,22.7810536 52.3340315,18.5078772 C52.3340315,14.2343593 55.3409298,10.8227848 59.0502914,10.8886941 C62.75897,10.9535789 65.9482288,14.1004918 66.1725936,17.9174256 C66.3969584,21.7336764 63.3900601,25.1449094 59.4563337,25.5366087 Z M37.7762727,17.5267508 C38.000979,13.7101585 41.1895547,10.5635871 44.8985748,10.4980193 C48.6075949,10.432793 51.6144932,13.8443675 51.6144932,18.1175439 C51.6144932,22.3910618 48.426259,25.5379747 44.4921911,25.1466169 C40.5584646,24.7552591 37.5519078,21.3436845 37.7762727,17.5267508 Z M0,4.88343502 L4.5965759,3.70458064 L4.58530644,13.0510655 L12.3465531,5.56506693 L16.3386759,7.09908023 L10.6974547,13.3570485 L14.4389172,26.9872962 L10.3798607,26.9872962 L7.38593935,16.5445998 L4.55832802,19.3134733 L4.5965759,26.9872962 L0,26.8230352 L0,4.88343502 Z M37.6004007,25.5065568 L33.5642246,25.5065568 L33.2999044,19.2940078 L32.9249385,14.8756944 C32.8310263,11.7779574 30.0375649,12.5644295 29.1920135,12.9383708 L29.4153538,25.5065568 L25.5584646,25.3730307 L24.9314725,1.04942628 L28.859735,-7.10542736e-15 L28.9485247,9.84029232 C33.2203351,8.47600401 35.5076951,8.49068846 36.0820963,14.7650487 L37.6004007,25.5065568 Z M81.0803889,28.3167517 L82.2203124,25.6329114 L84.8682952,25.6329114 L85.8702532,28.5779984 L83.4927375,30 L81.0803889,28.3167517 Z M66.1087333,13.4960386 L65.4479328,8.93088061 L68.8776068,9.05040525 L68.8817048,2.6397869 L71.9480239,3.91084601 L71.8944085,9.60158456 L76.301794,9.89220016 L76.301794,12.6552682 L71.9958337,12.896025 L72.3567981,21.3057782 C72.3567981,21.3057782 72.3656771,21.9635051 73.7135734,21.9635051 C75.0611283,21.9635051 76.301794,21.2224524 76.301794,21.2224524 L76.301794,25.5113378 C76.3605318,26.8148393 74.518828,27.3667016 74.518828,27.3667016 C68.631386,28.2607458 69.0637237,24.3543393 69.0637237,24.3543393 L68.8721428,13.4960386 L66.1087333,13.4960386 Z M87.1225298,3.96514434 L83.9868864,24.1098261 L78.9979282,2.40005464 L87.1225298,3.96514434 Z M16.4390766,12.8263592 L15.3626719,9.98577088 C15.3626719,9.98542938 23.2198798,6.47345415 24.1552454,12.7758173 L24.0418678,26.3176168 L18.0772471,26.3169338 C18.0772471,26.3169338 15.4593161,26.417676 14.6540616,23.4971769 C14.6540616,23.4971769 12.6409252,16.0559148 20.5961433,14.6455241 L20.6169748,12.8325061 C20.6169748,12.8325061 19.1085739,11.2045806 16.4390766,12.8263592 Z M56.3920636,18.7834669 C56.560081,20.7604043 57.7846963,21.838175 58.5892678,21.9331117 C60.6290411,22.1738685 62.3652217,20.3082597 62.2491121,17.933476 C62.132661,15.5583508 61.1836354,14.0738548 59.2592888,14.0332165 C57.3363082,13.9925781 56.1724797,16.2010518 56.3920636,18.7834669 Z M20.5876059,23.7266642 L20.6962025,17.6636918 C17.445474,17.1913988 17.3846872,21.5909298 17.3846872,21.5909298 C17.7022812,24.4335671 20.5876059,23.7266642 20.5876059,23.7266642 Z M45.3595984,21.5431199 C46.1641699,21.4481832 47.3887852,20.3704125 47.5564612,18.3934751 C47.7763865,15.81106 46.6128996,13.6025863 44.6895775,13.6432247 C42.7652309,13.6835215 41.8158638,15.168359 41.7000956,17.5434842 C41.583303,19.9179264 43.3194837,21.7838767 45.3595984,21.5431199 Z"
                  fill="#864CBF"
                />
              </g>
            </svg>
            <h1 className="App-title">POINTS</h1>
          </header>
          <h2 className="items-header">ITEMS</h2>
          {this.renderItemButtons(items)}
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
          <div>Bonus{this.returnBonuses(items)}</div>
          <div>
            Total{this.returnTotal(items)}
            <AwesomeButton action={() => this.resetItems()}>
              NEW GAME
            </AwesomeButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
