var MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember"
];

export function toDateString(date){
	return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getNextSunday(){
	var d = new Date();
	d.setDate(d.getDate() + (7 - d.getDay()) % 7);
	d.setHours(0,0,0,0);

	return d;
}

export function dateIsEqual(date1, date2){
	return date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
}