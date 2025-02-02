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
                            <b>Emotions?</b>
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
                <h1>Star Wars</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2"></div>
            <div id="starWarsTable" className="col-md-8 table-responsive"><table className="text-center table">
                    <tbody><tr>
                        <th>Name</th>
                        <th># of </th>
                        <th>Average Height</th>
                        <th>Emotions?</th>
                        <th>Ice Cream</th>
                        <th>Location</th>
                    </tr>
                    {props.dataToDisplay.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td>{row.emotion}</td>
                                <td>{row.champ}</td>
                                <td>{row.role}</td>
                                <td>{row.damageType}</td>
                                <td>{row.isFeeding ? 'Yes' : 'No'}</td>
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
    const lolData = [
        {
            "emotion": "Sad",
            "champ": "Lux",
            "role": "Jungle",
            "damageType": "Physical",
            "isFeeding": true
        },
];

    
    const container = document.getElementById('react-data-table');
	const root = ReactDOM.createRoot(container);
	root.render(<ReactDataTable originalData={lolData} />);
})();
