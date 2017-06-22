// @flow

import Component from './Component';

export default class Button extends Component {
	constructor( label:string = 'Ne surtout pas cliquer ici', attributes:{} = {} ) {
		super( 'button', attributes, [ label ] );
	}
}