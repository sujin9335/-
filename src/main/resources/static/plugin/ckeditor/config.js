/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.toolbarGroups = [
		{ name: 'mode', groups: [ 'mode' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },

		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors','TextColor','BGColor' ] },
		{ name: 'others', groups: [ 'others' ] },
	];
	config.enterMode = CKEDITOR.ENTER_BR;
	// config.uiColor = '#4c4c4c';
	// config.skin = 'moono-dark';
	
	config.removeButtons = 'Language';
	config.docType = "<!DOCTYPE html>";
	config.htmlEncodeOutput = true;
	config.toolbarCanCollapse = true;
	config.toolbarStartupExpanded = false;
	config.baseFloatZIndex = 20001;
};
