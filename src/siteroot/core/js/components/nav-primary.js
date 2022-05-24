let sT = 0;
const $body = $("body"),
	$window = $(window),
	$topNav = $("#nav-primary"),
	$menuToggle = $("#menu-toggle"),
	$navOverlay = $("#nav-overlay").data("active", !1),
	$caseStudyNav = $("#casestudy-nav"),
	$bottomNav = $("#bottom-nav"),
	$searchToggle = $("#search-toggle"),
	$searchOverlay = $("#search-overlay").data("active", !1);
function onScroll() {
	let a = $window.scrollTop();
	a > $topNav.outerHeight()
		? ($menuToggle.addClass("-in-view"), $body.addClass("-scrolled-past-header"))
		: (toggleNavOverlay(!1), $menuToggle.removeClass("-in-view"), $body.removeClass("-scrolled-past-header")),
		$bottomNav.size() < 1 ||
			(a + $(window).outerHeight() >= $bottomNav.offset().top ? $caseStudyNav.addClass("-hide") : $caseStudyNav.removeClass("-hide"));
}
function toggleNavOverlay(a) {
	if (null == a) a = !$navOverlay.data("active");
	else if ($navOverlay.data("active") == a) return;
	a && toggleSearchOverlay(!1),
		$navOverlay.addClass("-transitioning").toggleClass("-active", a),
		$menuToggle.toggleClass("-active", a),
		$body.toggleClass("-overlay-active", a),
		$navOverlay.data("active", a);
}
function toggleSearchOverlay(a) {
	if (null == a) a = !$searchOverlay.data("active");
	else if ($searchOverlay.data("active") == a) return;
	a && toggleNavOverlay(!1),
		console.log("toggling search"),
		$searchOverlay.addClass("-transitioning").toggleClass("-active", a),
		$searchToggle.toggleClass("-active", a),
		$body.toggleClass("-overlay-active", a),
		$searchOverlay.data("active", a);
}
$navOverlay.add($searchOverlay).on("transitionend webkitTransitionEnd oTransitionEnd", function(a) {
	$(this).removeClass("-transitioning");
}),
	$window.on("scroll", onScroll),
	$menuToggle.on("click", toggleNavOverlay),
	$searchToggle.on("click", toggleSearchOverlay),
	onScroll();
