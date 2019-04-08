const settings = require('electron').remote.require('electron-settings');

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
		settings.set('pathanime', pathA);
	});
	
	// MangaPath Persistence
	$('#formManga').keyup(function () {
		var pathM = $(this).val();
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
	$('#formAnime').val(settings.get('pathanime')); 
	$('#formManga').val(settings.get('pathmanga')); 
	// Get Check
	$('#checkAnime').prop('checked', settings.get('checkanime'));
	$('#checkManga').prop('checked', settings.get('checkmanga'));
	// Get Select
	$('#selectAnime').prop('selectedIndex', settings.get('selectanime'));
	$('#selectManga').prop('selectedIndex', settings.get('selectmanga'));

})


