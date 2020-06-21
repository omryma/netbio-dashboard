import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';
import _ from 'lodash';
import { CSVDownload, CSVLink } from 'react-csv';

const Charts = (props) => {
  const { usersData } = props;

  const toolsOptions = [{ key: 'respnet', value: 'ResponseNet', text: 'ResponseNet' },
    { key: 'protnet', text: 'MyProteinNet', value: 'MyProteinNet' },
    { key: 'tissuenet', text: 'TissueNet', value: 'TissueNet' },
    { key: 'motifnet', text: 'MotifNet', value: 'MotifNet' },
    { key: 'diffnet', text: 'DiffNet', value: 'DiffNet' },
    { key: 'trace', text: 'TRACE', value: 'TRACE' },
    { key: 'all', text: 'All Web-tools', value: 'all' }]

  const toolsNames = toolsOptions.map((tool) => tool.text).filter((item) => item !== 'All Web-tools')

  const toolsColors = { ResponseNet: '#3366cc',
    MyProteinNet: '#dc3912',
    TissueNet: '#ff9900',
    MotifNet: '#109618',
    DiffNet: '#990099',
    TRACE: '#0099c6' }

  const today = new Date();

  const timesOptions = [{ key: 'ever', value: 'ever', text: 'Ever' },
    { key: 'Yearly', text: 'Yearly', value: 'year' },
    { key: 'Monthly', text: 'Monthly', value: 'month' },
  ]
  const displayOptions = [{ key: 'Stacked', text: 'Stacked', value: 'Stacked' },
    { key: 'Columns', text: 'Columns', value: 'Columns' }]

  const [chartDisplay, setDisplay] = useState('Stacked')
  const [chartFilters, setFilters] = useState({ period: 'ever', tools: 'all' })

  const everSessions = () => (chartFilters.tools === 'all'
    ? [['Period', ...toolsNames],
      ['03-20 - Today', ...toolsNames.map((tool) => usersData[tool].length)]]
    : [['Period', chartFilters.tools, { role: 'style' }],
      ['03-20 - Today', usersData[chartFilters.tools].length, toolsColors[chartFilters.tools]]])

  const fetchPeriodData = (periods) => {
    const { tools } = chartFilters
    const periodsData = []
    if (tools === 'all') {
      periodsData.push(['Period', ...toolsNames])
      periods.forEach((period) => {
        const currPeriodData = [period]
        toolsNames.forEach((tool) => {
          let sessionsCounter = 0
          usersData[tool].forEach((session) => {
            if (session.date.startsWith(period)) sessionsCounter += 1
          })
          currPeriodData.push(sessionsCounter)
        })
        periodsData.push(currPeriodData)
      })
    } else {
      periodsData.push(['Period', tools, { role: 'style' }])
      periods.forEach((period) => {
        let sessionsCounter = 0
        usersData[tools].forEach((session) => {
          if (session.date.startsWith(period)) sessionsCounter += 1
        })
        periodsData.push([period, sessionsCounter, toolsColors[tools]])
      })
    }
    return periodsData
  }

  const monthlySessions = () => {
    const currYear = today.getFullYear();
    const currMonth = today.getMonth() + 1;
    const lastMonths = _.range(1, currMonth + 1)
      .map((m) => `${currYear.toString()}-${m.toString().padStart(2, '0')}`)
    const prevYearMonthsCount = 12 - lastMonths.length
    if (prevYearMonthsCount > 0) {
      lastMonths.unshift(..._.range((12 - prevYearMonthsCount + 1), 13)
        .map((m) => `${(currYear - 1).toString()}-${m.toString().padStart(2, '0')}`))
    }
    return fetchPeriodData(lastMonths, chartFilters.tools)
  }

  const yearlySessions = () => {
    const currYear = today.getFullYear();
    const years = _.range(2020, currYear + 1).map((year) => year.toString())
    return fetchPeriodData(years, chartFilters.tools)
  }

  const getChartData = () => {
    const { period } = chartFilters
    if (period === 'ever') return everSessions()
    if (period === 'year') return yearlySessions()
    return monthlySessions()
  }

  const getCsvData = () => {
    const csvData = [['Web-tool', 'datetime', 'lat', 'lon', 'country', 'city']];
    Object.keys(usersData).forEach((tool) => {
      usersData[tool].forEach(({ date, lat, lon, country, city }) => csvData.push([tool, date, lat, lon, country, city]))
    })
    return csvData
  }

  return (
    <div className="ui grid">
      <div className="row" style={{ paddingBottom: '3em' }}>
        <div className="three wide column" style={{ padding: '1em' }}>
          <label htmlFor="func">Select web-tools:</label>
          <br />
          <Dropdown
            value={chartFilters.tools}
            options={toolsOptions}
            onChange={(e, data) => setFilters({ ...chartFilters, tools: data.value })}
            selection
          />
        </div>
        <div className="three wide column" style={{ padding: '1em' }}>
          <label htmlFor="func">Select time period:</label>
          <br />
          <Dropdown
            value={chartFilters.period}
            options={timesOptions}
            onChange={(e, data) => setFilters({ ...chartFilters, period: data.value })}
            selection
          />
        </div>
        <div className="three wide column" style={{ padding: '1em' }}>
          <label htmlFor="func">Select chart display:</label>
          <br />
          <Dropdown
            value={chartDisplay}
            options={displayOptions}
            onChange={(e, data) => setDisplay(data.value)}
            selection
          />
        </div>
        <div className="three wide column" style={{ paddingLeft: '15em', paddingTop: '2em' }}>
          <Button icon labelPosition="left">
            <Icon name="download" />
            <CSVLink data={getCsvData()} target="_blank">Download</CSVLink>
          </Button>
        </div>
      </div>

      <Chart
        width="100%"
        height="40em"
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={getChartData()}
        fontName="Arial"
        options={{
          chart: {},
          bar: { groupWidth: '80%' },
          chartArea: { width: chartFilters.period === 'ever' ? '30%' : '80%', height: '90%' },
          isStacked: chartDisplay === 'Stacked',
          hAxis: {
            textStyle: {
              color: 'black',
              fontSize: '12',
              fontName: 'Arial',
            }
          },
          vAxis: {
            textStyle: {
              color: 'black',
              fontSize: '12',
              fontName: 'Arial',
            }
          },
          legend: {
            textStyle: {
              color: 'black',
              fontSize: '12',
              fontName: 'Arial',
            },
            position: chartFilters.tools !== 'all' ? 'none' : 'right'
          },
          tooltip: {
            textStyle: {
              color: 'black',
              fontSize: '12',
              fontName: 'Arial',
            }
          },
          animation: {
            startup: false,
            easing: 'linear',
            duration: 500,
          },
        }}
          // For tests
        rootProps={{ 'data-testid': '2' }}
      />

    </div>
  );
}

export default Charts;
