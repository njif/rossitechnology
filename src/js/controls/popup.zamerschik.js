;(function (ns, $) {

	var htmlTemlate = '\
		<form class="popup_zamerschik hidden_popup" role="form">\
			<div class="form-group">\
			<label>ФИО<input type="input" class="cc_fio" required></label>\
			<label>Телефон<input type="phone" class="cc_phone" required></label>\
			<p class="cc_message"></p>\
			<input type="submit" class="email-submit" value="Отправить">\
			</div>\
		</form>';

	var defaults = {
		fioText: "ФИО",
		phoneText: "Телефон"
	};

	var Popup = function (holder, config) {
		this._holder = holder;
		this._config = $.extend({}, defaults, config);
		this._controls = { fio: null, phone: null, message: null, button: null };
		this._popup = null;
		this._init();

	};

	Popup.prototype = {

		show: function(event) {

			this._popup.removeClass('hidden_popup');

		},

		_init: function() {

			this._createHtml();
			this._initControls();	

		},

		_createHtml: function() {
			this._popup = $(htmlTemlate);
			this._holder.html(this._popup);

		},

		_initControls: function() {
			var inputs = this._holder.find('input');
			this._controls.fio = inputs.filter('.cc_fio');
			this._controls.phone = inputs.filter('.cc_phone').on('click', $.proxy(this._onSubmit, this));		
			this._controls.message = this._holder.find('.cc_message');		
			this._controls.submit = inputs.filter('[type=submit]').on('click', function() {
				if (this._controls.fio.val() == '' || this._controls.phone.val() == '')
					return;
				alert('sended');
				this._popup.addClass('hidden_popup');
			});		
		}
	};

	ns.PopupZamerschik = Popup;

}(window.rossi || window, jQuery));