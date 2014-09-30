;(function(ns, $) {

	// THE CORE OF ROSSI APPLICATION.
	// It only create controls and subscribe / publish events.
	// It created than document is ready.

	// currentPage - current page name (key)
	var RossiApp = function(currentPage) {

		this._currentPage = currentPage;

		this._state = null;
		this._scroll = null;

		this._controls = {

			menu: {
				main: null,
				sub: null
			},

			buttons: {
				zamerschik: null,
				installment: null
			},

			links: {

			},

			popups: {
				zamerschik: null,
				installment: null
			}
		};

		this._init();
	};

	RossiApp.prototype = {

		_init: function () {

			// Initialization here

			this._state = new ns.AppState(ns.eventList || {});
			this._createControls();
			this._attachEvents();
		},

		_createControls: function() {

			// Controls creation here

			var controls = this._controls,
				popups = controls.popups,
				buttons = controls.buttons;

			buttons.zamerschik = new ns.PageButton($('.cc_zamerschik'), this._state, { click: 'buttons.zamerschik.clicked' });
			buttons.installment = new ns.PageButton($('.cc_installment'), this._state, { click: 'buttons.installment.clicked' });

			controls.menu = new ns.PageMenu($('.nav__list-main'), this._state, {
					// element	: // event name
					'services'	: 'mainmenu.services.click',
					'products' 	: 'mainmenu.products.click',
					'career' 	: 'mainmenu.career.click',
					'contacts' 	: 'mainmenu.contacts.click',
					'portfolio' : 'mainmenu.portfolio.click',
					'about' 	: 'mainmenu.about.click',
					'clients' 	: 'mainmenu.clients.click',
					'feedbacks' : 'mainmenu.feedbacks.click',
					'actions' 	: 'mainmenu.actions.click'
			});

			//controls.slider = new ns.ServicesSlider($('.slider__container'), this._state);

			$('body').append('<div id="popups"></div>');;
			var popupsHolder = $('body').find('#popups');

			popups.callback = new ns.PopupCallback(popupsHolder, this._state);
			popups.zamerschik = new ns.PopupZamerschik(popupsHolder, this._state);
			popups.installment = new ns.PopupInstallment(popupsHolder, this._state);
		},

		_attachEvents: function() {

			// Attach pub/sub events here
			// clickEvent - some object that creates on click event (like params)
			// AppState subscribe to controls events. 
			// And it publish own events than some control raise event.

			var controls = this._controls;
			var state = this._state;
			var menu = controls.menu;
			var owner = this;
			var popups = this._controls.popups;

			state // subscribe to

			// BUTTONS CLICK EVENTS
			
				.on('clicked:button-callback', function(clickEvent) {
					popups.callback.show(clickEvent);
				})
				.on('clicked:button-zamerschik', function(clickEvent) {
					popups.zamerschik.show(clickEvent);
				})
				.on('clicked:button-installment', function(clickEvent) {
					popups.installment.show(clickEvent);
				})

			// PAGE MENU CLICK EVENTS

				.on('clicked:page-installment', function (clickEvent) {
					alert('clicked:page-installment');
				})
				.on('clicked:page-installment', function (clickEvent) {
					alert('clicked:page-installment');
				})
				.on('clicked:page-career', function (clickEvent) {
					alert('clicked:page-career');
				})
				.on('clicked:page-contacts', function (clickEvent) {
					alert('clicked:page-contacts');
				})
				.on('clicked:page-portfolio', function (clickEvent) {
					alert('clicked:page-portfolio');
				})
				.on('clicked:page-about', function (clickEvent) {
					alert('clicked:page-about');
				})
				.on('clicked:page-clients', function (clickEvent) {
					alert('clicked:page-clients');
				})
				.on('clicked:page-feedbacks', function (clickEvent) {
					alert('clicked:page-feedbacks');
				})
				.on('clicked:page-actions', function (clickEvent) {
					alert('clicked:page-actions');
				})

			// SUB MENU CLICK EVENTS

				.on('clicked:subpage-services#windows', function (clickEvent) {
					alert('clicked:subpage-services#windows');
				})
				.on('clicked:subpage-services#doors', function (clickEvent) {
					alert('clicked:subpage-services#doors');
				})
				.on('clicked:subpage-services#ceilings', function (clickEvent) {
					alert('clicked:subpage-services#ceilings');
				})
				.on('clicked:subpage-services#furniture', function (clickEvent) {
					alert('clicked:subpage-services#furniture');
				})
				.on('clicked:subpage-services#lighting', function (clickEvent) {
					alert('clicked:subpage-services#lighting');
				})
				.on('clicked:subpage-services#civilworks', function (clickEvent) {
					alert('clicked:subpage-services#civilworks');
				})
				.on('clicked:subpage-contacts#contacts', function (clickEvent) {
					alert('clicked:subpage-contacts#contacts');
				})
				.on('clicked:subpage-contacts#team', function (clickEvent) {
					alert('clicked:subpage-contacts#team');
				})
				.on('clicked:subpage-contacts#photos', function (clickEvent) {
					alert('clicked:subpage-contacts#photos');
				})
				.on('clicked:subpage-career#achievements', function (clickEvent) {
					alert('clicked:subpage-career#achievements');
				})
				.on('clicked:subpage-career#history', function (clickEvent) {
					alert('clicked:subpage-career#history');
				})
				.on('clicked:subpage-career#employees', function (clickEvent) {
					alert('clicked:subpage-career#employees');
				})
				.on('clicked:subpage-career#start', function (clickEvent) {
					alert('clicked:subpage-career#start');
				})
				.on('clicked:subpage-career#vacancy', function (clickEvent) {
					alert('clicked:subpage-career#vacancy');
				})
				.on('clicked:subpage-career#vacancy-showmore', function (clickEvent) {
					alert('clicked:subpage-career#vacancy-showmore');
				})

				// SOCIAL NETWORKS CLICK EVENTS

				.on('clicked:external-vkontakte', function (clickEvent) {
					alert('clicked:external-vkontakte');
				})
				.on('clicked:external-facebook', function (clickEvent) {
					alert('clicked:external-facebook');
				})
				.on('clicked:external-twitter', function (clickEvent) {
					alert('clicked:external-twitter');
				});

		}
	};

	ns.RossiApp = RossiApp;

}(window.rossi, jQuery));