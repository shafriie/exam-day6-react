import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            'isLoading': false,
            'barisData': []
        }
    }

    componentDidMount() {
        document.title = 'Render Data using state and lifecycle'
        this.getRows()
    }

    async getRows() {
        this.setState({
            'isLoading': true
        })
        let urlAPI = `https://swapi.dev/api/planets/?format=json`
        let res = await axios.get(urlAPI).then(res => {
            return res.data.results
        }).catch(err => {
            console.log(err)
        })

        this.setState((state, props) => {
            return {
                barisData: state.barisData.concat(res),
                isLoading: false
            }
        })
    }

    render() {

        const renderConditionalContent = () => {
            if (this.state.isLoading) {
                return <tr><td colSpan="6" align="center"><b>Loading....</b></td></tr>
            } else {
                return this.state.barisData.map((dat, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{dat.name}</td>
                            <td>{dat.diameter}</td>
                            <td>{dat.population}</td>
                            <td>{dat.gravity}</td>
                            <td>{moment(dat.created).format("DD MMM YYYY")}</td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div>
                <h1 align="center">Render Data using state and lifecycle</h1>
                <table cellPadding="15" border="1px solid black" cellSpacing="0" style={{ marginLeft: 'auto', marginRight: 'auto', width: '60%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'orange' }}>
                            <th>No</th>
                            <th>Name</th>
                            <th>Diameter</th>
                            <th>Population</th>
                            <th>Gravity</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderConditionalContent()}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default App
