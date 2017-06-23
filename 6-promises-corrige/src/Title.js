// @flow

import Component from './Component';

export default class Title extends Component {
	constructor( label:string = 'Ne surtout pas cliquer ici' ) {
		super( 'h2', {}, [ label ] );
	}
}