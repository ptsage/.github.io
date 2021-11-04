/* ====================================================================			

	Penbar V.1.0
	Description: Javascript for Penbar
	Author: Jamie Coulter
	Codepen: www.codepen.io/jcoulterdesign
	Website: www.jamiecoulter.co.uk
	Twitter: @jcoulterdesign
	Email: jcoulterdesign@gmail.com

=======================================================================  */

/* ====================================================================

	Codepen collection id

=======================================================================  */

const codepenCollectionID = "04ebf1071c04c85751d21fb69485a75e"; // Collection ID

/* ====================================================================

	Grab data from Nate's api
	--> Shouts to Nate for this http://cpv2api.com/

=======================================================================  */

const api = "https://cpv2api.com/"; // Shouts to Nate for this http://cpv2api.com/

const getCollection = $.getJSON(
	`${api}collection/${codepenCollectionID}`,
	() => {
		getCollection.complete(() => {
			const collectionData = $.parseJSON(getCollection["responseText"]);
			const collection = collectionData["data"];
			for (i = 0; i < collection.length; i++) {
				$(".selection_list").append(
					`<a href="https://codepen.io/jcoulterdesign/pen/${collection[i].id}" target="_blank">${collection[i].title}<i class='fa fa-chevron-right'></i></a>`
				);
			}
		});
	}
);

/* ====================================================================

	Set the pen name in the selection box

=======================================================================  */

const pen_name = $("._pen_title").text();

if (pen_name) {
	$(".pen_name").text(pen_name);
} else {
	$(".pen_name").text("Set a pen name");
}

/* ====================================================================

  Open the selection box on click

=======================================================================  */

let selection = false;

$(".selection, .b_overlay").click(() => {
	if (selection) {
		$(".selection_list").css({"bottom": "-250px", "opacity": "0"});
		$(".selection .fa-chevron-up").css("transform", "rotate(0deg)");
		$('.b_overlay').stop().fadeOut();
		selection = false;
	} else {
		$(".selection_list").css({"bottom": "33px", "opacity": "1"});
		$(".selection .fa-chevron-up").css("transform", "rotate(180deg)");
		$('.b_overlay').stop().fadeIn();
		selection = true;
	}
});

/* ====================================================================

  Append youtube video

=======================================================================  */

const youtube_link = $('._video_id').text();
$('.v_preview').append(`<iframe width="100%" height="auto" src="https://www.youtube.com/embed/${youtube_link}" frameborder="0" allowfullscreen></iframe>`)

/* ====================================================================

  Share on Twitter

=======================================================================  */

function twShare(url, title, winWidth, winHeight) {
	const winTop = 100;
	const winLeft = 100;
	window.open(`https://twitter.com/intent/tweet?text=${title}`, 'sharer', `top=${winTop},left=${winLeft},toolbar=0,status=0,width=${winWidth},height=${winHeight}`);
}

pen_id = $('._pen_id').text();

$('body').on('click', '.tweet', () => {
	twShare(`https://codepen.io/jcoulterdesign/pen/${pen_id}`, `Check out this pen by %40jamiecoulter89 https://codepen.io/jcoulterdesign/pen/${pen_id}`, 520, 350);
	return false;
});

/* ====================================================================

	Make Bob the owl move on Youtube hover

=======================================================================  */

$('.youtube').mouseenter(function(){
	$('.owl').css({
		'right': '140px', 
		'transform': 'rotate(-70deg) translateY(-70px) translateX(40px)',
		'transition': 'all .6s'
	});
});

$('.youtube').mouseleave(function(){
	$('.owl').css({
		'right': '60px',
		'transform': 'rotate(0deg) translateY(0px) translateX(0px)',
		'transition': 'all 0.3s'
	});
});

/* ====================================================================

	Make Bob the owl love you when you hover folow

=======================================================================  */

$('.tweet, .codepen').mouseenter(function(){
	$('.love').css({
		'opacity': '1',
		'bottom': '70px',
		'transition': 'all .2s .2s'
	});
});

$('.tweet, .codepen').mouseout(function(){
	$('.love').css({
		'opacity': '0',
		'bottom': '50px',
		'transition': 'all .2s 0s'
	});
});

/* ====================================================================

	Make Bob the owl follow you with his eyes
	Uses this awesome pen https://codepen.io/wojtek1150/pen/jqVbpK

=======================================================================  */

//plugin
var DrawEye = function(eyecontainer, eyepupil, speed, interval){
  var mouseX = 0, mouseY = 0, xp = 0, yp = 0;
  var limitX = $(eyecontainer).width() - $(eyepupil).width(),
      limitY = $(eyecontainer).height() - $(eyepupil).height(),
      offset = $(eyecontainer).offset();

  $(window).mousemove(function(e){
    mouseX = Math.min(e.pageX - offset.left, limitX);
    mouseY = Math.min(e.pageY - offset.top, limitY);
    if (mouseX < 0) mouseX = 0;
    if (mouseY < 0) mouseY = 0;
  });

  var follower = $(eyepupil);
  var loop = setInterval(function(){
    xp += (mouseX - xp) / speed;
    yp += (mouseY - yp) / speed;
    follower.css({left:xp, top:yp});
  }, interval);
};

//create eyes
var eye1 = new DrawEye(".left-eye",  ".left-pupil", 8, 30);
var eye2 = new DrawEye(".right-eye", ".right-pupil", 8, 30);