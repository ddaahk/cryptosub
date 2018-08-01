import React from 'react';
import Table from "../presentational/Table";
import MainContentGrid from "../presentational/MainContentGrid";
import _ from 'lodash';
import { Grid, Segment, Icon, Button } from 'semantic-ui-react'


class TableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subs: [],
            SortedColumn: 'Total (24hr)',
            SortDirection: 'descending'
        }
        this.storeSubreddits = this.storeSubreddits.bind(this);
    }

    componentDidMount() {
        const endpoint = "AllSubreddits"
        console.log(API_URL)
        fetch(API_URL + endpoint)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data)
                this.storeSubreddits(data)
            })
            .catch(error => console.log(error))
    }

    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }

    handleSort = clickedColumn => () => {
        console.log(clickedColumn)
        const { SortedColumn, subs, SortDirection } = this.state
        if (SortedColumn !== clickedColumn) {
            const SortedSubs = _.orderBy(subs, [clickedColumn], ['desc'])
            console.log(SortedSubs)
            this.setState({
                SortedColumn: clickedColumn,
                subs: SortedSubs,
                SortDirection: 'descending',
            })
            return
        }
        this.setState({
            subs: subs.reverse(),
            SortDirection: SortDirection === 'ascending' ? 'descending' : 'ascending',
        })
    }

    storeSubreddits = data => {
        var i = 0;
        var subs = data.map(d => {
            i++;
            return {
                key: i,
                rank: i,
                subreddit: d.id,
                most_popular: d.most_popular,
                tf_hr_total: d.one_day_total,
                tf_hr_change: d.one_day_change,
                seven_day_total: d.seven_day_total,
                seven_day_change: d.seven_day_change,
                thirty_day_total: d.thirty_day_total,
                thirty_day_change: d.thirty_day_change,
            }
        })
        subs = _.orderBy(subs, ['thirty_day_total'], ['desc']);
        this.setState({ subs })
    }

    render() {
        return (
            <div>
                <MainContentGrid
                    width={12}>
                    <Table
                        subreddits={this.state.subs}
                        column={this.state.SortedColumn}
                        direction={this.state.SortDirection}
                        handleSort={this.handleSort}
                    />
                </MainContentGrid>
            </div>
        )
    }
}
export default TableContainer
