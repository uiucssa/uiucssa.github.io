// GLOBAL IMPORTED DATA FILE
// allows us to circumvent hosting CORS policy, and not have to meddle with html directly to update things

// ===== event list formatting =====
// name,date,location,registration form link
//
// if event is not yet open for registration, leave out the registration form link

var eventslist_csv = `
// Labor Day Weekend Chicago Trip,2-3 September 2023,Chicago,closed
// Friendsgiving,November 2023,On-Campus
// Chinese New Year,Saturday 3 February 2024 - 12.30 to 3 pm,La Casa Cultural Latina
// Spring Informal,19 April 2024 - 3 to 5 pm,RSVP in the Telegram chat!
// Illini Day,August 2024,Singapore
Chicago Trip,September 2024,Chicago,Polling open!
Friendsgiving,November 2024,On-Campus
Chinese New Year,February 2025,On-Campus
`;

// ===== resources formatting =====
// name,url
//
// to be written in whatever order you want the list to appear in
var resourceslist_csv = `
UI Course Explorer,https://courses.illinois.edu
UI Course Explorer (CS),https://courses.illinois.edu/schedule/default/default/CS
UI Course Explorer (ECE),https://courses.illinois.edu/schedule/default/default/ECE
Course Explorer (MechE),https://courses.illinois.edu/schedule/default/default/ME
Degree Progression (CS),http://catalog.illinois.edu/undergraduate/engineering/computer-science-bs/#degreerequirementstext
Degree Progression (ECE),http://catalog.illinois.edu/undergraduate/engineering/computer-engineering-bs/#degreerequirementstext
Degree Progression (MechE),http://catalog.illinois.edu/undergraduate/engineering/mechanical-engineering-bs/#degreerequirementstext
MTD's Learn to Ride,https://mtd.org/maps-and-schedules/uiuc-learn-to-ride
`;


// ===== exco list formatting =====
// name,image path,email (use br if necessary)
//
// to be written in the order of president/vp external/vp internal/treasurer/secretary
var excolist_csv = `
Harry Wang,assets/img/exco23/harry.jpg,<b>hueyjie2</b> at illinois dot edu<br><b>president</b> at uiucssa dot com
Parithimaal Karmehan,assets/img/exco23/pari.jpg,<b>pk38</b> at illinois dot edu<br><b>external</b> at uiucssa dot com
Andrew Loh,assets/img/exco23/andrew.jpg,<b>acloh2</b> at illinois dot edu<br><b>internal</b> at uiucssa dot com
Adithya Balaji,assets/img/exco23/balarizz.jpg,<b>abalaji5</b> at illinois dot edu<br><b>treasurer</b> at uiucssa dot com
Aaditya Kothary,assets/img/exco23/aadi.jpg,<b>kothary3</b> at illinois dot edu<br><b>secretary</b> at uiucssa dot com
`;

// ===== previous year exco formatting =====
// year,president,vp external,vp internal,treasurer,secretary,social chair
//
// to be written in whatever order you want the list to appear in
var prevexcolist_csv = `
2022-23,Jennifer Lahey,May Lee,Hanpu Liu,Davis Zhang,Ethan Handojo
2021-22,Ravyu Sivakumaran,Faith Tan,Advay Sudarshan,Nairen Fu,Megan Poh,Vignesh Ravibaskar
2020-21,Leck Kirk Shen,Liu Zhu Xuan,Lydia Ng,Daniel Lee
2019-20,Goh Hao Wei,Ho Yi Shian,Tan Yong Zhi
2018-19,Koh Hui Yi,Ang Wei Yang,Han Jia Ling
`;

// ===== gallery image list formatting =====
// url,left caption,right caption
//
// to be written in whatever order you want the images to appear in
var gallery_csv = `
assets/img/gallery/2023-spring-informal-3.jpeg,<b>Spring Informal</b> | On-Campus,29 Apr 2023
assets/img/gallery/2023-spring-informal-2.jpeg,<b>Spring Informal</b> | On-Campus,29 Apr 2023
assets/img/gallery/2023-spring-informal.jpeg,<b>Spring Informal</b> | On-Campus,29 Apr 2023
assets/img/gallery/2022-chicago-outlets.jpeg,<b>Chicago Trip</b> | Chicago Premium Outlets,6 Sep 2022
assets/img/gallery/2022-chicago-bean.JPG,<b>Chicago Trip</b> | The Bean,5 Sep 2022
assets/img/gallery/2022-illini-day.jpeg,<b>Illini Day</b> | Marina Barrage,5 Aug 2022
assets/img/gallery/2018-chicago-outlets.jpg,<b>Chicago Trip</b> | Chicago Premium Outlets,2 Sep 2018
assets/img/gallery/2017-midwest-games.jpg,<b>Midwest Games</b>,2017
assets/img/gallery/2017-cny.jpg,<b>Chinese New Year</b>,2017
assets/img/gallery/2016-thanksgiving-dinner.jpg,<b>Thanksgiving Dinner</b>,2016
assets/img/gallery/2016-chicago-outlets.jpg,<b>Chicago Trip</b>,2016
assets/img/gallery/2016-chicago-bean.jpg,<b>Chicago Trip</b>,2016
assets/img/gallery/2016-bbq.jpg,<b>Singapore BBQ</b>,2016
`;

// --- place unused image entries here ---
// assets/img/gallery/2019-chicago-outlets.png,<b>Chicago Trip</b> | Chicago Premium Outlets,1 Sep 2019
