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
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2007,
            "FiscalYear": 2008,
            "Name": "Yes! Precure 5",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2008,
            "FiscalYear": 2009,
            "Name": "Yes! Precure 5 Gogo!",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2009,
            "FiscalYear": 2010,
            "Name": "Fresh Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2010,
            "FiscalYear": 2011,
            "Name": "Heartcatch Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Suite Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Smile Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Dokidoki Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Happiness Charge Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Go! Princess Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Maho Girls Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Kira Kira Precure a la mode",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Hugtto Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
        },
        {
            "YearAired": 2011,
            "FiscalYear": 2012,
            "Name": "Star Twinkle Precure",
            "QuaterOne": 0,
            "QuaterTwo": 0,
            "QuaterThree": 0,
            "QuaterFour": 0
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
