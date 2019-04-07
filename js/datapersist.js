const settings = require('electron').remote.require('electron-settings');
const remote = require('electron');
const globalShortcut = require('electron').globalShortcut;
//var Mousetrap = require('mousetrap');


// Data persistance
$( function () {

	// Username Persistence
	$("#formUsername").keyup(function () {
		var user = $(this).val();
		settings.set('username', user);
	})

	// AnimePath Persistence
	$('#formAnime').keyup(function () {
		var pathA = $(this).val();
		var formTimePathA = Date.now();
		settings.set('formtimeanime', formTimePathA);
		settings.set('pathanime', pathA);
	});
	
	// MangaPath Persistence
	$('#formManga').keyup(function () {
		var pathM = $(this).val();
		var formTimePathM = Date.now();
		settings.set('formtimemanga', formTimePathM);
		settings.set('pathmanga', pathM);
	});

	// CheckBox Anime Persistence
	$('#checkAnime').change(function () {
		var checkA = $(this).is(':checked');
		settings.set('checkanime', checkA);
	})


	// CheckBox Manga Persistence
	$('#checkManga').change(function () {
		var checkM = $(this).is(':checked');
		settings.set('checkmanga', checkM);
	})

	// Select Anime Persistence
	$('#selectAnime').change( function () {
		var selectA = $(this).prop('selectedIndex');
		settings.set('selectanime', selectA);
	})

	// Select Manga Persistence
	$('#selectManga').change( function () {
		var selectM = $(this).prop('selectedIndex');
		settings.set('selectmanga', selectM);
	})



	// Get Username
	$('#formUsername').val(settings.get('username'));
	// Get last modified Path
	if(settings.get('browsetimeanime') - settings.get('formtimeanime') > 0) {
		
		$('#formAnime').val(settings.get('browseanime'));
	}
	else if(settings.get('browsetimeanime') - settings.get('formtimeanime') < 0) { 
		$('#formAnime').val(settings.get('pathanime')); 
	}
	else {
		$('#formAnime').val(settings.get('browseanime'));
	}

	if(settings.get('browsetimemanga') - settings.get('formtimemanga') > 0) {
		
		$('#formManga').val(settings.get('browsemanga'));
	}
	else if(settings.get('browsetimemanga') - settings.get('formtimemanga') < 0) { 
		$('#formManga').val(settings.get('pathmanga')); 
	}
	else {
		$('#formManga').val(settings.get('browsemanga'));
	}
	
	$('#formManga').val(settings.get('pathManga'));
	$('#formManga').val(settings.get('browsemanga'));
	// Get Check + Browser
	$('#checkAnime').prop('checked', settings.get('checkanime'));
	$('#checkManga').prop('checked', settings.get('checkmanga'));
	// Get Select
	$('#selectAnime').prop('selectedIndex', settings.get('selectanime'));
	$('#selectManga').prop('selectedIndex', settings.get('selectmanga'));

})


