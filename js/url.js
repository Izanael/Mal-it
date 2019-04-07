const Jikan = require('jikan-node');
const remote = require('electron').remote;
const settings = require('electron').remote.require('electron-settings');
const webFrame = require('electron').webFrame;


// Set the zoom factor to 85%
// I worked with zoom out unintentionally :(
webFrame.setZoomFactor(0.85);

const mal = new Jikan();

// Global Initializations
var callCount = 1;
var urlListAnime = [], urlListManga = [];
var savePathAnime, savePathManga;

// Set Paths
document.getElementById("animeBrowse").addEventListener("click", function (e) {
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: 'Save covers file as',
		filters: [
			{name: "Cascading style sheet files", extensions: ['css']},
			{name: "All files", extensions: ['*']}
		]
		},
		(file) => {
			savePathAnime = file;
			settings.set('browseanime', savePathAnime);
			var browseTimePathA = Date.now();
			settings.set('browsetimeanime', browseTimePathA);
			if(savePathAnime !== undefined) {
				$('#formAnime').val(`${savePathAnime}`);
			}
			else {
				savePathAnime =  $('#formAnime').val();
			}
		}
		)
});
document.getElementById("mangaBrowse").addEventListener("click", function (e) {
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: 'Save covers file as',
		filters: [
			{name: "Cascading style sheet files", extensions: ['css']},
			{name: "All files", extensions: ['*']}
		]
		},
		(file) => {
			savePathManga = file;
			settings.set('browsemanga', savePathManga);
			var browseTimePathM = Date.now();
			settings.set('browsetimemanga', browseTimePathM);
			if(savePathManga !== undefined) {
				$('#formManga').val(`${savePathManga}`);
			}
			else {
				savePathManga =  $('#formManga').val();
			}
		}
		)
});

// Either anime image url or manga image url
async function getImageUrl (user, request, data, path, type) {

	// Anime url
	if (request === "animelist") {
		await mal.findUser(user, request, data)
		.then(async info => {
			var typeList;
			typeList = info.anime;

			if (typeList.length !== 0) {
				for(const get of typeList) {
					let css;
					url = get.image_url;
					id = get.mal_id;
					if(type.toLowerCase() === 'more') {css = `#more${id}{ background-image:url('${url}'); }`;}
					else if (type.toLowerCase() === 'animetitle') {css = `.animetitle[href*="manga/${id}/"] { background-image:url('${url}'); }`;}
					else {css = `.animetitle[href*="manga/${id}/"]:before { background-image:url('${url}'); }`;}
					urlListAnime.push(css);
				}
				if(typeList.length === 300) {
					callCount++;
					await getImageUrl(user, request, pagination(data), path, type);
				}
			}
		})
		.catch(err => console.log(err));
		urlListAnime.sort(function naturalCompare(a, b) {
			var ax = [], bx = [];
		
			a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
			b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
			
			while(ax.length && bx.length) {
				var an = ax.shift();
				var bn = bx.shift();
				var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
				if(nn) return nn;
			}
		
			return ax.length - bx.length;
		});
		const fs = require('fs');
		var file = fs.createWriteStream(path);
		file.on('error', function(err) { /* error handling */ });
			urlListAnime.forEach(url => file.write(url+'\n'));
		file.end();
	}
	// Manga url
	else {
		await mal.findUser(user, request, data)
		.then(async info => {
			var typeList;
			typeList = info.manga;
			var url, id;

			if (typeList.length !== 0) {
				
				for(const get of typeList) {
					let css;
					url = get.image_url;
					id = get.mal_id;
					if(type.toLowerCase() === 'more') {css = `#more${id}{ background-image:url('${url}'); }`;}
					else if (type.toLowerCase() === 'animetitle') {css = `.animetitle[href*="manga/${id}/"] { background-image:url('${url}'); }`;}
					else {css = `.animetitle[href*="manga/${id}/"]:before { background-image:url('${url}'); }`;}
					urlListManga.push(css);
				}
				if(typeList.length === 300) {
					callCount++;
					await getImageUrl(user, request, pagination(data), path, type);
				}
				
			}
		})
		.catch(err => console.log(err));
		urlListManga.sort(function naturalCompare(a, b) {
			var ax = [], bx = [];
		
			a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
			b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
			
			while(ax.length && bx.length) {
				var an = ax.shift();
				var bn = bx.shift();
				var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
				if(nn) return nn;
			}
		
			return ax.length - bx.length;
		});
		const fs = require('fs');
		var file = fs.createWriteStream(path);
		file.on('error', function(err) { /* error handling */ });
			urlListManga.forEach(url => file.write(url+'\n'));
		file.end();
	}
}

