// todo
// progress bar on gallery?
// auto image next

function splitCSV(csv, removeEmptyFields = true) {
	return csv.trim().split("\n").filter(line => (line.length > 0 && line.lastIndexOf("//") != 0)).map(line => line.trim().split(",").map(field => field.trim()).filter(field => !removeEmptyFields || field.length > 0));
}

// loads all the dynamically populated data from ssa-data.js
var galleryAutoIntervalID = "";
function loadAllData() {
	loadEventList();
	loadResourcesList();
	loadGalleryImages();
	loadExcoList();
	loadPreviousExcoList();
	galleryAutoIntervalID = window.setInterval(carouselNextImage, 7000);
}

// loads the upcoming events data
function loadEventList() {
	
	// generate event cards
	// <div class="event-card">
	// 	<h4>Event Name</h4>
	// 	<p>Event Date</p>
	// 	<p>Event Location</p>
	// 	<p>Registration Link</p>
	// </div>
	// csv: name,date,location,registration form link (if blank, rendered as "not yet")
	var events_list = splitCSV(eventslist_csv);
	var eventcards_html = "", curr_event = [];
	for (var pos = 0; pos < events_list.length; pos += 1) {
		curr_event = events_list[pos];
		if (curr_event.length < 3) {
			console.log(`malformed event entry: ${curr_event}`);
			continue;
		}
		eventcards_html += `<div class='event-card'><h4>${curr_event[0]}</h4><p>${curr_event[1]}</p><p><i>${curr_event[2]}</i></p>${ curr_event.length > 3 ? curr_event[3] == "closed" ? "<p style='color: red;'>Registration closed</p>" : `<a href='${curr_event[3]}'><p>Click for Registration Form</p></a>` : "<p style='color: orange;'>Registration not yet open</p>" }</div>`;
	}

	// write out
	document.getElementById("event-cards").innerHTML = eventcards_html;
}

// loads the resource links data
function loadResourcesList() {

	// generate resource link cards
	// <a class="resource-link" href="">link 1</a>
	// csv: name,url
	var resources_list = splitCSV(resourceslist_csv);
	var resourcecards_html = "", curr_resource = [];
	for (var pos = 0; pos < resources_list.length; pos += 1) {
		curr_resource = resources_list[pos];
		if (curr_resource.length < 2) {
			console.log(`malformed resource entry: ${curr_resource}`);
			continue;
		}
		resourcecards_html += `<a class='resource-link' href='${curr_resource[1]}'>${curr_resource[0]}</a>`;
	}

	// write out
	document.getElementById("resource-links").innerHTML = resourcecards_html;
}

// loads the current exco data
function loadExcoList() {

	// generate exco cards
	// <div class="person">
	// 	<img class="portrait" src="assets/img/head.jpg"style="border-color: red/orange/teal;">
	// 	<span>
	// 		<b>Name Name</b>
	// 		<br>
	// 		Position
	// 	</span>
	// 	<code>
	// 		<b>NetID</b> at illinois dot edu
	// 		<br>
	// 		<b>position</b> at uiucssa dot com
	// 	</code>
	// </div>
	// csv: name,image path,email (use br if necessary)
	var exco_list = splitCSV(excolist_csv);
	var excocards_html = "", curr_member = [];
	var exco_roles = [["President", "red"], ["Vice President (External)", "orange"], ["Vice President (Internal)", "orange"], ["Treasurer", "teal"], ["Secretary", "teal"]];
	for (var pos = 0; pos < exco_list.length; pos += 1) {
		curr_member = exco_list[pos];
		if (curr_member.length < 3) {
			console.log(`malformed exco entry: ${curr_member}`);
			continue;
		}
		excocards_html += `<div class="person"><img class="portrait" src="${curr_member[1]}"style="border-color: ${exco_roles[pos][1]};"><span><b>${curr_member[0]}</b><br>${exco_roles[pos][0]}</span><code>${curr_member[2]}</code></div>`;
	}

	// write out
	document.getElementById("exco").innerHTML = excocards_html;
}

