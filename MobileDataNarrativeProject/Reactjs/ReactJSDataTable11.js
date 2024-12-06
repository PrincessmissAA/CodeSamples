(() => {
    const Filters = (props) => {
        let updateDamageType = (clickEvent) => {
            props.updateFormState({
                damageType: clickEvent.target.value,
            });
        }
        let updateFeedingStatus = (clickEvent) => {
            props.updateFormState({
                isOnlyFeeding: clickEvent.target.checked,
            });
        }
        
        return(
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-3'>
                            <b></b>
                        </div>
                        <div className='col-md-2'>
                            <select
                                onChange={updateDamageType} 
                            >
                                <option></option>
                                <option>Happy</option>
                                <option>Sad</option>
                            </select>
                        </div>
                        <div className='col-md-3'></div>
                        <div className='col-md-2'></div>
                        <div className='col-md-1'></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const DataTable = (props) => {
        return(
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                <h1>Precure</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2"></div>
            <div id="precureTable" className="col-md-8 table-responsive"><table className="text-center table">
                    <tbody><tr>
                        <th>Year aired</th>
                        <th>Fiscal Year</th>
                        <th>Name</th>
                        <th>Quater One</th>
                        <th>Quater Two</th>
                        <th>Quater Three</th>
                        <th>Quater Four</th>
                    </tr>
                    {props.dataToDisplay.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td>{row.YearAired}</td>
                                <td>{row.FiscalYear}</td>
                                <td>{row.Name}</td>
                                <td>{row.QuaterOne}</td>
                                <td>{row.QuaterTwo}</td>
                                <td>{row.QuaterThree}</td>
                                <td>{row.QuaterFour}</td>
                            </tr>
    );
})}
                    </tbody></table></div>
            <div className="col-md-2"></div>
        </div>

    </div>
        )
    }

    class ReactDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.originalData = props.originalData;

        this.state = {
            damageType: '',
            isOnlyFeeding: false,
        };

        this.updateFormState = this.updateFormState.bind(this);
    } 

    updateFormState(specification) {
        this.setState(specification);
    } 

        render() {
            let filteredData = this.originalData;

            if (this.state.damageType !== '') {
                    filteredData = filteredData.filter(
                        (row) => row.damageType === this.state.damageType
                    );
            }

            return (
                <React.Fragment>
                    <filters
                        updateFormState={this.updateFormState}
                    />

                    <hr />
                    
                    <DataTable 
                        dataToDisplay={filteredData}
                    />
                </React.Fragment>
            );
        }
    }
    const PrettyCureData = [
        {
            "YearAired": 2006,
            "FiscalYear": 2007,
            "Name": "Futari Wa Precure Splash Star",
            "QuaterFour": 12.3,
            "QuaterOne": 1.8,
            "QuaterTwo": 3.3,
            "QuaterThree": 4.3,
            "JapanGDP": 1.37 + "%",
            "CompanyProfit": 168076,
            "PopularityPoll": 1 + "st"
        },
        {
            "YearAired": 2007,
            "FiscalYear": 2008,
            "Name": "Yes! Precure 5",
            "QuaterFour": 6,
            "QuaterOne": 1.7,
            "QuaterTwo": 5.1,
            "QuaterThree": 7.9,
            "JapanGDP": 1.48 + "%",
            "CompanyProfit": 164072,
            "PopularityPoll": 4 + "th"
        },
        {
            "YearAired": 2008,
            "FiscalYear": 2009,
            "Name": "Yes! Precure 5 Gogo!",
            "QuaterFour": 10.5,
            "QuaterOne": 2.8,
            "QuaterTwo": 5.5,
            "QuaterThree": 7.5,
            "JapanGDP": -1.22 + "%",
            "CompanyProfit": 146023,
            "PopularityPoll": 12 + "th"
        },
        {
            "YearAired": 2009,
            "FiscalYear": 2010,
            "Name": "Fresh Precure",
            "QuaterFour": 10.5,
            "QuaterOne": 2.3,
            "QuaterTwo": 5.7,
            "QuaterThree": 8.5,
            "JapanGDP": -5.69 + "%",
            "CompanyProfit": 128753,
            "PopularityPoll": 10 + "10"
        },
        {
            "YearAired": 2010,
            "FiscalYear": 2011,
            "Name": "Heartcatch Precure",
            "QuaterFour": 11.9,
            "QuaterOne": 3.2,
            "QuaterTwo": 6.8,
            "QuaterThree": 9.6,
            "JapanGDP": 4.10 + "%",
            "CompanyProfit": 139414,
            "PopularityPoll": 10 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Suite Precure",
            "QuaterFour": 12.5,
            "QuaterOne": 2.6,
            "QuaterTwo": 5.2,
            "QuaterThree": 7.4,
            "JapanGDP": 0.02 + "%",
            "CompanyProfit": 167502,
            "PopularityPoll": 2 + "nd"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Smile Precure",
            "QuaterFour": 10.7,
            "QuaterOne": 2.8,
            "QuaterTwo": 5.7,
            "QuaterThree": 7.5,
            "JapanGDP": 1.38 + "%",
            "CompanyProfit": 183078,
            "PopularityPoll": 9 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Dokidoki Precure",
            "QuaterFour": 10.6,
            "QuaterOne": 2.4,
            "QuaterTwo": 4.9,
            "QuaterThree": 6.5,
            "JapanGDP": 2.01 + "%",
            "CompanyProfit": 190829,
            "PopularityPoll": 13 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Happiness Charge Precure",
            "QuaterFour": 9.8,
            "QuaterOne": 1.9,
            "QuaterTwo": 3.6,
            "QuaterThree": 4.5,
            "JapanGDP": 0.30 + "%",
            "CompanyProfit": 213112,
            "PopularityPoll": 20 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Go! Princess Precure",
            "QuaterFour": 6.5,
            "QuaterOne": 1.6,
            "QuaterTwo": 3.4,
            "QuaterThree": 4.4,
            "JapanGDP": 1.56 + "%",
            "CompanyProfit": 202600,
            "PopularityPoll": 6 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Maho Girls Precure",
            "QuaterFour": 6.6,
            "QuaterOne": 1.6,
            "QuaterTwo": 3.6,
            "QuaterThree": 4.9,
            "JapanGDP": 0.75 + "%",
            "CompanyProfit": 223759,
            "PopularityPoll": 3 + "rd"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Kira Kira Precure a la mode",
            "QuaterFour": 7.5,
            "QuaterOne": 1.8,
            "QuaterTwo": 3.8,
            "QuaterThree": 5.4,
            "JapanGDP": 1.68 + "%",
            "CompanyProfit": 241582,
            "PopularityPoll": 18 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Hugtto Precure",
            "QuaterFour": 8.1,
            "QuaterOne": 2.5,
            "QuaterTwo": 5.1,
            "QuaterThree": 7.1,
            "JapanGDP": 0.64 + "%",
            "CompanyProfit": 262555,
            "PopularityPoll": 11 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Star Twinkle Precure",
            "QuaterFour": 10.1,
            "QuaterOne": 2.3,
            "QuaterTwo": 4.5,
            "QuaterThree": 5.8,
            "JapanGDP": -0.40 + "%",
            "CompanyProfit": 260948,
            "PopularityPoll": 19 + "th"
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Healin' Good Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Tropical Rouge Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Delicous Party Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Hero Girl Sky Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
];

    
    const container = document.getElementById('react-data-table');
	const root = ReactDOM.createRoot(container);
	root.render(<ReactDataTable originalData={PrettyCureData} />);
})();
