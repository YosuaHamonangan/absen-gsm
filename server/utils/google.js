var {google} = require('googleapis');
var {createReadStream} = require("streamifier");

var credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
var token = JSON.parse(process.env.GOOGLE_TOKEN);

var {client_secret, client_id, redirect_uris} = credentials.installed;
var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
var drive = google.drive({version: 'v3', auth: oAuth2Client});

function getFile(fileId, responseType='arraybuffer'){
	return new Promise( (resolve, reject) => {
		drive.files.get(
			{fileId, alt: 'media'},
			{responseType},
			function(err, res){
				if(err) reject(err);
				else resolve(res)
			}
		);
	});
}

var fs = require("fs")
var PARENTS = ['1FS1T094VxKNvMHQnTSs7aU7StmCmtb-t'];
function saveFile(name, data, mimeType='image/jpeg'){
	body = typeof data === "string" ? fs.createReadStream(data) : createReadStream(data);

	return new Promise( (resolve, reject) => {
		var resource = { name, parents: PARENTS };
		var media = { body, mimeType };
		var config = { resource, media, fields: 'id' };

		function callback(err, res) {
			if(err) reject(err);
			else resolve(res)
		}
		drive.files.create(config, callback);
	});
}

module.exports = {
	getFile,
	saveFile
}