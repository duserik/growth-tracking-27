import React from 'react';
import PropTypes from 'prop-types';

import { VisitList, Circle } from './components';
import ConfigButton from '../ConfigButton.jsx';
import PlotPage from '../PlotPage';

class CirclePage extends React.Component {
  state = {
    // Defaults to the most recent visit
    selectedVisit: this.props.visits.length - 1,
    plotType: null,
    displayType: 'percentile', // TODO
    showMultiple: false,
  };

  setVisit = selectedVisit => {
    this.setState({ selectedVisit });
    /*
    if (visit >= Object.values(this.props.visits).length) {
      this.setState({ visit: this.props.nextVisit });
    } else {
      this.setState({ visit: this.props.visits[visit] });
    }
    */
  };

  setDisplayType = displayType => {
    this.setState({ displayType: displayType.value });
  };

  setShowMultiple = () =>
    this.setState(state => ({ showMultiple: !state.showMultiple }));

  togglePlot = plotType => this.setState({ plotType });

  render() {
    const { visits, patient, toggleConfig, config } = this.props;
    const { selectedVisit, plotType, displayType, showMultiple } = this.state;

    const visit = visits[selectedVisit];

    if (visit && plotType) {
      return (
        <PlotPage
          config={config}
          visits={visits}
          plotType={plotType}
          displayType={displayType}
          togglePlot={this.togglePlot}
          setDisplayType={this.setDisplayType}
          setShowMultiple={this.setShowMultiple}
          selectedVisit={selectedVisit}
          patient={patient}
          showMultiple={showMultiple}
        />
      );
    }

    console.log(visit);

    return (
      <div>
        <ConfigButton toggleConfig={toggleConfig} />

        <VisitList setVisit={this.setVisit} visits={visits} visit={visit} />

        <div
          style={{
            fontSize: 20,
            paddingLeft: 24,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          Visit: {visit.date.toISOString().slice(0, 10)}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Circle
            onClick={() => this.togglePlot('wfl')}
            label="Weight-for-length"
            zscore={visit.wfl}
            config={config}
          />
          <Circle
            onClick={() => this.togglePlot('wfa')}
            label="Weight-for-age"
            zscore={visit.wfa}
            config={config}
          />
          <Circle
            onClick={() => this.togglePlot('lfa')}
            label="Length-for-age"
            zscore={visit.lfa}
            config={config}
          />
          <Circle
            onClick={() => this.togglePlot('bfa')}
            label="BMI-for-age"
            zscore={visit.bfa}
            config={config}
          />
          <Circle
            onClick={() => this.togglePlot('acfa')}
            label="MUAC-for-age"
            zscore={visit.acfa}
            config={config}
          />
        </div>
      </div>
    );
  }
}

CirclePage.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.object),
  toggleConfig: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  config: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  ).isRequired,
};

CirclePage.defaultProps = {
  visits: [],
};

export default CirclePage;
