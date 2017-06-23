// @flow

import Component from './Component';

export default class Thumbnail extends Component {
	constructor( item ) {
		super( 'li',{class: 'list-group-item'}, [
			new Component('img', {src: item.listing.picture_url, style:'width:100%' }),
			new Component('h4', {}, [item.listing.name])
		] );

	}
}