// loads the past exco data
function loadPreviousExcoList() {

	// generate table listing, one row for each line
	// csv: year,president,vp external,vp internal,treasurer,secretary,social chair
	var prevexco_list = splitCSV(prevexcolist_csv, false);
	var prevexcotable_html = "<table><tr><th>Year</th><th>President</th><th>Vice President (External)</th><th>Vice President (Internal)</th><th>Treasurer</th><th>Secretary</th><th>Social Chair</th></tr>", curr_year = [];
	for (var pos = 0; pos < prevexco_list.length; pos += 1) {
		curr_year = prevexco_list[pos];
		prevexcotable_html += `<tr>`;
		curr_year.forEach(member => prevexcotable_html += `<td>${member}</td>`);
		prevexcotable_html += `</tr>`;
	}

	// write out
	document.getElementById("prev-exco-table").innerHTML = prevexcotable_html + "</table>";
}

// loads the images in the gallery
var gallery_data = { images: [], idx: 0 };
function loadGalleryImages() {

	// repopulate global variable galleryimages_list
	// csv: url,left caption,right caption
	gallery_data.images = splitCSV(gallery_csv);
	gallery_data.idx = 0;

	// render first image
	carouselRenderImage();
}

// renders the current image as specified in gallery_data
async function carouselRenderImage() {

	// get elements
	var ele_img = document.getElementById("carousel-img");
	var ele_lcap = document.getElementById("carousel-captionL");
	var ele_rcap = document.getElementById("carousel-captionR");
	var ele_pbar = document.getElementById("carousel-progress-bar");
	var carousel_eles = [ ele_img, ele_lcap, ele_rcap ];

	// fade out
	carousel_eles.forEach(ele => ele.classList.remove("fadein"));
	carousel_eles.forEach(ele => ele.classList.add("fadeout"));

	// wait for element to disappear
	while (getComputedStyle(ele_img).opacity != 0) { await new Promise(r => setTimeout(r, 25)); }

	// update
	ele_img.src = gallery_data.images[gallery_data.idx][0];
	ele_lcap.innerHTML = gallery_data.images[gallery_data.idx][1];
	ele_rcap.innerHTML = gallery_data.images[gallery_data.idx][2];

	// wait for image to load
	while (!ele_img.complete) { await new Promise(r => setTimeout(r, 25)); }

	// fade in
	carousel_eles.forEach(ele => ele.classList.add("fadein"));
	carousel_eles.forEach(ele => ele.classList.remove("fadeout"));
	ele_pbar.style.width = `${100 * (gallery_data.idx + 1) / gallery_data.images.length}%`

	// reset the interval so that the image doesn't immediately change on render
	window.clearInterval(galleryAutoIntervalID);
	galleryAutoIntervalID = window.setInterval(carouselNextImage, 7000);
}

// renders the next image in the carousel
async function carouselNextImage() {
	
	// increment and render
	gallery_data.idx = (gallery_data.idx + 1) % gallery_data.images.length;
	carouselRenderImage();
}

// renders the previous image in the carousel
function carouselPreviousImage() {

	// decrement and render
	gallery_data.idx = gallery_data.idx == 0 ? gallery_data.images.length - 1 : gallery_data.idx - 1;
	carouselRenderImage();
}

// an in-joke stemming from the use of my head.jpg as a placeholder for exco headshots
function toggleSuperSecretMode() {
	var portraits = Array.from(document.getElementsByClassName("portrait"));
	if (portraits[0].alt == "super secret") {
		portraits.forEach(function (portrait) { portrait.alt = ""; });
		loadExcoList();
	} else {
		portraits.forEach(function (portrait) {
			portrait.src = "assets/img/exco23/head.jpg";
			portrait.alt = "super secret";
		});
	}
}