// If more than 300 animes/mangas
function pagination(data) {
	newData = data;

	if(data.indexOf('/') === -1) {
		newData = newData +`/${callCount}`;
	}
	else {
		newData = newData.substr(0, newData.length-2)+`/${callCount}`;
	}
	return newData;
}

// Get both url
async function getBothUrl(user, pathAnime, pathManga, typeA, typeM) {
	await getImageUrl(user, "animelist", "all", pathAnime, typeA);
	await getImageUrl(user, "mangalist", "all", pathManga, typeM);
}

// Mal it!
document.getElementById("button-mal").addEventListener("click", async function(e) {

	// Initialize
	var username = document.getElementById('formUsername').value;
	var typeAnime = document.getElementById('selectAnime').value;
	var typeManga = document.getElementById('selectManga').value;
	var checkAnime = document.getElementById('checkAnime').checked;
	var checkManga = document.getElementById('checkManga').checked;
	var success = true;
	savePathAnime = $('#formAnime').val();
	savePathManga = $('#formManga').val();

	console.log(`${username}`)

	if (username.length !== 0) {

		// Warnings
		if(!checkAnime && !checkManga) {
			remote.dialog.showMessageBox({
				type: 'warning',
				title: 'Warning',
				message: `Nothing to generate covers for.
				Please at least one list type`,
				buttons: ['OK']
			});
			success = false;
		}
		else if(savePathAnime === "" && checkAnime && !checkManga){
			remote.dialog.showMessageBox({
				type: 'warning',
				title: 'Warning',
				message: 'You must specify a path to save anime list covers',
				buttons: ['OK']
			});
			success = false;
		}
		else if (savePathManga === "" && checkManga && !checkAnime){
			remote.dialog.showMessageBox({
				type: 'warning',
				title: 'Warning',
				message: 'You must specify a path to save manga list covers',
				buttons: ['OK']
			});
			success = false;
		}
		else if(savePathAnime === savePathManga) {
			remote.dialog.showMessageBox({
				type: 'warning',
				title: 'Warning',
				message: 'You cannot save both cover file into one',
				buttons: ['OK']
			});
			success = false;
		}

		// Success
		if (success) {
			// Loading Animation
			$('#loading2').removeClass('hidden');
			$('#loading').removeClass('hidden');
			if(savePathManga !== "" && savePathAnime !== "" && checkAnime && checkManga){
				await getBothUrl(username, savePathAnime, savePathManga, typeAnime, typeManga);

				remote.dialog.showMessageBox({
					type: 'info',
					title: 'Mal it!',
					message: `Saved in ${savePathAnime}
					and ${savePathManga}`,
					buttons: ['OK']
				});
			}

			else if(savePathAnime !== "" && checkAnime) {
				await getImageUrl(username, "animelist", "all", savePathAnime, typeAnime);

				remote.dialog.showMessageBox({
					type: 'info',
					title: 'Mal it!',
					message: `Saved in ${savePathAnime}`,
					buttons: ['OK']
				});
			}

			else if(savePathManga !== "" && checkManga) {
				await getImageUrl(username, "mangalist", "all", savePathManga, typeManga);

				remote.dialog.showMessageBox({
					type: 'info',
					title: 'Mal it!',
					message: `Saved in ${savePathManga}`,
					buttons: ['OK']
				});
			}

			
			// End Animation
			$('#loading2').addClass('hidden');
			$('#loading').addClass('hidden');
		}	
	}
	else {
		// Warning
		remote.dialog.showMessageBox({
			type: 'warning',
			title: 'Warning',
			message: 'You must specify a username',
			buttons: ['OK']
		});
	}

	// Reset
	callCount = 1;
	urlListAnime = [];
	urlListManga = [];

})