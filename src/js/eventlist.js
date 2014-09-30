;(function (ns) {

	ns.eventList = {

		// key for AppState								// events for controls	
		'buttons.callback.clicked': 					'clicked:button-callback',
		'buttons.zamerschik.clicked': 					'clicked:button-zamerschik',
		'buttons.installment.clicked': 					'clicked:button-installment',

		// PAGE MENU CLICK EVENTS

		'mainmenu.services.clicked':					'clicked:page-services',
		'mainmenu.products.clicked': 					'clicked:page-products',
		'mainmenu.career.clicked': 						'clicked:page-career',
		'mainmenu.contacts.clicked': 					'clicked:page-contacts',
		'mainmenu.portfolio.clicked': 					'clicked:page-portfolio',
		'mainmenu.about.clicked': 						'clicked:page-about',
		'mainmenu.clients.clicked': 					'clicked:page-clients',
		'mainmenu.feedbacks.clicked': 					'clicked:page-feedbacks',
		'mainmenu.actions.clicked': 					'clicked:page-actions',

		// SUB MENU CLICK EVENTS

		'submenu.services.clicked': 					'clicked:page-services',
		'submenu.benefits.clicked': 					'clicked:page-benefits',
		'submenu.workscheme.clicked': 					'clicked:page-workscheme',
		'submenu.payment.clicked': 						'clicked:page-payment',
		'submenu.feedbacks.clicked': 					'clicked:page-feedbacks',

		// SUBPAGE CLICK EVENTS

		'submenu.services.windows.clicked': 			'clicked:subpage-services#windows',
		'submenu.services.doors.clicked': 				'clicked:subpage-services#doors',
		'submenu.services.ceilings.clicked': 			'clicked:subpage-services#ceilings',
		'submenu.services.furniture.clicked': 			'clicked:subpage-services#furniture',
		'submenu.services.lighting.clicked': 			'clicked:subpage-services#lighting',
		'submenu.services.civilworks.clicked': 			'clicked:subpage-services#civilworks',
		'submenu.contacts.contacts.clicked': 			'clicked:subpage-contacts#contacts',
		'submenu.contacts.team.clicked': 				'clicked:subpage-contacts#team',
		'submenu.contacts.photos.clicked': 				'clicked:subpage-contacts#photos',
		'submenu.career.achievements.clicked': 			'clicked:subpage-career#achievements',
		'submenu.career.history.clicked': 				'clicked:subpage-career#history',
		'submenu.career.employees.clicked': 			'clicked:subpage-career#employees',
		'submenu.career.start.clicked': 				'clicked:subpage-career#start',
		'submenu.career.vacancy.clicked': 				'clicked:subpage-career#vacancy',
		'submenu.career.vacancy.clicked-showmore': 		'clicked:subpage-career#vacancy-showmore',

		// SOCIAL NETWORKS CLICK EVENTS

		'links.vkontakte.clicked':						'clicked:external-vkontakte',
		'links.facebook.clicked':						'clicked:external-facebook',
		'links.twitter.clicked':						'clicked:external-twitter',

	};

}(window.rossi || window));
