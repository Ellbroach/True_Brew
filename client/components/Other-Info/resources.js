import React from 'react'
import {connect} from 'react-redux'

class Resources extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        let {breweries} = this.props
        return(
            <div className='resources'>
            {
                breweries.length ?         
                <div>
                <h1>Resources</h1>
                <h2>The following resources were used in the production of the True Brew site:</h2>
                <h2>Beer product images were taken from brewery websites, as well as from https://craftshack.com/</h2>
                <h2>Many of the causes discussed on the good causes page were found from https://www.popsci.com/craft-brewer-conservation-climate-change</h2>
                <h2>Front Page Image: https://www.craftbeer.com/</h2>
                <h2>Wooden Background Image: http://wuqizz.com/amazing-horizontal-wood-paneling/horizontal-wood-planks-wallpaper-wall-decor-with-horizontal-wood-paneling/</h2>
                <h2>Cart Image: https://www.freepik.com/free-icons/commerce</h2>
                <h4>Brewery Sites: </h4>
                {
                    breweries.map((brewery)=> (
                        <div key={brewery.name} className='resources-brewery'>
                            <h2>{brewery.name + ': ' + brewery.site}</h2>
                        </div>
                    ))
                }
                </div>
                :
                 <div>Loading ...</div>
            }
            </div>
        )
    }
}


const mapState =( {breweries} ) => {
    return {
       breweries
    }
 }

export default connect(mapState)(Resources)

