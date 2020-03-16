import React, { Component } from 'react';

export default class Filter extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4 p-4">
                    {`${this.props.count} Products Found.`}
                </div>
                <div className="col-md-4">
                    <col-form-label>Sort By Price
               <select className="form-control" value={this.props.sort} onChange={this.props.handleSortChange}>
                            <option value="">Select</option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </col-form-label>
                </div>
                <div className="col-md-4">
                    <col-form-label > Filter Size
               <select className="form-control" value={this.props.size} onChange={this.props.handleSizeChange}>
                            <option value="">All</option>
                            <option value="x">XS (32-34)</option>
                            <option value="s">S (35-37)</option>
                            <option value="m">M (338-40)</option>
                            <option value="l">L (41-43)</option>
                            <option value="xl">XL (44-46)</option>
                            <option value="xxl">XXL (47-49)</option>
                        </select>
                    </col-form-label>
                </div>
            </div>
        )
    }
}
